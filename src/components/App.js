import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import LoginForm from './LoginForm';
import ChangeViewTabs from './ChangeViewTabs';
import NoteForm from './form/NoteForm';
import Logs from './log/Logs';
import Message from './Message';
import SettingsForm from './settings/SettingsForm';
import Header from './Header';
import MainPane from './MainPane';
import Footer from './Footer';
import {logout, getPageUrl} from '../util/utils';
import {getSettings} from '../util/settings';
import {NOTE, SETTINGS, LOGS, LOGIN} from '../constants';

@inject('store')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    const settings = getSettings();
    this.state = {
      pageUrl: '',
      userDomain: localStorage.getItem('domain'),
      settings: settings,
    };
    // this.setDefaultView();
  }

  render() {
    const {store} = this.props;
    const {userDomain} = this.state;
    const viewType = store.viewType;
    if (viewType === LOGIN) {
      return (
        <LoginForm
          handleSettings={this.handleSettings}
          handleLogs={this.handleLogs}
        />
      );
    }
    return (
      <div className="l-main">
        <nav className="l-main__sidebar">
          <ChangeViewTabs />
        </nav>
        <Header />
        <MainPane />
        <footer className="l-main__footer">
          <Footer
            domain={userDomain}
            onSettings={this.handleSettings}
            onLogs={this.state.settings.debugLog ? this.props.handleLogs : null}
            onLogout={this.handleLogout}
          />
        </footer>
      </div>
    );
  }

  // setDefaultView = () => {
  //   const {store} = this.props;
  //   if (this.isAuthenticated()) {
  //     store.setViewType(NOTE);
  //     this.getPageUrl();
  //   } else {
  //     store.setViewType(LOGIN);
  //   }
  // };

  isAuthenticated() {
    return (
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('micropubEndpoint')
    );
  }

  getPageUrl() {
    getPageUrl().then(url => {
      this.setState({
        pageUrl: url,
      });
    });
  }

  displayMessage = (message, status, location) => {
    this.setState({
      currentView: 'feedback',
      message: message,
      postLocation: typeof location === 'string' ? location : null,
    });
  };

  handleSettings = () => {
    this.setState({currentView: SETTINGS});
  };

  handleLogs = () => {
    this.setState({currentView: LOGS});
  };

  handleLogout = () => {
    logout();
    this.setState({currentView: LOGIN});
  };
}
