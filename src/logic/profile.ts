import { Bip39, Random } from "@iov/crypto";
import { Ed25519HdWallet, HdPaths, LocalIdentity, UserProfile, WalletId } from "@iov/keycontrol";

import { hasDbKey, StringDB } from "./db";

const EntropyBytes = 16;

// initializes a UserProfile with one keyring and one identity
// you can pass in a mnemonic or it will generate a random one
export async function createProfile(fixedMnemonic?: string): Promise<UserProfile> {
  const mnemonic = fixedMnemonic || Bip39.encode(await Random.getBytes(EntropyBytes)).asString();
  const keyring = Ed25519HdWallet.fromMnemonic(mnemonic);
  const profile = new UserProfile();
  profile.addWallet(keyring);
  await profile.createIdentity(keyring.id, HdPaths.simpleAddress(0));
  return profile;
}

// returns id of the first keyring
export function getMainKeyring(profile: UserProfile): WalletId {
  const wallets = profile.wallets.value;
  if (wallets.length < 1) {
    throw new Error("No wallet on the UserProfile");
  }
  return wallets[0].id;
}

export interface WalletAndIdentity {
  readonly walletId: WalletId;
  readonly identity: LocalIdentity;
}

// returns the first identity on the first keyring.
// throws an error if this doesn't exist
export function getMainWalletAndIdentity(profile: UserProfile): WalletAndIdentity {
  const walletId = getMainKeyring(profile);
  const idents = profile.getIdentities(walletId);
  if (idents.length < 1) {
    throw new Error("There must be an identity on the first wallet");
  }
  return {
    walletId,
    identity: idents[0],
  };
}

export function getMainIdentity(profile: UserProfile): LocalIdentity {
  return getMainWalletAndIdentity(profile).identity;
}

// returns true if there is a profile to load
export async function hasStoredProfile(db: StringDB): Promise<boolean> {
  // copied from userProfile.ts.... there should be a cleaner way
  const storageKeyCreatedAt = "created_at";
  const storageKeyKeyring = "keyring";
  return (await hasDbKey(db, storageKeyCreatedAt)) && hasDbKey(db, storageKeyKeyring);
}

// loads the profile if possible, otherwise creates a new one and saves it
// throws an error on existing profile, but bad password
// if mnemonic is provided, it will create new one from that mnemonic, overwriting anything that exists
export async function loadOrCreateProfile(
  db: StringDB,
  password: string,
  mnemonic?: string,
): Promise<UserProfile> {
  // exisiting db with simple password will trigger load
  if ((await hasStoredProfile(db)) && !mnemonic) {
    return loadProfile(db, password);
  }
  // provided mnemonic or db missing will trigger reset
  return resetProfile(db, password, mnemonic);
}

// creates new profile with random seed, or existing mnemonic if provided
export async function resetProfile(db: StringDB, password: string, mnemonic?: string): Promise<UserProfile> {
  const profile = await createProfile(mnemonic);
  await profile.storeIn(db, password);
  return profile;
}

export async function loadProfile(db: StringDB, password: string): Promise<UserProfile> {
  try {
    const res = await UserProfile.loadFrom(db, password);
    return res;
  } catch (err) {
    // TODO: rethink how we handle this, this is a bit dangerous as is, but there
    // is no recovery path yet. From iov-core 0.8.0, there should be auto-migration
    console.log("Invalid password or invalid format of current DB");
    console.log("If the password is correct, try resetProfile...");
    throw err;
  }
}

// this normalizes white-space and makes everything lower-case, so two mnemonics that look the same
// to a human also look the same to a machine
export function cleanMnemonic(mnemonic: string): string {
  const base = mnemonic.toLowerCase().trim();
  // collapse any whitespace between words into a simple space
  return base.replace(/\s+/g, " ");
}
