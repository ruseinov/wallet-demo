import { createStyles, Fab, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import CircleImage from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import download from "~/routes/transactions/assets/download.svg";
import { background, border, primary, xl, xs } from "~/theme/variables";

const styles = createStyles({
  root: {
    width: "auto",
    justifyContent: "left",
    textTransform: "inherit",
  },
  sizeSmall: {
    height: xl,
  },
  text: {
    paddingLeft: xs,
  },
  secondary: {
    backgroundColor: background,
    padding: 0,
    boxShadow: "none",
    border: `1px solid ${border}`,
    "&:hover": {
      background: background,
    },
  },
  panel: {
    height: 64,
    display: "flex",
    alignItems: "center",
    backgroundColor: background,
  },
});

export interface DownloadCSVProps {
  readonly onDownloadCSV: () => void;
}

interface Props extends DownloadCSVProps, WithStyles<typeof styles> {
  readonly phone: boolean;
}

const DownloadCSV = ({ classes, onDownloadCSV, phone }: Props): JSX.Element => {
  const fabClasses = {
    secondary: classes.secondary,
    root: classes.root,
    sizeSmall: classes.sizeSmall,
  };

  return (
    <Block className={classes.panel} padding="lg">
      {!phone && <Block maxWidth={176} grow />}
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="Export as CSV"
        classes={fabClasses}
        onClick={onDownloadCSV}
      >
        <CircleImage icon={download} circleColor={primary} alt="Download" dia={xl} width={16} height={16} />
        <Typography variant="subtitle2" weight="regular" className={classes.text}>
          Export as .CSV
        </Typography>
      </Fab>
    </Block>
  );
};

export default withStyles(styles)(DownloadCSV);
