// tslint:disable:no-string-literal
import * as React from "react";
import { connect } from "react-redux";
import { Errors, FormType } from "~/components/forms/Form";
import { getAddressByName } from "~/logic";
import { BALANCE_ROUTE, SIGNUP_ROUTE } from "~/routes";
import CreateUsername from "~/routes/signupName/components";
import { USERNAME_FIELD } from "~/routes/signupName/components/FormComponent";
import { history } from "~/store";
import actions, { SignupNameActions } from "./actions";
import selector, { SelectorProps } from "./selector";

interface Props extends SignupNameActions, SelectorProps {}

class SignupName extends React.Component<Props> {
  public readonly onCreateUsername = async (values: object) => {
    const { chainId, setName } = this.props;
    const name = (values as FormType)[USERNAME_FIELD];

    try {
      await setName(name, chainId);
      history.push(BALANCE_ROUTE);
    } catch (err) {
      // TODO check if error and show something
    }
  };

  public readonly onBack = () => {
    history.push(SIGNUP_ROUTE);
  };

  public readonly validate = async (values: object) => {
    const { connection } = this.props
    let errors: Errors = {};

    const name = (values as FormType)[USERNAME_FIELD];
    const isTaken = await getAddressByName(connection, name) !== undefined;
    if (isTaken) {
      errors = { ...errors, [USERNAME_FIELD]: "Name is already taken" };
    }

    return errors;
  };

  public render(): JSX.Element {
    return <CreateUsername validate={this.validate} onBack={this.onBack} onSubmit={this.onCreateUsername} />;
  }
}

export default connect(
  selector,
  actions,
)(SignupName);
