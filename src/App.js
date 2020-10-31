import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { navigation } from "./nav/navigation";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  const { token } = useSelector((state) => state.session);
  const RouteLogin = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: navigation.redirect,
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
  const RouteNoLogin = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        !token ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: navigation.home, state: { from: props.location } }}
            />
          )
      }
    />
  );
  return (
    <div>
      <Switch>
        <RouteLogin path={navigation.home} component={Home} />
        <RouteNoLogin path={navigation.login} component={Login} />
        <Redirect to={navigation.login} />
      </Switch>
    </div>
  );
}

export default App;
