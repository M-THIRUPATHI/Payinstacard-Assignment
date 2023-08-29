import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Product from "./Product";
import Job from "./Job";
import Profile from "./Profile";
import "./App.css";

import ProtectedRoute from "./ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/product" component={Product} />
      <ProtectedRoute exact path="/job" component={Job} />
      <ProtectedRoute exact path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default App;
