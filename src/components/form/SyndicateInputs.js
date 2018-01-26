import {h, Component} from 'preact';

export default class SyndicateInputs extends Component {
  render() {
    const {options} = this.props;
    if (!options || !options.length) {
      return null;
    }
    return (
      <div>
        <div class="label">Syndicate to</div>
        {options.map(this.renderOption)}
      </div>
    );
  }

  renderOption = option => {
    const {selected, isDisabled} = this.props;
    const isChecked = selected ? selected.indexOf(option.uid) > -1 : false;
    return (
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onClick={this.toggleOption(option.uid)}
        />
        {option.name}
      </label>
    );
  };

  toggleOption(uid) {
    return e => {
      const selected = this.props.selected || [];
      if (e.target.checked) {
        selected.push(uid);
        this.props.onUpdate(selected);
      } else {
        const index = selected.indexOf(uid);
        selected.splice(index, 1);
        this.props.onUpdate(selected);
      }
    };
  }
}
