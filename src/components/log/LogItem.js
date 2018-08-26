import {h, Component} from 'preact';
import LogDetails from './LogDetails';

export default class LogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const {log} = this.props;
    return (
      <li>
        <button type="button" className={this.getClass()} onClick={this.toggle}>
          <time>{log.timestamp}</time>
          <div>{log.message}</div>
        </button>
        {this.state.isExpanded ? <LogDetails details={log.data} /> : null}
      </li>
    );
  }

  getClass() {
    return [
      'log',
      `log--${this.props.log.type}`,
      this.state.isExpanded ? 'is-expanded' : '',
      this.props.log.data ? 'has-data' : '',
    ].join(' ');
  }

  toggle = () => {
    if (this.props.log.data) {
      this.setState({
        isExpanded: !this.state.isExpanded,
      });
    }
  };
}
