import {h, Component} from 'preact';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY, DEFAULT_REACJI} from '../constants';
import HeartSvg from './svg/HeartSvg';
import RepostSvg from './svg/RepostSvg';

export default class QuickActions extends Component {
  render() {
    if (this.props.postType === NEW_NOTE || !this.props.url) {
      return null;
    }
    return (
      <div>
        <div className="info-banner">{this.props.url}</div>
        <div className="container">
          <h2 className="minor-heading">Quick Actions</h2>
          {this.renderQuickActions()}
          {/* {this.renderReacji()} */}
        </div>
      </div>
    );
  }

  renderQuickActions() {
    const {settings} = this.props;
    let reacji;
    if (settings && settings.reacji) {
      reacji = settings.reacji;
    } else {
      reacji = DEFAULT_REACJI;
    }

    return (
      <ul className="quick-actions">
        <li>
          <button
            onClick={this.props.onRepost}
            disabled={this.props.isDisabled}
          >
            <RepostSvg /> repost
          </button>
        </li>
        <li>
          <button onClick={this.props.onLike} disabled={this.props.isDisabled}>
            <HeartSvg /> like
          </button>
        </li>
        {reacji.map(this.renderReacji)}
      </ul>
    );
  }

  renderReacji = (content, i) => {
    return (
      <li key={content}>
        <button
          onClick={() => this.props.onReacji(content)}
          disabled={this.props.isDisabled}
        >
          {content}
        </button>
      </li>
    );
  };
}
