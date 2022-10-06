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
import { IGun, GunUser, ISEA } from "gun";

import "./Home.css";

import {
  Project,
  ProjectNode,
  useProjectsCollection,
  useProjectVotes,
} from "../data/projects";
import { ProfileButton } from "../components/ProfileButton";
import { useVotes } from "../data/votes";
import { useSettings } from "../data/settings";
import { project } from "ramda";

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
  const { projects } = useProjectsCollection();
  const valueVotes = useVotes("value");
  const infeasibilityVotes = useVotes("infeasibility");
  const settings = useSettings();

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  // TODO: sort projects

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle size="small">Pitch It</IonTitle>
          <IonButtons className="" slot="end">
            <div className="header-votes">
              <IonText className="tiny">Votes Remaining</IonText>
              <div className="remaining-votes">
                <IonChip color="success">
                  Value: {valueVotes.remainingVotes}
                </IonChip>
                <IonChip color="danger">
                  Infeas: {infeasibilityVotes.remainingVotes}
                </IonChip>
              </div>
            </div>
            <ProfileButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pitch It</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonList>
          {([...(projects?.values() ?? [])] as Project[]).map((p) => (
            <ProjectListItem project={p} key={String(p.nodeID)} />
          ))}
        </IonList>
        {settings.state.allowAddProjects ? (
          <>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton routerLink="/project/create">
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;

export const Results = () => {
  const projects = useProjectsCollection();

  const keys: (keyof ProjectNode)[] = [
    "codename",
    "description",
    "presenters",
    "valueVotes",
    "infeasibilityVotes",
    "totalVotes",
  ];

  const projectList = [...(projects.projects?.values() ?? [])];

  const values = ([...(projects.projects?.values() ?? [])] as ProjectNode[])
    .map((p) => {
      return { ...p, totalVotes: p.valueVotes - p.infeasibilityVotes };
    })
    .map((p) => keys.map((k) => p[k as keyof typeof p]));

  const csv = [keys.join(","), ...values.map((v) => v.join(","))].join("\n");

  return (
    <pre>
      {keys.join(",") + "\n"}
      {projectList.map((p) => (
        <ResultRow project={p}></ResultRow>
      ))}
    </pre>
  );
};

export const ResultRow = ({ project }: any) => {
  const value = useProjectVotes(project, "value");
  const infeasibility = useProjectVotes(project, "infeasibility");

  const str = `${project.codename},${project.description},"${
    project.presenters
  }",${value.allVotes}, ${infeasibility.allVotes},${
    value.allVotes - infeasibility.allVotes
  }`;

  return <pre>{str}</pre>;
};