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
        <li><button onClick={this.props.onRepost}>repost</button></li>
        <li><button onClick={this.props.onLike}>like</button></li>
      </ul>
    );
  }
}
