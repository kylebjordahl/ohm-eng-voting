import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

export const BackButton = () => (
  <IonButtons slot="start">
    <IonButton routerLink="/home">
      <IonIcon icon={arrowBack} />
    </IonButton>
  </IonButtons>
);
