import {h, Component} from 'preact';

export default class Tab extends Component {
  render() {
    return (
      <button
        className={this.getClass()}
        disabled={this.props.isDisabled}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }

  getClass() {
    let classes = 'tab';
    if (this.props.isActive) {
      classes += ' is-active';
    }
    if (this.props.onBottom) {
      classes += ' side-nav__bottom';
    }
    return classes;
  }

  handleClick = e => {
    e.preventDefault();
    this.props.onClick();
  };
}
