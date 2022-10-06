import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {GunProvider} from '@altrx/gundb-react-auth'

import Home, { Results } from "./pages/Home";
import ViewMessage from './pages/ViewMessage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { GunContext, useTypedAuth } from "./db/gun.context";
import { AddProject } from "./pages/AddProject";
import { LoginPage } from "./pages/Login";
import { SettingsPage } from "./pages/Settings";
import { DeleteProject, EditProject } from "./pages/EditProject";

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <GunContext>
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes />
          </IonRouterOutlet>
        </IonReactRouter>
      </GunContext>
    </IonApp>
  );
};

const Routes: React.FC = () => {
  const auth = useTypedAuth();
  const isLoggedIn = auth.isLoggedIn;
  console.log({ isLoggedIn });
  return isLoggedIn ? (
    <>
      <Route path="/" exact={true}>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact={true}>
        <Home />
      </Route>
      <Route path="/project/:id/delete" exact={true}>
        <DeleteProject />
      </Route>
      <Route path="/project/:id">
        <EditProject />
      </Route>
      <Route path="/project/create">
        <AddProject />
      </Route>
      <Route path="/secret/settings" exact={true}>
        <SettingsPage />
      </Route>
      <Route path="/secret/results" exact={true}>
        <Results />
      </Route>
    </>
  ) : (
    <LoginPage />
  );
};

export default App;
