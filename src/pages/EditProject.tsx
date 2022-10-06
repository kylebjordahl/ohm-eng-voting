import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Project, useProject, useProjectsCollection } from "../data/projects";
import { save, arrowBack } from "ionicons/icons";
import { Redirect, useHistory, useParams } from "react-router";
import { BackButton } from "../components/BackButton";

type NewProject = Pick<Project, "codename" | "presenters" | "description">;

export const EditProject: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { project, put } = useProject(params.id);

  const fieldSetterFactory = (field: keyof NewProject) => (e: CustomEvent) => {
    setFormState((state) => ({ ...state, [field]: e.detail.value }));
  };

  const [formState, setFormState] = useState<Partial<Project>>({});
  useEffect(() => {
    setFormState({
      codename: project.codename,
      presenters: project.presenters,
      description: project.description,
    });
  }, [project]);

  const [presentToast] = useIonToast();
  const history = useHistory();

  const onFabClick = () => {
    put(formState as Project);
    presentToast({
      message: `Edited ${formState.codename}!`,
      position: "bottom",
      duration: 1000,
      color: "success",
    });
    setFormState({});
    history.push("/");
  };

  return (
    <IonPage id="edit-project-page">
      <IonHeader>
        <IonToolbar>
          <BackButton />
          <IonTitle>Edit Project</IonTitle>
          <IonButtons slot="end" class="ion-padding-end">
            <IonButton onClick={onFabClick}>Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit Project</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="ion-padding">
          <IonItem className="ion-padding">
            <IonLabel position="floating">Codename</IonLabel>
            <IonInput
              value={formState?.codename}
              onIonChange={fieldSetterFactory("codename")}
            ></IonInput>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel position="floating">Presenter(s)</IonLabel>
            <IonInput
              value={formState?.presenters}
              onIonChange={fieldSetterFactory("presenters")}
            ></IonInput>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea
              value={formState?.description}
              onIonChange={fieldSetterFactory("description")}
            ></IonTextarea>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export const DeleteProject = () => {
  const params = useParams<{ id: string }>();
  const projects = useProjectsCollection();
  const project = projects.projects?.get(params.id);
  projects.removeFromSet(params.id);

  const [toaster] = useIonToast();
  toaster({
    message: `Deleted ${project?.codename}`,
    color: "warning",
    duration: 2000,
    position: "top",
  });
  return <Redirect to="/home" />;
};