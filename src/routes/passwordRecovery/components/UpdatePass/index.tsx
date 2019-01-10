import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import LeftSidebarWrapper from "../LeftSidebarWrapper";
import StepsCount from "../StepsCount";
import ReadyMsg from "./ReadyMsg";
import { UpdatePassForm } from "./UpdatePassForm";

const StepsSection = () => <StepsCount stepNum={2} />;

const LeftSidebarSection = () => (
  <LeftSidebarWrapper>
    <ReadyMsg />
  </LeftSidebarWrapper>
);

interface Props {
  readonly validation: (values: any) => object | Promise<object>;
  readonly onSubmit: (values: any) => void;
}

export const UpdatePass = ({ validation, onSubmit }: Props): JSX.Element => (
  <PageColumn
    icon="black"
    leftMenu={LeftSidebarSection}
    onSubmit={onSubmit}
    primaryTitle="Set up"
    secondaryTitle="a new password"
    subtitle="Set up a new password for your wallet."
    renderHeader={StepsSection}
    formRender={UpdatePassForm}
    nextMsg="Continue"
    validation={validation}
  />
);
