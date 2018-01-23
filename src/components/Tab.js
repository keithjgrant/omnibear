import { h, Component } from 'preact';

export default class Tab extends Component {
  render() {
    return (
      <button
        className={this.getClass()}
        disabled={this.props.isDisabled}
        onClick={this.handleClick}
      >{this.props.children}</button>
    );
  }

  getClass() {
    if (this.props.isActive) {
      return 'tab is-active';
    } else {
      return 'tab';
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }
}
