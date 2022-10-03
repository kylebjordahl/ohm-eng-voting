import { useGunState } from "@altrx/gundb-react-hooks";
import { useCallback } from "react";
import { useTypedAuth } from "../db/gun.context";

export interface Settings {
  allowAddProjects: boolean;
}

export const useSettings = () => {
  const { gun } = useTypedAuth();

  const { fields: state, ...other } = useGunState<Settings>(
    gun.get("settings").get("allowAddProjects")
  );

  const updateState = useCallback(
    (newState: Partial<Settings>) => {
      other.put(newState as Settings);
    },
    [other]
  );

  return {
    state,
    updateState,
  };
};
