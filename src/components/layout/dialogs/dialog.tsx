import { createStyles, DialogContent, withStyles, WithStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React, { PureComponent } from "react";
import Button from "~/components/layout/Button";
import Img from "~/components/layout/Image";

import CloseIcon from "../../../../resources/close_type3.svg";

const styles = createStyles({
  paper: {
    overflow: "visible",
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: -40,
  },

  button: {
    position: "relative",
    top: 65,
    width: "calc(100% - 60px)",
    margin: "auto",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly showDialog: boolean;
  readonly submitButton: string;
  readonly onClose: () => void;
  readonly onSubmit: () => void;
  readonly children: React.ReactNode;
}

// TODO for using openHoc
class BaseDialog extends PureComponent<Props, {}> {
  private readonly paperClass = { paper: this.props.classes.paper };

  public render(): JSX.Element {
    const { classes, showDialog, submitButton, onClose, onSubmit, children } = this.props;

    return (
      <Dialog
        onClose={onClose}
        classes={this.paperClass}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
      >
        <Img src={CloseIcon} alt="Close" onClick={onClose} className={classes.closeButton} />
        <DialogContent>{children}</DialogContent>
        <Button onClick={onSubmit} variant="contained" color="primary" className={classes.button}>
          {submitButton}
        </Button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(BaseDialog);
