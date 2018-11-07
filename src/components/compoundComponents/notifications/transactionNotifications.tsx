import React from "react";
import styled from "styled-components";

import {
  NotificationWrapper,
  NotificationTitle,
  TransactionNotificationItem,
  TransNotificationProps,
} from "../../subComponents/notification";

interface TransactionNotificationProps {
  readonly items: ReadonlyArray<TransNotificationProps>;
}

const Content = styled.div`
  background-color: #fcfcfc;
  padding: 0px 15px;
`;

export const TransactionNotification = (props: TransactionNotificationProps) => (
  <NotificationWrapper>
    <NotificationTitle>Notifications</NotificationTitle>
    <Content>
      {props.items.map((item, key) => (
        <TransactionNotificationItem {...item} key={`notif_${key}`} />
      ))}
    </Content>
  </NotificationWrapper>
);
