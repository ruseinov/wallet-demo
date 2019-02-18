import * as React from "react";
import Form from "~/components/forms/Form";
import Hairline from "~/components/layout/Hairline";
import { ColumnName, TransactionTableProps } from "../common";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox from "./ToolBox";

interface Props extends TransactionTableProps {
  readonly phone: boolean;
  readonly onSort: (column: ColumnName) => () => void;
}

// tslint:disable-next-line:no-empty
const onSubmit = (_: object) => {};

export const Layout = ({ onChangeRows, onPrevPage, onNextPage, onSort, sortingState, txs, phone }: Props) => (
  <React.Fragment>
    <Hairline />
    <ToolBox phone={phone} />
    <Hairline />
    <Form onSubmit={onSubmit}>
      {() =>
        phone ? (
          <PhoneTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            sortingState={sortingState}
          />
        ) : (
          <DesktopTransactionsTable
            txs={txs}
            onChangeRows={onChangeRows}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onSort={onSort}
            sortingState={sortingState}
          />
        )
      }
    </Form>
  </React.Fragment>
);
