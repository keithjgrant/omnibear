import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import LoginForm from './LoginForm';
import NoteForm from './form/NoteForm';
import LikeForm from './form/LikeForm';
import SettingsForm from './settings/SettingsForm';
import Message from './Message';
import Logs from './log/Logs';
import {
  LOGIN,
  NOTE,
  REPLY,
  BOOKMARK,
  LIKE,
  REPOST,
  LOGS,
  SETTINGS,
  MESSAGE,
} from '../constants';

@inject('store')
@observer
export default class MainPane extends Component {
  render() {
    const {store} = this.props;
    switch (store.viewType) {
      case LOGIN:
        return <LoginForm />;
      case SETTINGS:
        return <SettingsForm onClose={this.closeSettings} />;
      case LOGS:
        return <Logs />;
      case LIKE:
        return <LikeForm />;
      // case REPOST:
      //   return <RepostForm />;
      case MESSAGE:
        return (
          <div className="l-main__full">
            <div className="container container--full">
              <Message message={store.flashMessage} />
            </div>
          </div>
        );
      default:
        return <NoteForm />;
    }
  }

  closeSettings = () => {
    this.props.store.setViewType(NOTE);
  };
}
