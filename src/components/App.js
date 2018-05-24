import {h, Component} from 'preact';
import LoginForm from './LoginForm';
import NoteForm from './form/NoteForm';
import Logs from './log/Logs';
import Message from './Message';
import SettingsForm from './settings/SettingsForm';
import {logout, getPageUrl} from '../util/utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageUrl: '',
    };
    this.setDefaultView();
  }

  render() {
    switch (this.state.currentView) {
      case 'login':
        return (
          <LoginForm
            handleSettings={this.handleSettings}
            handleLogs={this.handleLogs}
          />
        );
      case 'feedback':
        return (
          <Message location={this.state.postLocation}>
            {this.state.message}
          </Message>
        );
      case 'settings':
        return <SettingsForm onClose={this.setDefaultView} />;
      case 'logs':
        return <Logs onClose={this.setDefaultView} />;
      default:
        return (
          <NoteForm
            handleLogout={this.handleLogout}
            handleSettings={this.handleSettings}
            handleLogs={this.handleLogs}
            userFeedback={this.displayMessage}
            pageUrl={this.state.pageUrl}
          />
        );
    }
  }

  setDefaultView = () => {
    if (this.isAuthenticated()) {
      this.setState({
        currentView: 'new-note',
      });
      this.getPageUrl();
    } else {
      this.setState({
        currentView: 'login',
      });
    }
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
    this.setState({currentView: 'settings'});
  };

  handleLogs = () => {
    this.setState({currentView: 'logs'});
  };

  handleLogout = () => {
    logout();
    this.setState({currentView: 'login'});
  };
}
