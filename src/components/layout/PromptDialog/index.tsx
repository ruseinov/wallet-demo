import React, { PureComponent } from "react";
import Typography from '@material-ui/core/Typography';
import { Form, Field } from 'react-final-form'

import MainStyles from "./index.scss";
import BaseDialog from "../BaseDialog";


interface Props {
  readonly title: string;
  readonly showDialog: boolean;
  readonly onClose: () => any;
  readonly children: React.ReactNode;
}

interface State {
  readonly open: boolean;
}

class PromptDialog extends PureComponent<Props, State> {
  public readonly state = {
    open: false,
  };

  public onSubmit = (values) => {
    console.log(values);
  }
  

  public render(): JSX.Element {
    const {
      title,
      showDialog,
      onClose,
      children,
    } = this.props;

    return (
      <BaseDialog
        showDialog={showDialog}
        onClose={onClose}
        onSubmit={onClose}
        submitButton="Continue"
      >
        <h1>🏁 React Final Form - Simple Example</h1>
        <a href="https://github.com/erikras/react-final-form#-react-final-form">
          Read Docs
    </a>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ stooge: 'larry', employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name</label>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label>Last Name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label>Employed</label>
                <Field name="employed" component="input" type="checkbox" />
              </div>
              <div>
                <label>Favorite Color</label>
                <Field name="favoriteColor" component="select">
                  <option />
                  <option value="#ff0000">❤️ Red</option>
                  <option value="#00ff00">💚 Green</option>
                  <option value="#0000ff">💙 Blue</option>
                </Field>
              </div>
              <div>
                <label>Toppings</label>
                <Field name="toppings" component="select" multiple>
                  <option value="chicken">🐓 Chicken</option>
                  <option value="ham">🐷 Ham</option>
                  <option value="mushrooms">🍄 Mushrooms</option>
                  <option value="cheese">🧀 Cheese</option>
                  <option value="tuna">🐟 Tuna</option>
                  <option value="pineapple">🍍 Pineapple</option>
                </Field>
              </div>
              <div>
                <label>Sauces</label>
                <div>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="ketchup"
                    />{' '}
                    Ketchup
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="mustard"
                    />{' '}
                    Mustard
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="mayonnaise"
                    />{' '}
                    Mayonnaise
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="guacamole"
                    />{' '}
                    Guacamole 🥑
              </label>
                </div>
              </div>
              <div>
                <label>Best Stooge</label>
                <div>
                  <label>
                    <Field
                      name="stooge"
                      component="input"
                      type="radio"
                      value="larry"
                    />{' '}
                    Larry
              </label>
                  <label>
                    <Field
                      name="stooge"
                      component="input"
                      type="radio"
                      value="moe"
                    />{' '}
                    Moe
              </label>
                  <label>
                    <Field
                      name="stooge"
                      component="input"
                      type="radio"
                      value="curly"
                    />{' '}
                    Curly
              </label>
                </div>
              </div>
              <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
            </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
            </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </BaseDialog >
    );
  }
}

export default PromptDialog;