import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";

// Utils
import setAuthToken from "../utils/setAuthToken";

const BASEURL = "http://192.168.1.35:8000";
// "http://207.154.246.97";

const instance = axios.create({
  // baseURL: "http://192.168.100.244:8000/"
  baseURL: BASEURL
});

class Store {
  constructor() {
    this.user = null;
  }

  get isAuthenticated() {
    return !!this.user;
  }

  setCurrentUser(decoded) {
    this.user = decoded;
  }

  logoutUser() {
    AsyncStorage.removeItem("jwtToken").then(
      () => {
        this.user = null;

        setAuthToken();
      },
      () => {
        console.log("something went wrong with logging out");
      }
    );
  }

  loginUser(username, password) {
    const userData = {
      username: username,
      password: password
    };
    instance
      .post("login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token).then(
          () => {
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
            // this.props.navigation.navigate('FirstPage');
          },
          () => console.log("something went wrong with setting jwt token")
        );
      })
      .then(console.log("login Done"))
      .catch(err => console.log(err));
  }

  registerUser(firstname, lastname, username, emailAddress, password) {
    const userData = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: emailAddress,
      password: password
    };
    instance
      .post("register/", userData)
      .then(res => res.response)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token)
          .then(() => {
            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    //   return (
    // this.loginUser(username, password)
    //   )
  }

  checkForToken = () => {
    AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          const currentTime = Date.now() / 1000;

          // Decode token and get user info
          const decoded = jwt_decode(token);

          // Check token expiration
          if (decoded.exp >= currentTime) {
            // Set auth token header
            setAuthToken(token);
            // Set user and isAuthenticated
            this.setCurrentUser(decoded);
          } else {
            this.logoutUser();
            // Redirect to login
          }
        }
      })
      .catch(err => console.error(err));
  };
}

decorate(Store, {
  user: observable,
  isAuthenticated: computed
});

export default new Store();
