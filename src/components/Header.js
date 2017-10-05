import { h, Component } from 'preact';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY} from '../constants';


export default class NoteForm extends Component {
  render() {
    return (
      <header className={this.getClass()}>
        <div>
          {this.getMessage()}
          {
            this.props.url
            ? <div class="metadata">{this.props.url}</div>
            : null
          }
        </div>
        {this.renderQuickActions()}
        {this.renderReacji()}
      </header>
    );
  }

  getClass() {
    var classNames = {};
    classNames[NEW_NOTE] = 'header header--new';
    classNames[PAGE_REPLY] = 'header header--page';
    classNames[ITEM_REPLY] = 'header header--item';
    return classNames[this.props.postType];
  }

  getMessage() {
    var messages = {};
    messages[NEW_NOTE] = 'New Note';
    messages[PAGE_REPLY] = 'Reply to current page';
    messages[ITEM_REPLY] = 'Reply to selected entry';
    return messages[this.props.postType];
  }

  renderQuickActions() {
    if (!this.props.url) {
      return null;
    }

    return (
      <ul className="quick-actions">
        <li><button
          onClick={this.props.onRepost}
          disabled={this.props.isDisabled}
        >repost</button></li>
        <li><button
          onClick={this.props.onLike}
          disabled={this.props.isDisabled}
        >like</button></li>
      </ul>
    );
  }
    
  renderReacji() {
    if (!this.props.url) {
      return null;
    }

    const supportedEmoji = [0x1F44D, 0x1F44E, 0x1F389, 0x2764, 0x1F606, 0x1F62E, 0x1F622, 0x1F620];

    return (
      <ul className="reacji-actions">
        {supportedEmoji.map(emoji => (
          <li><button
            onClick={() => this.props.onReacji(String.fromCodePoint(emoji))}
            disabled={this.props.isDisabled}
          >{String.fromCodePoint(emoji)}</button></li>
        ))}
      </ul>
    );
  }
}
