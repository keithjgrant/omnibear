import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import UrlSelector from './form/UrlSelector';
import {
  NOTE,
  REPLY,
  BOOKMARK,
  LIKE,
  REPOST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';

@inject('store')
@observer
export default class Header extends Component {
  render() {
    return (
      <header className="l-main__header">
        {this.showUrlSelector() ? <UrlSelector /> : null}
      </header>
    );
  }

  showUrlSelector() {
    const {store} = this.props;
    return [REPLY, BOOKMARK, LIKE, REPOST].includes(store.viewType);
  }
}
