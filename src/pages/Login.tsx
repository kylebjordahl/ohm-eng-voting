import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonButtons,
  IonButton,
  IonItemDivider,
  IonText,
  IonItem,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useProfile } from "../data/user";
import { useTypedAuth } from "../db/gun.context";

import "./Login.css";

export const LoginPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [keys, setKeys] = useState<string>("");
  const profile = useProfile();

  const { login } = useTypedAuth();
  const [toaster] = useIonToast();

  function doCreateUser() {
    try {
      if (!name) {
        throw Error("You must supply a name");
      }
      profile.setNameOnLogin(name);
      login();
      toaster({
        message: `Created your user`,
        duration: 1000,
        position: "bottom",
        color: "success",
      });
    } catch (e) {
      toaster({
        message: String(e),
        duration: 2000,
        position: "bottom",
        color: "warning",
      });
    }
  }
  function doLoginWithKeys() {
    try {
      const keysParsed = JSON.parse(keys);
      login(keysParsed);
    } catch {
      toaster({
        message: `Invalid Keys`,
        duration: 2000,
        position: "bottom",
        color: "warning",
      });
    }
  }
  return (
    <>
      <IonPage id="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Log In</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="block-text">
            <IonText className=" ion-margin">
              <h6>Create a user, it will be remembered on this browser</h6>
            </IonText>
          </div>
          <IonCard>
            <IonCardContent className="login-card">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  value={name}
                  onIonChange={(e) => setName(e.detail.value ?? "")}
                />
              </IonItem>
              <div className="ion-login-button">
                <IonButton
                  className="ion-justify-self-center"
                  onClick={doCreateUser}
                >
                  Create User
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
          <div className="block-text">
            <IonText className=" ion-margin">
              <h6>Or, if you already have a user in a different browser</h6>
            </IonText>
          </div>
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Paste Keys Here</IonLabel>
                <IonInput
                  value={keys}
                  onIonChange={(e) => setKeys(e.detail.value ?? "")}
                />
              </IonItem>
              <div className="ion-login-button">
                <IonButton
                  className="ion-justify-self-center"
                  onClick={doLoginWithKeys}
                >
                  Log In
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};
