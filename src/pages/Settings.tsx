import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BackButton } from "../components/BackButton";
import { useSettings } from "../data/settings";
import { useAllowedVotes } from "../data/votes";

export const SettingsPage = () => {
  const allowedVotes = useAllowedVotes();
  const settings = useSettings();

  return (
    <IonPage id="settings-page">
      <IonHeader>
        <IonToolbar>
          <BackButton />
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="ion-padding">
          <IonItemGroup>
            <IonItemDivider>
              <IonText>Vote Quantities</IonText>
            </IonItemDivider>
            <IonItem className="ion-padding">
              <IonLabel position="floating">Value Votes per Person</IonLabel>
              <IonInput
                type="number"
                value={allowedVotes.value ?? 0}
                onIonChange={(e) =>
                  allowedVotes.put({
                    value: parseInt(e.detail.value ?? "0", 10),
                  })
                }
              ></IonInput>
            </IonItem>
            <IonItem className="ion-padding">
              <IonLabel position="floating">Value Votes per Person</IonLabel>
              <IonInput
                type="number"
                value={allowedVotes.infeasibility ?? 0}
                onIonChange={(e) =>
                  allowedVotes.put({
                    infeasibility: parseInt(e.detail.value ?? "0", 10),
                  })
                }
              ></IonInput>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItem className="ion-padding">
              <IonLabel>Allow adding new projects</IonLabel>
              <IonCheckbox
                checked={settings.state.allowAddProjects ?? false}
                onIonChange={(e) =>
                  settings.updateState({ allowAddProjects: e.detail.checked })
                }
              ></IonCheckbox>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
