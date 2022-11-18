import { createContext } from 'preact';
import { useState } from 'preact/hooks';

console.log('init context');
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
  console.log('render AuthProvider');

  const value = {
    isLoggedIn: () => state.token && state.micropubEndpoint,
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
}

export default Auth;
export { AuthProvider };
