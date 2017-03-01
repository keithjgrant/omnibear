import { h, Component } from 'preact';
import LinkButton from './LinkButton';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY} from '../constants';


export default class ChangeViewButtons extends Component {
  render() {
    const postType = this.props.postType;
    return (
      <div className="inline-links">
        {this.renderNewNote()}
        {this.renderPageReply()}
        {this.renderItemReply()}
      </div>
    );
  }

  renderNewNote() {
    if (this.props.postType === NEW_NOTE) {
      return (<span>New note</span>);
    } else {
      return (
        <LinkButton onClick={this.switchTo(NEW_NOTE)}>New note</LinkButton>
      );
    }
  }

  renderPageReply() {
    if (this.props.postType === PAGE_REPLY) {
      return (<span>Current page</span>);
    } else {
      return (
        <LinkButton onClick={this.switchTo(PAGE_REPLY)}>Current page</LinkButton>
      );
    }
  }

  renderItemReply() {
    if (!this.props.hasSelectedEntry) {
      return (<span className="disabled">Selected entry</span>);
    } else if (this.props.postType === ITEM_REPLY) {
      return (<span>Selected entry</span>);
    } else {
      return (
        <LinkButton onClick={this.switchTo(ITEM_REPLY)}>Selected entry</LinkButton>
      );
    }
  }

  switchTo(postType) {
    return () => {
      this.props.onChange(postType);
    }
  }
}
