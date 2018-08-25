import {h, Component} from 'preact';
import {inject} from 'mobx-preact';
import LoginForm from './LoginForm';
import NoteForm from './form/NoteForm';
import LikeForm from './form/LikeForm';
import SettingsForm from './settings/SettingsForm';
import {
  LOGIN,
  NOTE,
  REPLY,
  BOOKMARK,
  LIKE,
  REPOST,
  SETTINGS,
} from '../constants';

@inject('store')
export default class MainPane extends Component {
  render() {
    switch (this.props.store.viewType) {
      case LOGIN:
        return <LoginForm />;
      case SETTINGS:
        return <SettingsForm onClose={this.closeSettings} />;
      case LIKE:
        return <LikeForm />;
      // case REPOST:
      //   return <RepostForm />;
      default:
        return <NoteForm />;
    }
  }

  closeSettings = () => {
    this.props.store.setViewType(NOTE);
  };
}
