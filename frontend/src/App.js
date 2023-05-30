import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Login from "./components/Login";
//import Register from "./components/Register";
import Messenger from "./components/Messenger";
import ProtectRoute from "./components/ProtectRoute";
import Prescription from "./feature/prescription";
import { VideoCall } from "./components/VideoCall";
import Login from "./feature/auth/login";
import Register from "./feature/auth/registration";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/messenger/login" component={Login} exact></Route>
        <Route path="/messenger/register" component={Register} exact></Route>
        <Route
          path="/messenger/prescription"
          component={Prescription}
          exact
        ></Route>
        <Route path="/room/:roomID" component={VideoCall} exact />
        <ProtectRoute path="/" component={Messenger} exact />
      </Switch>
    </Router>
  );
}

export default App;
