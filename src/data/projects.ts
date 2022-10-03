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
  description: string;
}

export interface ProjectNode extends Project {
  nodeID: string;
  votes: {
    [key: string]: number;
  };
  valueVotes: number;
  infeasibilityVotes: number;
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
  const [allVotes, setVotes] = useState<number>(0);
  const projectNodeData = useProject(project.nodeID as string);

  const { fields: projectVotes, put: putProjectVotes } = useGunState<
    Record<string, number>
  >(
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
      Object.values(projectVotes)
    );
    setVotes(voteTotal);
    projectNodeData.put({ [`${type}Votes`]: voteTotal } as any);
  }, [projectVotes]);

  const upvote = useCallback(() => {
    if (userVotes.remainingVotes > 0) {
      const currentVote = projectVotes[appKeys.pub] ?? 0;
      putProjectVotes({ [appKeys.pub]: currentVote + 1 });
      userProjectVotes.put(currentVote + 1);
    }
  }, [
    projectVotes,
    putProjectVotes,
    appKeys,
    userVotes.remainingVotes,
    userProjectVotes,
  ]);

  const downvote = useCallback(() => {
    const currentVote = projectVotes[appKeys.pub] ?? 0;
    if (currentVote > 0) {
      putProjectVotes({ [appKeys.pub]: currentVote - 1 });
      // return a user vote
      if (currentVote < userVotes.maxVotes) {
        userProjectVotes.put(currentVote - 1);
      }
    }
  }, [
    projectVotes,
    putProjectVotes,
    appKeys,
    userProjectVotes,
    userVotes.maxVotes,
  ]);

  return {
    allVotes: allVotes ?? 0,
    userVotes: userVotes.projectVotes[project.nodeID as string] ?? 0,
    upvote,
    downvote,
  };
};

export const useProject = (nodeID: string) => {
  const { gun } = useAuth();

  const { fields: project, ...state } = useGunState<Project | ProjectNode>(
    gun.get(nodeID)
  );

  return {
    project,
    ...state,
  };
};