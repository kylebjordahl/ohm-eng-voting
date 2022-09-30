import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAllowedVotes } from "../data/votes";

export const SettingsPage = () => {
  const allowedVotes = useAllowedVotes();

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
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
          <IonItem className="ion-padding">
            <IonLabel position="floating">Value Votes per Person</IonLabel>
            <IonInput
              type="number"
              value={allowedVotes.value ?? 0}
              onIonChange={(e) =>
                allowedVotes.put({ value: parseInt(e.detail.value ?? "0", 10) })
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};
