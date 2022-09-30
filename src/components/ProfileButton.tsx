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
} from "@ionic/react";
import { person, personAddOutline } from "ionicons/icons";
import { useTypedAuth } from "../db/gun.context";
import { useProfile } from "../data/user";

export interface ProfileButtonProps {}

export const ProfileButton: React.FC<ProfileButtonProps> = ({}) => {
  const { login, isLoggedIn, appKeys } = useTypedAuth();
  const modal = useRef<HTMLIonModalElement>(null);
  // const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    login();
    modal.current?.dismiss();
  }

  const { profile, put } = useProfile();
  function onUpdateName(e: InputCustomEvent) {
    console.log(appKeys);
    const alias = String(e.detail.value);
    const updated = {
      ...profile,
      name: alias,
    };
    put(updated);
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <IonButton aria-label="Edit profile" id="open-modal">
            <IonIcon icon={person}></IonIcon>
          </IonButton>
          {/* <IonModal ref={modal} trigger="open-modal">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonTitle>Welcome</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Enter your name</IonLabel>
                <IonInput
                  // ref={input}
                  type="text"
                  placeholder="Your name"
                  value={profile.name ?? ""}
                  onIonChange={onUpdateName}
                />
              </IonItem>
            </IonContent>
          </IonModal> */}
        </>
      ) : (
        <IonButton aria-label="Log in" onClick={() => login()}>
          Log In
          <IonIcon icon={personAddOutline}></IonIcon>
        </IonButton>
      )}
    </>
  );
};
