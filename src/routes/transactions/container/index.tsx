import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import { Item } from "~/components/forms/SelectField";
import PageMenu from "~/components/pages/PageMenu";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { ProcessedTx } from "~/store/notifications/state";
import { Layout } from "../components";
import { ColumnName } from "../components/rowTransactionsBuilder";
import { SortingState, SortItem, SortOrder } from "../components/sorting";
import selector, { SelectorProps } from "./selector";

interface State {
  readonly rowsPerPage: number;
  readonly pageNumber: number;
  readonly orderBy: ColumnName;
  readonly order: SortOrder;
  readonly sortingState: SortingState;
}

class Transactions extends React.Component<SelectorProps, State> {
  public readonly state = {
    rowsPerPage: 5,
    pageNumber: 0,
    orderBy: ColumnName.Date,
    order: SortOrder.DESC,
    sortingState: { [ColumnName.Date]: SortOrder.DESC },
  };

  public readonly onChangeRows = (item: Item) => {
    this.setState({
      rowsPerPage: Number(item.name),
    });
  };

  public readonly onSort = (column: ColumnName) => () => {
    const sortingOrder = column !== this.state.orderBy ? SortOrder.ASC : this.state.order * -1;

    this.onSetSortOrder({
      name: "Sort item",
      column,
      order: sortingOrder,
    });
  };

  public readonly onSetSortOrder = (sorting: SortItem): void => {
    const sortingState: SortingState = { [sorting.column]: sorting.order };

    this.setState({
      orderBy: sorting.column,
      order: sorting.order,
      sortingState,
    });
  };

  public readonly onPrevPage = () => {
    if (!this.state.pageNumber) {
      return;
    }

    this.setState({
      pageNumber: this.state.pageNumber - 1,
    });
  };

  public readonly onNextPage = () => {
    const totalPages = Math.ceil(this.props.txs.length / this.state.rowsPerPage);
    if (this.state.pageNumber === totalPages - 1) {
      return;
    }

    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  };

  public readonly onDownloadCSV = () => {
    const csvHeader =
      '"ID";"Recipient";"Signer";"Quantity";"Fractional Digits";"Token Ticker";"Time";"Received";"Success";"Error";"Note"';
    const csvBody = this.props.txs.map(
      (tx: ProcessedTx) => {
        const parties = `"${tx.id}";"${tx.recipient}";"${tx.signer}";`;
        const payment = `"${tx.amount.quantity}";"${tx.amount.fractionalDigits}";"${tx.amount.tokenTicker}";`;
        const date = `"${tx.time.toISOString()}";`;
        const status = `"${tx.received}";"${tx.success}";"${tx.err}";"${tx.memo}"`;

        const txRow = `${parties}${payment}${date}${status}`;

        return txRow;
      }
    );

    const blob = new Blob([`${csvHeader}\n${csvBody.join("\n")}`], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "transactions.csv");
  };

  public render(): JSX.Element {
    const { txs } = this.props;

    const { rowsPerPage, pageNumber, orderBy, order, sortingState } = this.state;

    // tslint:disable-next-line:readonly-array
    const sortedTx = (txs as ProcessedTx[]).sort((a: ProcessedTx | undefined, b: ProcessedTx | undefined) => {
      if (!a || !b) {
        return 0;
      }

      switch (orderBy) {
        case ColumnName.Amount:
          return a.amount.tokenTicker.localeCompare(b.amount.tokenTicker) * order;
        case ColumnName.Date:
          return a.time.getTime() - b.time.getTime() * order;
      }

      return 0;
    });

    const pageStartIdx = pageNumber * rowsPerPage;
    const pageEndIdx = Math.min(txs.length, pageStartIdx + rowsPerPage);
    const txsToRender = sortedTx.slice(pageStartIdx, pageEndIdx);

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <PageMenu phoneFullWidth padding={false}>
              <Layout
                phone={phone}
                txs={txsToRender}
                onChangeRows={this.onChangeRows}
                onPrevPage={this.onPrevPage}
                onNextPage={this.onNextPage}
                onSort={this.onSort}
                sortingState={sortingState}
                onSetSortOrder={this.onSetSortOrder}
                onDownloadCSV={this.onDownloadCSV}
              />
            </PageMenu>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Transactions);
