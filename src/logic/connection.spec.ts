import { BcpTicker } from "@iov/bcp-types";
import { MultiChainSigner } from "@iov/core";

import { addBlockchain } from "./connection";
import { createProfile } from "./profile";
import { mayTest, testSpec } from "./testhelpers";

describe("addBlockchain", () => {
  mayTest("should connect to local testnet", async () => {
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const reader = await addBlockchain(writer, testSpecData);
    try {
      expect(reader).toBeTruthy();
      // basic checks that we connected properly
      expect(reader.chainId()).toMatch(/chain-/);

      // check a reasonable height
      expect(await reader.height()).toBeGreaterThan(1);

      // check proper tickers
      const tickers = await reader.getAllTickers();
      expect(tickers.data.length).toEqual(2);
      const tokens = tickers.data.map((tick: BcpTicker) => tick.tokenTicker);
      expect(tokens).toEqual(["CASH", "IOV"]);
    } finally {
      reader.disconnect();
    }
  });
});
