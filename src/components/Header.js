import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import UrlSelector from './form/UrlSelector';
import {NOTE, REPLY, BOOKMARK, LIKE, REPOST} from '../constants';

const headerViews = [NOTE, REPLY, BOOKMARK, LIKE, REPOST];

@inject('store')
@observer
export default class Header extends Component {
  render() {
    const {store} = this.props;
    if (!headerViews.includes(store.viewType)) {
      return null;
    }
    return (
      <header className="main-header">
        {store.viewType === NOTE ? (
          <h2 className="header-title">New note</h2>
        ) : null}
        {this.showUrlSelector() ? <UrlSelector /> : null}
      </header>
    );
  }

  showUrlSelector() {
    const {store} = this.props;
    return [REPLY, BOOKMARK, LIKE, REPOST].includes(store.viewType);
  }
}
