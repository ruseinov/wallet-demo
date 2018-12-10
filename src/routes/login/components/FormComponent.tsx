import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

const FormComponent = () => (
  <React.Fragment>
    <Block padding="xxl" maxWidth={450} margin="xxl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Password
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name="password"
        type="password"
        fullWidth
        component={TextField}
        validate={required}
        placeholder="Your password"
      />
    </Block>
    <Block padding="xxl" maxWidth={450} margin="xl">
      <Typography variant="subtitle1" color="primary" underlined>
        Forgot your password?
      </Typography>
    </Block>
  </React.Fragment>
);

export default FormComponent;