import React from "react";
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

export const AddProject = () => {
    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Project</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create Project</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Multiple Inputs</IonLabel>
                        <IonInput placeholder="Address Line 1"></IonInput>
                        <IonInput placeholder="Address Line 2"></IonInput>
                        <IonInput placeholder="City"></IonInput>
                        <IonInput placeholder="State"></IonInput>
                        <IonInput placeholder="Zip Code"></IonInput>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};
