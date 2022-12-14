import React, { useState } from "react";
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
import { Project, useProjectsCollection } from "../data/projects";
import { add, arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import { BackButton } from "../components/BackButton";

type NewProject = Pick<Project, "codename" | "presenters" | "description">;
export const AddProject = () => {
  const [formState, setFormState] = useState<Partial<NewProject>>({});

  const fieldSetterFactory = (field: keyof NewProject) => (e: CustomEvent) => {
    setFormState((state) => ({ ...state, [field]: e.detail.value }));
  };

  const { addToSet } = useProjectsCollection();
  const [presentToast] = useIonToast();
  const history = useHistory();

  const onFabClick = () => {
    addToSet(formState as Project);
    presentToast({
      message: `Added ${formState.codename}!`,
      position: "bottom",
      duration: 1000,
      color: "success",
    });
    setFormState({});
    history.push("/");
  };

  return (
    <IonPage id="add-project-page">
      <IonHeader>
        <IonToolbar>
          <BackButton />
          <IonTitle>Create Project</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create Project</IonTitle>
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
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onFabClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
