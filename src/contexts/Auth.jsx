import { createContext, useState } from 'preact';

const Auth = createContext({});

function AuthProvider({ children }) {
  const [state, setState] = useState({
    domain: '',
    token: '',
    micropubEndpoint: '',
    isLoading: false,
    hasErrors: false,
    errorMessage: '',
    authorizationPageOpened: false,
  });

  const value = {
    isLoggedIn: () => state.token && state.micropubEndpoint,
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
}

export default Auth;
export { AuthProvider };
