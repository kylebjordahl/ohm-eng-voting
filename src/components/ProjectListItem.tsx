import React, {
  ReactEventHandler,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useGunCollectionState, useGunState } from "@altrx/gundb-react-hooks";
import {
  IonButton,
  IonButtons,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  IonPopover,
} from "@ionic/react";
import {
  thumbsUp,
  cash,
  addCircleOutline,
  removeCircleOutline,
  pencil,
} from "ionicons/icons";
import { Project, useProjectVotes } from "../data/projects";
import { useTypedAuth } from "../db/gun.context";
import "./ProjectListItem.css";

interface ProjectListItemProps {
  project: Project;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
  const { appKeys } = useTypedAuth();
  const value = useProjectVotes(project, "value");
  const infeasibility = useProjectVotes(project, "infeasibility");

  function auxClickFactory(fn: () => any) {
    return (e: any) => {
      e.preventDefault();
      fn();
    };
  }

  return (
    <IonItem
      // routerLink={`/project/${project.codename}`}
      detail={false}
    >
      <IonText className="number-rank ion-padding-start" slot="start">
        <h1>{value.allVotes - infeasibility.allVotes}</h1>
      </IonText>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span className="codename">{project.codename}</span>
          <span className="presenter">
            <IonNote>{project.presenters}</IonNote>
          </span>
        </h2>
        <p>{project.description}</p>
        <IonButtons slot="helper">
          <IonChip color="success">
            <IonButton onClick={() => value.downvote()}>
              <IonIcon size="small" icon={removeCircleOutline} />
            </IonButton>
            <IonText class="number-counter">{value.userVotes}</IonText>
            <IonButton onClick={() => value.upvote()}>
              <IonIcon size="small" icon={addCircleOutline} />
            </IonButton>
          </IonChip>
          <IonChip color="danger">
            <IonButton onClick={() => infeasibility.downvote()}>
              <IonIcon size="small" icon={removeCircleOutline} />
            </IonButton>
            <IonText class="number-counter">{infeasibility.userVotes}</IonText>
            <IonButton onClick={() => infeasibility.upvote()}>
              <IonIcon size="small" icon={addCircleOutline} />
            </IonButton>
          </IonChip>
        </IonButtons>
      </IonLabel>
      <IonButtons slot="end">
        <IonButton routerLink={`/project/${project.nodeID as string}`}>
          <IonIcon icon={pencil} />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default ProjectListItem;
