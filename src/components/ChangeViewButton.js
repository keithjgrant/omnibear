import { h, Component } from 'preact';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY} from '../constants';


export default class ChangeViewButton extends Component {
  render() {
    return (
      <button
        className="button-link button-small"
        onClick={this.handleClick}
      >{this.getText()}</button>
    );
  }

  getText() {
    const text = {};
    text[NEW_NOTE] = 'Reply to current page';
    text[PAGE_REPLY] = 'Create new note';
    text[ITEM_REPLY] = 'Reply to current page';
    return text[this.props.postType];
  }

  handleClick = (e) => {
    e.preventDefault();
    const switchTo = {};
    switchTo[NEW_NOTE] = PAGE_REPLY;
    switchTo[PAGE_REPLY] = NEW_NOTE;
    switchTo[ITEM_REPLY] = PAGE_REPLY;
    this.props.onChange(switchTo[this.props.postType]);
  }
}
