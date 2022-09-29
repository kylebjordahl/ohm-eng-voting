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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  thumbsUp,
  cash,
  addCircleOutline,
  removeCircleOutline,
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
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {project.codename}
          <span className="date">
            <IonNote>{project.presenters}</IonNote>
          </span>
        </h2>
        <h3>{project.codename}</h3>
        <p>{JSON.stringify(project.votes)}</p>
      </IonLabel>
      <IonButtons slot="end">
        <IonChip>
          Value
          <IonButton onClick={() => value.upvote()}>
            <IonIcon size="small" icon={addCircleOutline} />
          </IonButton>
          <IonText class="number-counter">{value.votes}</IonText>
          <IonButton onClick={() => value.downvote()}>
            <IonIcon size="small" icon={removeCircleOutline} />
          </IonButton>
        </IonChip>
        <IonChip>
          Infeasibility
          <IonButton onClick={() => infeasibility.upvote()}>
            <IonIcon size="small" icon={addCircleOutline} />
          </IonButton>
          <IonText class="number-counter">{infeasibility.votes}</IonText>
          <IonButton onClick={() => infeasibility.downvote()}>
            <IonIcon size="small" icon={removeCircleOutline} />
          </IonButton>
        </IonChip>
      </IonButtons>
    </IonItem>
  );
};

export default ProjectListItem;
