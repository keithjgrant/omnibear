import { h, Component } from 'preact';
import LoginForm from './loginForm';
// import NoteForm from './NoteForm';

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
        break;
      default:
        return <NoteForm />
        break;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
