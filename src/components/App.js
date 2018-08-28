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
  // constructor(props) {
  //   super(props);
  //   const settings = getSettings();
  //   this.state = {
  //     pageUrl: '',
  //     userDomain: localStorage.getItem('domain'),
  //     settings: settings,
  //   };
  //   // this.setDefaultView();
  // }

  render() {
    // const {store} = this.props;
    // const {userDomain} = this.state;
    return (
      <div className="l-main">
        <nav className="l-main__sidebar">
          <ChangeViewTabs />
        </nav>
        <Header />
        <MainPane />
        <Footer />
      </div>
    );
  }

  // getPageUrl() {
  //   getPageUrl().then(url => {
  //     this.setState({
  //       pageUrl: url,
  //     });
  //   });
  // }
  //
  // displayMessage = (message, status, location) => {
  //   this.setState({
  //     currentView: 'feedback',
  //     message: message,
  //     postLocation: typeof location === 'string' ? location : null,
  //   });
  // };
  //
  // handleSettings = () => {
  //   this.setState({currentView: SETTINGS});
  // };
  //
  // handleLogs = () => {
  //   this.setState({currentView: LOGS});
  // };
  //
  // handleLogout = () => {
  //   logout();
  //   this.setState({currentView: LOGIN});
  // };
}
