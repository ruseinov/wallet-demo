import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import ReactDOM from "react-dom";
import { Item } from "~/components/forms/SelectField";
import SelectItems from "~/components/forms/SelectField/SelectItems";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { showPhone } from "~/utils/reactportals";
import sorting from "../../assets/sorting.svg";
import { SortingStateProps, SortItem } from "../sorting";

interface Outer extends SortingStateProps, WithStyles<typeof styles> {
  readonly items: ReadonlyArray<Item>;
  readonly phoneHook: HTMLDivElement | null;
}

type Props = OpenType & OpenHandler & Outer;

interface State {
  readonly value: string;
}

const styles = createStyles({
  container: {
    flexShrink: 0,
  },
});

class SortMenu extends React.PureComponent<Props, State> {
  public readonly state = {
    value: "",
  };

  public componentDidMount(): void {
    const selectedSort = this.props.items.find(
      (item: Item): boolean => {
        const sortItem = item as SortItem;
        return (
          sortItem.orderBy in this.props.sortingState &&
          this.props.sortingState[sortItem.orderBy] === sortItem.order
        );
      },
    );

    if (selectedSort) {
      this.setState({ value: selectedSort.name });
    }
  }
  public readonly onAction = (value: Item) => () => {
    const { toggle, onSort } = this.props;
    const sortItem = value as SortItem;

    this.setState({ value: value.name }, () => {
      onSort(sortItem.orderBy, sortItem.order)();
      toggle();
    });
  };

  public render(): JSX.Element {
    const { open, toggle, classes, items, phoneHook } = this.props;

    return (
      <Block className={classes.container}>
        <Img src={sorting} width={24} height={24} alt="Sorting" onClick={toggle} />
        {showPhone(true, phoneHook, open) &&
          ReactDOM.createPortal(
            <SelectItems
              selectedItem={this.state.value}
              align="left"
              items={items}
              action={this.onAction}
              phone
            />,
            phoneHook!,
          )}
      </Block>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(SortMenu));
