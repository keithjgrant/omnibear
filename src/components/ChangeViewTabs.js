import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import Login from './svg/Login';
import Pen from './svg/Pen';
import Reply from './svg/Reply';
import Bookmark from './svg/Bookmark';
import Heart from './svg/Heart';
import Repost from './svg/Repost';
import Logs from './svg/Logs';
import Settings from './svg/Settings';
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
  [LOGIN]: Login,
  [NOTE]: Pen,
  [REPLY]: Reply,
  [BOOKMARK]: Bookmark,
  [LIKE]: Heart,
  [REPOST]: Repost,
  [LOGS]: Logs,
  [SETTINGS]: Settings,
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
            ]
          : this.renderTab(LOGIN, 'Sign in')}
        {settings.debugLog ? this.renderTab(LOGS, 'Logs', true) : null}
        {this.renderTab(SETTINGS, 'Settings', true)}
      </div>
    );
  }

  renderTab(postType, label, onBottom = false) {
    const {store} = this.props;
    const Icon = ICONS[postType];
    return (
      <Tab
        isActive={store.viewType === postType}
        onClick={this.switchTo(postType)}
        onBottom={onBottom}
      >
        <Icon />
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
