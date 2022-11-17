export default function Tab({ isActive, isDisabled, onClick }) {
  const getClass = () => {
    let classes = '';
    if (this.props.isActive) {
      classes += ' is-active';
    }
    if (this.props.onBottom) {
      classes += ' side-nav__bottom';
    }
    return classes;
  };

  return (
    <button
      className={getClass()}
      disabled={this.props.isDisabled}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {this.props.children}
    </button>
  );
}
