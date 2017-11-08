import {h, Component} from 'preact';
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';
import Message from './Message';
import {logout} from '../util/utils';

export default class App extends Component {
  constructor(props) {
    super(props);
    if (this.isAuthenticated()) {
      this.setState({
        currentView: 'new-note',
      });
    } else {
      this.setState({
        currentView: 'login',
      });
    }
  }

  render() {
    switch (this.state.currentView) {
      case 'login':
        return <LoginForm />;
      case 'feedback':
        return <Message location={this.state.postLocation}>{this.state.message}</Message>;
      default:
        return (
          <NoteForm handleLogout={this.handleLogout} userFeedback={this.displayMessage} />
        );
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  displayMessage = (message, status, location) => {
    this.setState({
      currentView: 'feedback',
      message: message,
      postLocation: typeof location === 'string' ? location : null,
    });
  };

  handleLogout = () => {
    logout();
    this.setState({currentView: 'login'});
  };
}
