import {h, Component} from 'preact';
import {inject} from 'mobx-preact';
import NoteForm from './form/NoteForm';
import SettingsForm from './settings/SettingsForm';
import {NOTE, REPLY, BOOKMARK, LIKE, REPOST, SETTINGS} from '../constants';

@inject('store')
export default class MainPane extends Component {
  render() {
    const type = this.props.store.viewType;
    if (type === SETTINGS) {
      return <SettingsForm onClose={this.closeSettings} />;
    }
    return <NoteForm />;
  }

  closeSettings = () => {
    this.props.store.setViewType(NOTE);
  };
}
