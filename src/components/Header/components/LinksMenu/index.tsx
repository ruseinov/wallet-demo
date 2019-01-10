import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { BALANCE_ROUTE, CONFIRM_TRANSACTION, PAYMENT_ROUTE, SEND_PAYMENT } from "~/routes";
import { history } from "~/store";
import { border, lg, primary } from "~/theme/variables";

const styles = createStyles({
  root: {
    display: "flex",
  },
  text: {
    marginTop: "12px",
  },
  item: {
    margin: `0px ${lg}`,
    "&:hover": {
      cursor: "pointer",
    },
  },
  activated: {
    "& $line": {
      visibility: "visible",
    },
  },
  line: {
    visibility: "hidden",
    height: "4px",
    backgroundColor: primary,
    borderRadius: "4px",
    marginTop: "4px",
  },
});

const onBalance = () => {
  history.push(BALANCE_ROUTE);
};

const onPayments = () => {
  history.push(PAYMENT_ROUTE);
};

const BALANCE_TEXT = "Balance";
const PAYMENT_TEXT = "Payments";

export const PhoneLinks = () => (
  <React.Fragment>
    <ListItem button disableGutters onClick={onBalance}>
      <ListItemText disableTypography>
        <Typography variant="body1">{BALANCE_TEXT}</Typography>
      </ListItemText>
    </ListItem>
    <ListItem button disableGutters onClick={onPayments}>
      <ListItemText disableTypography>
        <Typography variant="body1">{PAYMENT_TEXT}</Typography>
      </ListItemText>
    </ListItem>
    <Hairline color={border} margin="sm" />
  </React.Fragment>
);

interface LinksProps extends RouteComponentProps<{}>, WithStyles<typeof styles> {}

const DesktopLinksComponent = ({ classes, location }: LinksProps) => {
  const { pathname: path } = location;
  const showBalance = path === BALANCE_ROUTE;
  const showPayment =
    path === PAYMENT_ROUTE || path.startsWith(SEND_PAYMENT) || path.startsWith(CONFIRM_TRANSACTION);

  const balanceClasses = classNames(classes.item, showBalance ? classes.activated : undefined);
  const paymentClasses = classNames(classes.item, showPayment ? classes.activated : undefined);

  return (
    <Block className={classes.root}>
      <Block className={balanceClasses}>
        <Block className={classes.text}>
          <Typography variant="subtitle2" color="textPrimary" className={classes.text} onClick={onBalance}>
            {BALANCE_TEXT}
          </Typography>
        </Block>
        <Block className={classes.line} />
      </Block>
      <Block className={paymentClasses}>
        <Block className={classes.text}>
          <Typography variant="subtitle2" color="textPrimary" className={classes.text} onClick={onPayments}>
            {PAYMENT_TEXT}
          </Typography>
        </Block>
        <Block className={classes.line} />
      </Block>
    </Block>
  );
};

export const LinksDesktop = withStyles(styles)(withRouter(DesktopLinksComponent));