import { useGunCollectionState, useGunState } from "@altrx/gundb-react-hooks";
import { useCallback, useEffect, useState } from "react";
import { useTypedAuth } from "../db/gun.context";

export interface Profile {
  nodeID: string;
  name: string;
}

export const useProfile = () => {
  const { gun, appKeys, isLoggedIn } = useTypedAuth();

  const state = useGunState<Profile>(
    gun
      .get("people")
      .get(appKeys?.pub ?? "anonuser")
      .get("profile")
  );

  (window as any).gun = gun;

  const [nameToSet, setNameToSet] = useState<string>();

  useEffect(() => {
    if (nameToSet && !state.fields.name) {
      state.put({ name: nameToSet } as Profile);
    }
  }, [isLoggedIn, nameToSet]);

  return {
    profile: state.fields,
    setNameOnLogin: setNameToSet,
    ...state,
  };
};

export const usePeople = () => {
  const { gun } = useTypedAuth();

  const state = useGunCollectionState<Profile>(gun.get("people"));

  return {
    people: state.collection,
    ...state,
  };
};
