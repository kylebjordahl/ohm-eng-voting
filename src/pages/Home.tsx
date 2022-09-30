import React from "react";
import ProjectListItem from "../components/ProjectListItem";
import {
  IonButtons,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
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
    // addToSet({
    //   codename: `something ${Date.now()}`,
    //   presenters: "kyle",
    //   votes: {},
    // });
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pitch It</IonTitle>
          <IonButtons className="header-votes" slot="end">
            <IonText className="tiny">Votes Remaining</IonText>
            <div className="remaining-votes">
              <IonChip color="success">
                Value: {valueVotes.remainingVotes}
              </IonChip>
              <IonChip color="danger">
                Infeas: {infeasibilityVotes.remainingVotes}
              </IonChip>
            </div>
            {/* <ProfileButton /> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pitch It</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {([...(projects?.values() ?? [])] as Project[]).map((p) => (
            <ProjectListItem project={p} key={String(p.nodeID)} />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/project/create">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
