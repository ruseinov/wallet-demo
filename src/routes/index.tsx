import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import {
  BackupAccountPage,
  BalancePage,
  ConfirmTransactionPage,
  ImportAccountPage,
  InvitePage,
  PasswordPage,
  PaymentPage,
  RequireLogin,
  SendPaymentPage,
} from "~/containers";
import { RootState } from "~/reducers";
import Home from "~/routes/home/container";
import LogIn from "~/routes/login/container";
import SignupName from "~/routes/signupName/container";
import SignupPass from "~/routes/signupPass/container";
import { getMyAccounts } from "~/selectors";

export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const SET_NAME_ROUTE = "/name";
export const TERMS_OF_SERVICE_ROUTE = "/terms";
export const PRIVACY_POLICY_ROUTE = "/privacy";
export const BALANCE_ROUTE = "/balance";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

interface RouterProps {
  readonly state: RootState;
}

export const MainRouter = (props: RouterProps) => (
  <Switch>
    <RequireLogin  accounts={getMyAccounts(props.state)}>
      <Route exact path={HOME_ROUTE} component={Home} />
      <Route exact path={SIGNUP_ROUTE} component={SignupPass} />
      <Route exact path={SET_NAME_ROUTE} component={SignupName} />
      <Route path={LOGIN_ROUTE} component={LogIn} />
    </RequireLogin>
    <Router>
      <Wrapper>
        <RequireLogin  accounts={getMyAccounts(props.state)}>
          <Route path="/send-payment/:iovAddress" component={SendPaymentPage} />
          <Route path="/setPassword/" component={PasswordPage} />
          <Route path="/account-backup/" component={BackupAccountPage} />
          <Route path="/import-account/" component={ImportAccountPage} />
          <Route path="/payment/" component={PaymentPage} />
          <Route path={BALANCE_ROUTE} component={BalancePage} />
          <Route path="/invite/" component={InvitePage} />
          <Route
            path="/confirm-transaction/:iovAddress/:token/:tokenAmount/"
            component={ConfirmTransactionPage}
          />
        </RequireLogin>
      </Wrapper>
    </Router>
  </Switch>
);
export default MainRouter;
