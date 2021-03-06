import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, PAYMENT_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { CONFIRM_PAYMENT, FILL_PAYMENT, SendPaymentInternal } from "~/routes/sendPayment/container";
import { balanceTokensSelector } from "~/routes/sendPayment/container/selector";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { processConfirmation, processPaymentTo } from "./util/travelSendPayment";

describe("DOM > Feature > Send Payment", () => {
  let userFooStore: Store<RootState>;
  let userFooAccount: string;
  let userBarStore: Store<RootState>;

  beforeAll(async () => {
    userFooStore = aNewStore();
    userFooAccount = randomString(10);
    await processBalance(userFooStore, userFooAccount);
    resetHistory();
    userBarStore = aNewStore();
  }, 30000);

  afterAll(() => {
    shutdownSequence(null, userFooStore.getState);
    shutdownSequence(null, userBarStore.getState);
  });

  mayTestBns(
    "should send payments",
    async () => {
      const BalanceDom = await processBalance(userBarStore, randomString(10));

      const cards = TestUtils.scryRenderedDOMComponentsWithClass(BalanceDom, "BalanceLayout-action-212");
      expect(cards.length).toBe(2);
      const sendPaymentCard = cards[0];
      expect(sendPaymentCard.textContent).toBe("Send payment");
      TestUtils.Simulate.click(sendPaymentCard);
      await sleep(800);

      expectRoute(userBarStore, PAYMENT_ROUTE);
      const sendPaymentComponent = TestUtils.findRenderedComponentWithType(BalanceDom, SendPaymentInternal);
      expect(sendPaymentComponent.state.page).toBe(FILL_PAYMENT);

      await processPaymentTo(BalanceDom, `${userFooAccount}*iov`, "1.0");
      await sleep(800);

      expect(sendPaymentComponent.state.page).toBe(CONFIRM_PAYMENT);
      await processConfirmation(BalanceDom);
      await sleep(800);

      expectRoute(userBarStore, BALANCE_ROUTE);

      const balance = balanceTokensSelector(userBarStore.getState());
      const iovToken = balance.find(amount => amount.tokenTicker === "IOV");
      expect(iovToken).not.toBeFalsy();
      // + 10.00 IOV (from faucet)
      // -  5.00 IOV (register name fee)
      // -  1.00 IOV (send amount)
      // -  0.01 IOV (send fee)
      expect(iovToken!.quantity).toEqual("3990000000");
    },
    90000,
  );
});
