import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import authStore from './Auth';
// import settingsStore from './settingsStore';
import {
  NOTE,
  REPLY,
  BOOKMARK,
  LOGIN,
  MESSAGE,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';
import {
  postNote,
  postReply,
  postBookmark,
  postLike,
  postRepost,
} from '../util/micropub';
import { getParamFromUrl } from '../util/url';
import { info, warning, error } from '../util/log';
import { sanitizeMicropubError } from '../util/utils';

// TODO: rename to publish context? Draft context?
const App = createContext({});

function AppProvider({ children }) {
  const determineInitialView = () => {
    // TODO
    return LOGIN;
  };

  const [state, setState] = useState({
    viewType: determineInitialView(),
    currentPageUrl: null,
    currentItemUrl: null,
    selectedEntry: null,
    isSending: false,
    flashMessage: '',
  });
  // const auth = useContext(Auth);
  // const draft = useContext(Draft);
  // const settings = useContext(Settings);

  const setViewType = (type) => {
    /*
    if (type === BOOKMARK) {
      draft.setTitle(state.selectedEntry ? state.selectedEntry.title : '');
    } else {
      draft.setTitle('');
    }
    draft.setType(type);
    */
    setState((prevState) => ({
      ...prevState,
      viewType: type,
      flashMessage: type !== MESSAGE ? null : prevState.flashMessage,
    }));
  };

  const value = {
    includeTitle: state.viewType === BOOKMARK,
    viewType: state.viewType,
    isSending: state.isSending,
    flashMessage: state.flashMessage,
    setViewType,
    send: () => {}, // TODO
    sendLike: () => {}, // TODO
    sendRepost: () => {}, // TODO
    addQuickReply: () => {}, // TODO
  };

  return <App.Provider value={value}>{children}</App.Provider>;
}

export default App;
export { AppProvider };
