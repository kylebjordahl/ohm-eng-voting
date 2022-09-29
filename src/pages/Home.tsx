import React from "react";
import ProjectListItem from "../components/ProjectListItem";
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { IGun, GunUser, ISEA, IGunInstance } from "gun";

import "./Home.css";

import { Project, useProjectsCollection } from "../data/projects";
import { useAuth } from "@altrx/gundb-react-auth";
import { ProfileButton } from "../components/ProfileButton";
import { useTypedAuth } from "../db/gun.context";
import { useVotes } from "../data/votes";

interface AuthHookPayload {
  gun: IGun;
  user: GunUser;
  login: (keys?: unknown) => void;
  logout: () => void;
  sea: ISEA;
  appKeys: any;
  isLoggedIn: boolean;
  newGunInstance: (...args: any) => unknown;
}

const Home: React.FC = () => {
  const { gun, appKeys } = useTypedAuth();
  const { projects, addToSet, updateInSet } = useProjectsCollection();
  const valueVotes = useVotes("value");
  const infeasibilityVotes = useVotes("infeasibility");

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const onFabClick = () => {
    addToSet({
      codename: `something ${Date.now()}`,
      presenters: "kyle",
      votes: {},
    });
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Projects</IonTitle>
          <IonButtons slot="end">
            Value: {valueVotes.remainingVotes} Infeas:{" "}
            {infeasibilityVotes.remainingVotes}
            <ProfileButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {([...(projects?.values() ?? [])] as Project[]).map((p) => (
            <ProjectListItem project={p} key={String(p.nodeID)} />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onFabClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
