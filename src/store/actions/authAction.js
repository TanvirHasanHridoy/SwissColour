import {AsyncStorage} from 'react-native';
import {AUTH_SET_TOKEN} from './actionTypes';
import axios from 'axios';
//import App from '../../../App';

const API_URL = 'http://118.67.215.206/schmapi/schmaccesstoken';

export const tryAuth = authData => {
  return dispatch => {
    if (authData) {
      console.log(authData);
      dispatch(authSingIn(authData));
    }
  };
};

export const authSingIn = authData => {
  console.log(authData);

  const user = {
    userName: authData.username,
    password: authData.password,
    grant_type: 'password',
  };

  let formBody = [];
  for (let property in user) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(user[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  let requestOptions = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return dispatch => {
    axios
      .post(API_URL, formBody, requestOptions)
      .then(res => {
        const resData = res.data;
        if (!resData.access_token) {
          alert('Authentication failed, please try again!');
        } else {
          console.log(resData.access_token);
          alert('your token is--- '+resData.access_token);
          dispatch(authStoreToken(resData.access_token, resData.expires_in));
          return true;
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      });

    // fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body:
    //     'username=' +
    //     authData.username +
    //     '&password=' +
    //     authData.password +
    //     '&grant_type=password',
    // })
    //   .catch(err => {
    //     console.log(err);
    //     alert('Login Failed');
    //   })
    //   .then(res => res.json())
    //   .then(parsedRes => {
    //     console.log(parsedRes);
    //     if (!parsedRes.access_token) {
    //       alert('Authentication failed, please try again!');
    //     } else {
    //       dispatch(
    //         authStoreToken(parsedRes.access_token, parsedRes.expires_in),
    //       );
    //       return true;
    //     }
    //   });
  };
};

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    console.log(expiryDate);
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem('ap:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem('ap:auth:expiryDate');
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};


export const authAutoSingIn = navigation => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        console.log('autoSignIn', token);
        if (token) {
          navigation();
        }
      })
      .catch(err => console.log('Failed to fetch token!'));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('ap:auth:token');
    return AsyncStorage.removeItem('ap:auth:expiryDate');
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      App();
    });
    dispatch(authRemoveToken());
  };
};


export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN,
  };
};
