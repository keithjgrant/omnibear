import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import Tab from './Tab';
import {NOTE, REPLY, BOOKMARK, REPOST, LIKE, SETTINGS} from '../constants';

const UNICODE_NBSP = '\u00a0';
const ICONS = {
  [NOTE]: '/icons/pen.svg',
  [REPLY]: '/icons/reply.svg',
  [BOOKMARK]: '/icons/bookmark.svg',
  [REPOST]: '/icons/refresh.svg',
  [LIKE]: '/icons/heart.svg',
  [SETTINGS]: '/icons/settings.svg',
  quick: '/icons/flash.svg',
};

@inject('store')
@observer
export default class ChangeViewTabs extends Component {
  render() {
    return (
      <div className="side-nav">
        <img className="side-nav__logo" src="/icon.svg" alt="Omnibear Logo" />
        {this.renderTab(NOTE, `New${UNICODE_NBSP}note`)}
        {this.renderTab(REPLY, 'Reply')}
        {this.renderTab(BOOKMARK, 'Bookmark')}
        {this.renderTab(LIKE, 'Like')}
        {this.renderTab(REPOST, 'Repost')}
        {/* {this.renderTab('quick', 'Quick actions')} */}
        {this.renderTab(SETTINGS, 'Settings', true)}
      </div>
    );
  }

  renderTab(postType, label, onBottom = false) {
    const {store} = this.props;
    return (
      <Tab
        isActive={store.viewType === postType}
        onClick={this.switchTo(postType)}
        onBottom={onBottom}
      >
        <img src={ICONS[postType]} alt={label} />
        {label}
      </Tab>
    );
  }

  switchTo(type) {
    return () => {
      this.props.store.setViewType(type);
    };
  }
}
