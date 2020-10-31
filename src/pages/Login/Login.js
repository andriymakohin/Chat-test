import React from "react";
import { GoogleLogin } from "react-google-login";
import { setToken, setUserInfo } from "../../redux/slice";
import { useDispatch } from "react-redux";

import styles from "./Login.module.css";

const CLIENT_ID =
  "103633925093-14i76rmintbq72196nfi2344cf2nko2p.apps.googleusercontent.com";
const errorLogin = (response) => {
  console.log(response);
};
const Login = () => {
  const dispatch = useDispatch();
  const loginSuccessGoogle = (response) => {
    dispatch(setToken(response.accessToken));
    dispatch(
      setUserInfo({
        name: response.profileObj.name,
        status: true,
        photo: response.profileObj.imageUrl,
      })
    );
  };

  return (
    <>
      <div className={styles.login}>
        <p className={styles.loginText}>
          Hi, this is a chat app. You must have a Google Account to sign in
        </p>
        <div className={styles.loginContainer}>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with google"
            onSuccess={loginSuccessGoogle}
            onFailure={errorLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
