import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import Popper from "@material-ui/core/Popper";
import * as React from "react";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";

interface Outer extends WithStyles<typeof styles> {
  readonly starter: (visited: boolean, open: boolean) => JSX.Element;
  readonly listWidth: number;
  readonly color?: string;
}

type Props = OpenType & OpenHandler & Outer;

const styles = createStyles({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const buildListStyleFrom = (width: number, color: string): React.CSSProperties => ({
  width: `${width}px`,
  backgroundColor: color,
});

class ListMenu extends React.Component<Props> {
  private readonly menuRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const {
      classes,
      listWidth,
      starter,
      children,
      color = "white",
      open,
      clickAway,
      visited,
      toggle,
    } = this.props;
    const style = buildListStyleFrom(listWidth, color);

    return (
      <React.Fragment>
        <div ref={this.menuRef} className={classes.root} onClick={toggle}>
          {starter(visited, open)}
        </div>
        <Popper open={open} anchorEl={this.menuRef.current} placement="bottom-end">
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <ClickAwayListener onClickAway={clickAway} mouseEvent="onClick" touchEvent="onTouchStart">
                <List style={style} component="nav">
                  {children}
                </List>
              </ClickAwayListener>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(ListMenu));