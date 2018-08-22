import {h, Component} from 'preact';
import Tab from '../Tab';
import {NOTE, REPLY, BOOKMARK, REPOST, LIKE} from '../../constants';

const UNICODE_NBSP = '\u00a0';

export default class ChangeViewTabs extends Component {
  render() {
    const {postType} = this.props;
    return (
      <div className="tabs">
        {this.renderTab(NOTE, `New${UNICODE_NBSP}note`)}
        {this.renderTab(REPLY, 'Reply')}
        {this.renderTab(BOOKMARK, 'Bookmark')}
        {this.renderTab(REPOST, 'Repost')}
        {this.renderTab(LIKE, 'Like')}
      </div>
    );
  }

  renderTab(postType, label) {
    return (
      <Tab
        isActive={this.props.postType === postType}
        onClick={this.switchTo(postType)}
      >
        {label}
      </Tab>
    );
  }

  switchTo(postType) {
    return () => {
      this.props.onChange(postType);
    };
  }
}
