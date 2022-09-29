import { useGunState } from "@altrx/gundb-react-hooks";
import { reduce } from "ramda";
import { useEffect, useState } from "react";
import { useTypedAuth } from "../db/gun.context";

export type VoteType = "value" | "infeasibility";

export const useVotes = (type: VoteType) => {
  const { gun, appKeys } = useTypedAuth();

  const voteData = useGunState<Record<string, number>>(
    gun
      .get("people")
      .get(appKeys?.pub ?? "anon")
      .get("votes")
      .get(type)
  );

  const allowedVotes = useGunState<Record<string, number>>(
    gun.get("settings").get("allowedVotes")
  );

  const maxVotes = allowedVotes.fields[type];

  const [votes, setVotes] = useState<number>(0);

  useEffect(() => {
    const voteTotal = reduce(
      (total, votes) => (typeof votes == "number" ? total + votes : total),
      0,
      Object.values(voteData.fields)
    );
    setVotes(voteTotal);
  }, [voteData.fields]);

  return {
    votes,
    projectVotes: voteData.fields,
    remainingVotes: (maxVotes ?? 0) - (votes ?? 0),
    maxVotes,
  };
};
