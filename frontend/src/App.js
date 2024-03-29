import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectRoute from "./route/ProtectRoute";
import Prescription from "./feature/prescription";
import VideoCall from "./feature/video-call";
import Login from "./feature/auth/login";
import Register from "./feature/auth/registration";
import Messenger from "./feature/messenger";
import HomePage from "./pages/home-page";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomePage} exact></Route>
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
