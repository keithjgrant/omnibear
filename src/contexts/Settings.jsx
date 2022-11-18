import { createContext } from 'preact';

const Settings = createContext({});

function SettingsProvider({ children }) {
  const value = {
    getSyndicateOptions: () => {
      return [];
    },
  };

  return <Settings.Provider value={value}>{children}</Settings.Provider>;
}

export default Settings;
export { SettingsProvider };
