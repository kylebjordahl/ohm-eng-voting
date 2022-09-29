import React from "react";
import Gun, {
  IGun,
  GunUser,
  ISEA,
  IGunUserInstance,
  IGunInstanceRoot,
  IGunInstance,
} from "gun";
import sea from "gun/sea";
import "gun/lib/radix";
import "gun/lib/radisk";
import "gun/lib/store";
import "gun/lib/rindexed";
import "gun/lib/unset";
import { GunProvider, useAuth } from "@altrx/gundb-react-auth";
const asyncFn =
  (fn: any) =>
  (...args: any) => {
    return new Promise((resolve) => {
      resolve(fn.call(fn, ...args));
    });
  };

const storage = {
  setItem: asyncFn(localStorage.setItem.bind(localStorage)),
  getItem: asyncFn(localStorage.getItem.bind(localStorage)),
  removeItem: asyncFn(localStorage.removeItem.bind(localStorage)),
};

const peers: string[] = ["http://192.168.86.67:8765/gun"];

const GunContext: React.FC<{ children: any }> = ({ children }) => {
  return (
    <GunProvider
      peers={peers}
      sea={sea}
      Gun={Gun}
      keyFieldName="ohmEngVoting"
      storage={storage}
      gunOpts={{
        localStorage: true,
        radisk: true,
        peers,
      }}
    >
      {children}
    </GunProvider>
  );
};

export { GunContext };

export interface AuthHookPayload {
  gun: IGunInstance;
  user: IGunUserInstance;
  login: (keys?: unknown) => void;
  logout: () => void;
  sea: ISEA;
  appKeys: {
    pub: string;
    priv: string;
    epub: string;
    epriv: string;
  };
  isLoggedIn: boolean;
  newGunInstance: (...args: any) => unknown;
}

export const useTypedAuth: () => AuthHookPayload = useAuth;
