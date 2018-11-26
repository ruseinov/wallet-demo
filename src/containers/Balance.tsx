import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { BcpCoin, BcpConnection, TokenTicker } from "@iov/bcp-types";

import { InviteButton } from "../components/subComponents/buttons";
import {
  AddressInputForm,
  BalanceForm,
  ReceiveIOVForm,
  ReceiveNonIOVForm,
} from "../components/templates/forms";
import { IOVModal } from "../components/templates/modal";
import { PageStructure } from "../components/templates/page";

import { ChainAccount, getConnections, getMyAccounts } from "../selectors";

interface BalanceProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly connections: { readonly [chainId: string]: BcpConnection };
  readonly identity: any;
}

interface BalanceState {
  readonly showReceiveModal: boolean;
  readonly showAddressModal: boolean;
  readonly showReceiveNonIovModal: boolean;
}

interface AddressInfo {
  readonly token: TokenTicker;
  readonly address: string;
}

class Balance extends React.Component<BalanceProps, BalanceState> {
  public readonly state = {
    showReceiveModal: false,
    showAddressModal: false,
    showReceiveNonIovModal: false,
  };

  public componentDidMount(): void {
    const { accounts, history } = this.props;
    if (accounts.length === 0) {
      history.push("/");
    }
  }

  public readonly onSend = (address: string): any => {
    const { history } = this.props;
    history.push(`/send-payment/${address}/`);
  };

  public readonly onClickBalance = (token: TokenTicker): any => {
    const { history } = this.props;
    history.push(`/payment/?token=${token}`);
  };

  public readonly onInvite = (): any => {
    const { history } = this.props;
    history.push("/invite/");
  };

  public readonly closeNonIovModal = (): any => {
    this.setState({
      showReceiveNonIovModal: false,
    });
  };

  public readonly closeIovModal = (): any => {
    this.setState({
      showReceiveModal: false,
    });
  };

  public readonly toNonIovModal = (): any => {
    this.setState({
      showReceiveModal: false,
      showReceiveNonIovModal: true,
    });
  };

  public readonly toIovModal = (): any => {
    this.setState({
      showReceiveNonIovModal: false,
      showReceiveModal: true,
    });
  };

  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const { showReceiveModal, showAddressModal, showReceiveNonIovModal } = this.state;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const name = `${account.name}*iov`;
    const balances = account.balance.map((balance: BcpCoin) => {
      const { whole, fractional, tokenTicker, tokenName } = balance;
      return {
        whole,
        fractional,
        sigFigs: 9,
        tokenTicker,
        tokenName,
      };
    });
    const { connections } = this.props;
    const chainIds = Object.keys(connections);
    const connection = connections[chainIds[0]];
    const addressList = [
      {
        token: "IOV" as TokenTicker,
        address: account.address,
      },
    ] as ReadonlyArray<AddressInfo>;
    return (
      <PageStructure activeNavigation="Balance">
        <div>
          <BalanceForm
            accountName={name}
            balances={balances}
            onSend={() => {
              this.setState({
                showAddressModal: true,
              });
            }}
            onReceive={() => {
              this.setState({
                showReceiveModal: true,
              });
            }}
            onBackup={() => {
              console.log("on Backup");
            }}
            onBalance={this.onClickBalance}
          />
          <IOVModal
            visible={showAddressModal}
            onRequestClose={() => {
              this.setState({
                showAddressModal: false,
              });
            }}
            suggestionText="Your friends not on IOV yet?"
            buttonText="Invite someone to IOV now"
            onSuggestion={() => {
              console.log("Suggestion");
            }}
          >
            <AddressInputForm connection={connection} onNext={this.onSend} />
          </IOVModal>
          <IOVModal
            visible={showReceiveModal}
            onRequestClose={this.closeIovModal}
            suggestionText="Receiving from outside IOV?"
            buttonText="View your address"
            onSuggestion={this.toNonIovModal}
          >
            <ReceiveIOVForm iovAddress={name} />
          </IOVModal>
          <IOVModal
            visible={showReceiveNonIovModal}
            onRequestClose={this.closeNonIovModal}
            suggestionText="Receiving from an IOV user?"
            buttonText="View your IOV address"
            onSuggestion={this.toIovModal}
            secondaryComp={<InviteButton onInvite={this.onInvite} />}
          >
            <ReceiveNonIOVForm addressList={addressList} />
          </IOVModal>
        </div>
      </PageStructure>
    );
  }
}

// Updated with types like in Home.tsc
const mapStateToProps = (state: any, ownProps: BalanceProps): BalanceProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
  connections: getConnections(state),
});

export const BalancePage = withRouter(connect(mapStateToProps)(Balance));
