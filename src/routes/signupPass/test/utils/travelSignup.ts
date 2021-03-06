import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { createDom } from "~/utils/test/dom";

export const TEST_PASS_PHRASE = "your secret password";

export const processSignup = async (SignUpDom: React.Component, store: Store): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SignUpDom, "input");
  expect(inputs.length).toBe(4);

  const email = inputs[0];
  TestUtils.Simulate.change(email, { target: { value: "foo@bar.com" } } as any);

  const password = inputs[1];
  TestUtils.Simulate.change(password, { target: { value: TEST_PASS_PHRASE } } as any);

  const repeatPassword = inputs[2];
  TestUtils.Simulate.change(repeatPassword, { target: { value: TEST_PASS_PHRASE } } as any);

  const accept = inputs[3];
  TestUtils.Simulate.change(accept, { target: { value: "true" } } as any);

  const form = TestUtils.findRenderedDOMComponentWithTag(SignUpDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await whenOnNavigatedToRoute(store, SET_NAME_ROUTE);
};

export const travelToSignup = (store: Store): React.Component => {
  history.push(SIGNUP_ROUTE);

  return createDom(store);
};
