import {h, Component} from 'preact';

export default class ReacjiSettings extends Component {
  constructor(props) {
    super(props);
    this.setState({
      value: '',
    });
  }

  render() {
    const {reacji} = this.props;
    return (
      <div>
        <label>Quick replies (“Reacji”)</label>
        <div className="reacji-row">{reacji.map(this.renderReacji)}</div>
        <div class="input-inline">
          <input type="text" value={this.state.value} onChange={this.update} />
          <button type="button" onClick={this.addReacji}>
            Add
          </button>
        </div>
      </div>
    );
  }

  renderReacji = (char, i) => {
    return (
      <div className="reacji-tag" key={char}>
        {char}
        <button type="button" onClick={this.deleteReacji(i)}>
          ×
        </button>
      </div>
    );
  };

  update = e => {
    this.setState({value: e.target.value});
  };

  deleteReacji(index) {
    return () => {
      const {reacji} = this.props;
      reacji.splice(index, 1);
      this.props.onChange(reacji);
    };
  }

  addReacji = () => {
    const {value} = this.state;
    const {reacji} = this.props;
    if (value && reacji.indexOf(value) === -1) {
      reacji.push(value);
      this.props.onChange(reacji);
      this.setState({value: ''});
    }
  };
}
