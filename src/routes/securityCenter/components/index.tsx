import * as React from "react";
import { CHANGE_PASSWORD_ROUTE, SECURITY_PHRASE_ROUTE } from "~/routes";
import PswIcon from "../assets/password.svg";
import BPIcon from "../assets/recoveryPhrase.svg";
import ExtraSecurity from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";

export default (): JSX.Element => {
  return (
    <React.Fragment>
      <PageTitle />
      <SecurityCard title="Set a password" action="Change" link={CHANGE_PASSWORD_ROUTE} icon={PswIcon} />
      <SecurityCard
        title="Your recovery phrase"
        action="View phrase"
        link={SECURITY_PHRASE_ROUTE}
        icon={BPIcon}
      />
      <ExtraSecurity />
    </React.Fragment>
  );
};
