import {h, Component} from 'preact';
import LoginForm from './LoginForm';
import ChangeViewTabs from './ChangeViewTabs';
import NoteForm from './form/NoteForm';
import Logs from './log/Logs';
import Message from './Message';
import SettingsForm from './settings/SettingsForm';
import Header from './Header';
import Footer from './Footer';
import {logout, getPageUrl} from '../util/utils';
import {getSettings} from '../util/settings';
import {NOTE, SETTINGS, LOGS, LOGIN} from '../constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    const settings = getSettings();
    this.state = {
      pageUrl: '',
      userDomain: localStorage.getItem('domain'),
      settings: settings,
      url: '',
    };
    this.setDefaultView();
  }

  render() {
    const {currentView, userDomain} = this.state;
    if (currentView === LOGIN) {
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
          <ChangeViewTabs postType={currentView} onChange={this.changeView} />
        </nav>
        <Header postType={currentView} url={pageUrl} setUrl={this.setUrl} />
        <main className="l-main__main">
          <NoteForm
            postType={currentView}
            handleLogout={this.handleLogout}
            handleSettings={this.handleSettings}
            handleLogs={this.handleLogs}
            userFeedback={this.displayMessage}
            pageUrl={this.state.pageUrl}
          />
        </main>
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
    // switch (this.state.currentView) {
    //   case 'login':
    //   case 'feedback':
    //     return (
    //       <Message location={this.state.postLocation}>
    //         {this.state.message}
    //       </Message>
    //     );
    //   case 'settings':
    //     return <SettingsForm onClose={this.setDefaultView} />;
    //   case 'logs':
    //     return <Logs onClose={this.setDefaultView} />;
    //   default:
    //     return (
    //       <NoteForm
    //         handleLogout={this.handleLogout}
    //         handleSettings={this.handleSettings}
    //         handleLogs={this.handleLogs}
    //         userFeedback={this.displayMessage}
    //         pageUrl={this.state.pageUrl}
    //       />
    //     );
    // }
  }

  setDefaultView = () => {
    if (this.isAuthenticated()) {
      this.setState({
        currentView: NOTE,
      });
      this.getPageUrl();
    } else {
      this.setState({
        currentView: LOGIN,
      });
    }
  };

  changeView = postType => {
    console.log('change to ', postType);
    this.setState({currentView: postType});
  };

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
