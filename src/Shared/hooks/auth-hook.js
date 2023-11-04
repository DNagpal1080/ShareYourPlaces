import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setuserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  //Login with credentials
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuserId(uid);
    const tokenExpData =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 30);

    setTokenExpirationDate(tokenExpData);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpData.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('userData'));
    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(storeData.userId, storeData.token, new Date(storeData.expiration));
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setuserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearInterval(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};

export default useAuth;
