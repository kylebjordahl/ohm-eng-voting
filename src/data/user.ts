import { useGunCollectionState, useGunState } from "@altrx/gundb-react-hooks";
import { useEffect } from "react";
import { useTypedAuth } from "../db/gun.context";

export interface Profile {
  nodeID: string;
  name: string;
}

export const useProfile = () => {
  const { gun, appKeys } = useTypedAuth();

  const state = useGunState<Profile>(
    gun
      .get("people")
      .get(appKeys?.pub ?? "anonuser")
      .get("profile")
  );

  return {
    profile: state.fields,
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
