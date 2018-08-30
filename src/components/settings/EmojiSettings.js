import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';

@inject('settings')
@observer
export default class EmojiSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const {settings} = this.props;
    return (
      <div>
        <label>Quick emoji</label>
        <div className="reacji-row">
          {settings.reacji.map(this.renderReacji)}
        </div>
        <div className="input-inline">
          <input
            type="text"
            value={this.state.value}
            onChange={this.update}
            placeholder="Enter reaction emoji"
            maxLength="15"
          />
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
      const {settings} = this.props;
      const reacji = settings.reacji;
      const before = reacji.slice(0, index);
      const after = reacji.slice(index + 1);
      settings.setReacji(before.concat(after));
      settings.save();
    };
  }

  addReacji = () => {
    const {value} = this.state;
    const {settings} = this.props;
    if (value && settings.reacji.indexOf(value) === -1) {
      settings.addReacji(value);
      settings.save();
      this.setState({value: ''});
    }
  };
}
