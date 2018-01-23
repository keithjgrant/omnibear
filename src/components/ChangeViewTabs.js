import { h, Component } from 'preact';
import Tab from './Tab';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY} from '../constants';


export default class ChangeViewTabs extends Component {
  render() {
    const postType = this.props.postType;
    return (
      <div className="tabs">
        {this.renderNewNote()}
        {this.renderPageReply()}
        {this.renderItemReply()}
      </div>
    );
  }

  renderNewNote() {
    return (
      <Tab
        isActive={this.props.postType === NEW_NOTE}
        onClick={this.switchTo(NEW_NOTE)}
      >New note</Tab>
    );
  }

  renderPageReply() {
    return (
      <Tab
        isActive={this.props.postType === PAGE_REPLY}
        onClick={this.switchTo(PAGE_REPLY)}
      >Current page</Tab>
    );
  }

  renderItemReply() {
    return (
      <Tab
        isActive={this.props.postType === ITEM_REPLY}
        isDisabled={!this.props.hasSelectedEntry}
        onClick={this.switchTo(ITEM_REPLY)}>Selected entry</Tab>
    );
  }

  switchTo(postType) {
    return () => {
      this.props.onChange(postType);
    }
  }
}
