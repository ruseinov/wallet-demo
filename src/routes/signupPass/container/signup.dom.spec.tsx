import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Store } from "redux";
import Route, { SIGNUP_ROUTE } from "~/routes";
import { aNewStore, history } from "~/store";
import { sleep } from "~/utils/timer";

const createDom = (store: Store): React.Component<any, any, any> =>
  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route />
      </ConnectedRouter>
    </Provider>,
  ) as React.Component;

export const travelToSignup = (store: Store): React.Component<{}> => {
  history.push(SIGNUP_ROUTE);

  return createDom(store);
};

describe("DOM > Feature > Signup", () => {
  it("creates account after filling form", async () => {
    const store = aNewStore();
    const SignUpDom = await travelToSignup(store);

    // Let's fill the form
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SignUpDom, "input");
    expect(inputs.length).toBe(4);

    const email = inputs[0];
    TestUtils.Simulate.change(email, { target: { value: "foo@bar.com" } } as any);

    const password = inputs[1];
    TestUtils.Simulate.change(password, { target: { value: "pass phrase here" } } as any);

    const repeatPassword = inputs[2];
    TestUtils.Simulate.change(repeatPassword, { target: { value: "pass phrase here" } } as any);

    const accept = inputs[3];
    TestUtils.Simulate.change(accept, { target: { value: "true" } } as any);

    // Let's submit the form
    const form = TestUtils.findRenderedDOMComponentWithTag(SignUpDom, "form");
    if (!form) {
      throw new Error();
    }
    TestUtils.Simulate.submit(form);

    await sleep(1200);
    //TODO check account has been stored using store variable in top
  });
});
