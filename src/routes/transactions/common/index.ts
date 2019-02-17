import { Item } from "~/components/forms/SelectField";
import { ProcessedTx } from "~/store/notifications/state";
import fromAddress from "../assets/fromAddress.svg";
import toAddress from "../assets/toAddress.svg";
import toAddressRejected from "../assets/toAddressRejected.svg";

export interface TransactionRowProps {
  readonly tx: ProcessedTx;
}

export interface TransactionsTableState {
  readonly phoneHook: HTMLDivElement | null;
}

export interface TransactionTableProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly onChangeRows: (item: Item) => void;
  readonly onPrevPage: () => void;
  readonly onNextPage: () => void;
}

export const getTypeIcon = (tx: ProcessedTx): string => {
  if (tx.received) {
    return fromAddress;
  } else if (!tx.success) {
    return toAddressRejected;
  } else {
    return toAddress;
  }
};

export const getAddressPrefix = (tx: ProcessedTx): string => {
  if (tx.received) {
    return "From";
  } else {
    return "To";
  }
};

export const isNativeSender = (sender: string): string => {
  if (sender.indexOf("*") >= 0) {
    return sender;
  }

  return "blockchain address";
};
