import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import Tab from './Tab';
import {
  LOGIN,
  NOTE,
  REPLY,
  BOOKMARK,
  REPOST,
  LIKE,
  LOGS,
  SETTINGS,
} from '../constants';

const UNICODE_NBSP = '\u00a0';
const ICONS = {
  [LOGIN]: '/icons/login.svg',
  [NOTE]: '/icons/pen.svg',
  [REPLY]: '/icons/reply.svg',
  [BOOKMARK]: '/icons/bookmark.svg',
  [REPOST]: '/icons/refresh.svg',
  [LIKE]: '/icons/heart.svg',
  [LOGS]: '/icons/alert.svg',
  [SETTINGS]: '/icons/settings.svg',
  quick: '/icons/flash.svg',
};

@inject('store', 'auth', 'settings')
@observer
export default class ChangeViewTabs extends Component {
  render() {
    const {auth, settings} = this.props;
    return (
      <div className="side-nav">
        <img className="side-nav__logo" src="/icon.svg" alt="Omnibear Logo" />
        {auth.isLoggedIn()
          ? [
              this.renderTab(NOTE, `New note`),
              this.renderTab(REPLY, 'Reply'),
              this.renderTab(BOOKMARK, 'Bookmark'),
              this.renderTab(LIKE, 'Like'),
              this.renderTab(REPOST, 'Repost'),
              /* {this.renderTab('quick', 'Quick actions')} */
            ]
          : this.renderTab(LOGIN, 'Sign in')}
        {settings.debugLog ? this.renderTab(LOGS, 'Logs', true) : null}
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
        {label.replace(' ', UNICODE_NBSP)}
      </Tab>
    );
  }

  switchTo(type) {
    return () => {
      this.props.store.setViewType(type);
    };
  }
}
