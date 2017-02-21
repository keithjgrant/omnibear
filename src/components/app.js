import { h, Component } from 'preact';
import LoginForm from './loginForm';
import NoteForm from './NoteForm';
import Message from './Message';

export default class App extends Component {
  constructor(props) {
    super(props);
    if (this.isAuthenticated()) {
      this.setState({
        currentView: 'new-note'
      });
    } else {
      this.setState({
        currentView: 'login'
      });
    }
  }

  render() {
    switch (this.state.currentView) {
      case 'login':
        return <LoginForm />;
      case 'feedback':
        return <Message>{this.state.message}</Message>;
      default:
        return <NoteForm handleLogout={this.handleLogout} userFeedback={this.displayMessage}/>
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  displayMessage = (message) => {
    this.setState({
      currentView: 'feedback',
      message: message,
    });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({currentView: 'login'});
  }
}
