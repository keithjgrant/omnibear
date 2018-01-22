import {h, Component} from 'preact';
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';
import Message from './Message';
import SettingsForm from './settings/SettingsForm';
import {logout} from '../util/utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setDefaultView();
  }

  render() {
    switch (this.state.currentView) {
      case 'login':
        return <LoginForm handleSettings={this.handleSettings} />;
      case 'feedback':
        return (
          <Message location={this.state.postLocation}>
            {this.state.message}
          </Message>
        );
      case 'settings':
        return <SettingsForm onClose={this.setDefaultView} />;
      default:
        return (
          <NoteForm
            handleLogout={this.handleLogout}
            handleSettings={this.handleSettings}
            userFeedback={this.displayMessage}
          />
        );
    }
  }

  setDefaultView = () => {
    if (this.isAuthenticated()) {
      this.setState({
        currentView: 'new-note',
      });
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

  handleLogout = () => {
    logout();
    this.setState({currentView: 'login'});
  };
}
