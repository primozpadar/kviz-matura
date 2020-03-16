import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import Nastavitve from "./pages/nastavitve/nastavitve.component";
import Igra from "./pages/igra/igra.components";

const App = () => {
  return (
    <Switch>
      <Route path="/igra" component={Igra} />
      <Route path="/nastavitve" component={Nastavitve} />
      <Route path="/" component={Homepage} />
    </Switch>
  );
};

export default App;
