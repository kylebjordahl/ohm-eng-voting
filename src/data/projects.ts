import { useAuth } from "@altrx/gundb-react-auth";
import { useGunCollectionState, useGunState } from "@altrx/gundb-react-hooks";
import { IGunSchema } from "gun/types";
import { reduce } from "ramda";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTypedAuth } from "../db/gun.context";
import { useVotes } from "./votes";

export interface Project extends IGunSchema {
  codename: string;
  presenters: string;
  votes: {
    [key: string]: number;
  };
}

export const useProjectsCollection = () => {
  const { gun } = useAuth();

  const { collection: projects, ...collectionState } =
    useGunCollectionState<Project>(gun.get("projects"));

  return {
    projects,
    ...collectionState,
  };
};

export const useProjectVotes = (
  project: Project,
  type: "value" | "infeasibility"
) => {
  const { gun, appKeys } = useTypedAuth();
  const [votes, setVotes] = useState<number>(0);

  const { fields, put } = useGunState<Record<string, number>>(
    gun
      .get(project.nodeID as string)
      .get("votes")
      .get(type)
  );

  const userProjectVotes = useGunState<number>(
    gun
      .get("people")
      .get(appKeys.pub)
      .get("votes")
      .get(type)
      .get(project.nodeID as string)
  );

  const userVotes = useVotes(type);

  useEffect(() => {
    const voteTotal = reduce(
      (total, votes) => (typeof votes == "number" ? total + votes : total),
      0,
      Object.values(fields)
    );
    setVotes(voteTotal);
  }, [fields]);

  const upvote = useCallback(() => {
    if (userVotes.remainingVotes > 0) {
      const currentVote = fields[appKeys.pub] ?? 0;
      put({ [appKeys.pub]: currentVote + 1 });
      userProjectVotes.put(currentVote + 1);
    }
  }, [fields, put, appKeys, userVotes.remainingVotes, userProjectVotes]);

  const downvote = useCallback(() => {
    const currentVote = fields[appKeys.pub] ?? 0;
    if (currentVote > 0) {
      put({ [appKeys.pub]: currentVote - 1 });
      // return a user vote
      if (currentVote < userVotes.maxVotes) {
        userProjectVotes.put(currentVote - 1);
      }
    }
  }, [fields, put, appKeys, userProjectVotes, userVotes.maxVotes]);

  return {
    votes,
    upvote,
    downvote,
  };
};
