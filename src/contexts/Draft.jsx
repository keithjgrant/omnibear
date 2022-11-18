import { createContext } from 'preact';

const Draft = createContext({});

function DraftProvider({ children }) {
  const value = {};

  return <Draft.Provider value={value}>{children}</Draft.Provider>;
}

export default Draft;
export { DraftProvider };
