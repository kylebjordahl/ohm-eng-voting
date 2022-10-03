import React, { useRef } from "react";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  InputCustomEvent,
  IonText,
  IonTextarea,
  IonChip,
} from "@ionic/react";
import { person, close } from "ionicons/icons";
import { useTypedAuth } from "../db/gun.context";
import { useProfile } from "../data/user";

export interface ProfileButtonProps {}

export const ProfileButton: React.FC<ProfileButtonProps> = ({}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { appKeys } = useTypedAuth();

  const { profile } = useProfile();

  console.log({ profile });

  return (
    <>
      <IonButton aria-label="Edit profile" id="open-modal">
        <IonTitle size="small">{profile.name}</IonTitle>
        <IonIcon icon={person}></IonIcon>
      </IonButton>
      <IonModal ref={modal} trigger="open-modal">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
            <IonTitle>Your Keys</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel class="ion-text-wrap">
              <IonText>
                If you want to move to a new browser, copy these keys and paste
                them in the login screen on the new browser
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonTextarea value={JSON.stringify(appKeys)}></IonTextarea>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};
