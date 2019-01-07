// tslint:disable:no-string-literal
import PseudoRandom from "random-js";

import { TokenTicker } from "@iov/core";

import { BlockchainSpec } from "./connection";
import { createProfile } from "./profile";

import { loadConfig } from "../utils/conf";

const config = loadConfig();

// load some config options
export const testSpec = config["chainSpec"] as BlockchainSpec;
export const testTicker = config["faucetToken"] as TokenTicker;
export const faucetUri = config["defaultFaucetUri"] as string;

export const skipTests = (): boolean => !process.env.BNS_ENABLED;
export const mayTest = skipTests() ? xit : it;

// this is a pre-loaded account we can play with (separate from the faucet)
const adminMnemonic = "scissors media glory glimpse insect trophy cause wheel opinion elite card media";
export const adminProfile = () => createProfile(adminMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);
