import { TokenTicker } from "@iov/core";
import { ReadonlyDate } from "readonly-date";
import { stringToAmount } from "~/logic";
import fromAddress from "../assets/fromAddress.svg";
import toAddress from "../assets/toAddress.svg";
import toAddressRejected from "../assets/toAddressRejected.svg";
import { getAddressPrefix, getTypeIcon } from "../components/TxTable/rowTxBuilder";

describe("Route -> Transaction -> Component", () => {
  describe("getAddressPrefix", () => {
    it("should return 'From' prefix if payment was recieved", () => {
      const tx = {
        received: true,
        signer: "me",
        recipient: "alex*iov",
        amount: stringToAmount("100.5", "IOV" as TokenTicker),
        time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
        success: false,
        id: "tx3",
      };
      expect(getAddressPrefix(tx)).toBe("From");
    });

    it("should return 'From' prefix if payment was sent", () => {
      const tx = {
        received: false,
        signer: "me",
        recipient: "alex*iov",
        amount: stringToAmount("100.5", "IOV" as TokenTicker),
        time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
        success: false,
        id: "tx3",
      };
      expect(getAddressPrefix(tx)).toBe("To");
    });
  });

  describe("getTypeIcon", () => {
    it("should return 'from' icon if payment was received", () => {
      const tx = {
        received: true,
        signer: "me",
        recipient: "alex*iov",
        amount: stringToAmount("100.5", "IOV" as TokenTicker),
        time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
        success: false,
        id: "tx3",
      };
      expect(getTypeIcon(tx)).toBe(fromAddress);
    });

    it("should return 'reject' icon if payment was rejected", () => {
      const tx = {
        received: false,
        signer: "me",
        recipient: "alex*iov",
        amount: stringToAmount("100.5", "IOV" as TokenTicker),
        time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
        success: false,
        id: "tx3",
      };
      expect(getTypeIcon(tx)).toBe(toAddressRejected);
    });

    it("should return 'to' icon if payment was sent", () => {
      const tx = {
        received: false,
        signer: "me",
        recipient: "alex*iov",
        amount: stringToAmount("100.5", "IOV" as TokenTicker),
        time: new ReadonlyDate("2018-12-24T10:51:33.763Z"),
        success: true,
        id: "tx3",
      };
      expect(getTypeIcon(tx)).toBe(toAddress);
    });
  });
});
