import {h, Component} from 'preact';

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
      <li className={this.getClass()}>
        <time>{log.timestamp}</time>
        <div>{log.message}</div>
      </li>
    );
  }

  getClass() {
    return `logs__${this.props.log.type} ${
      this.state.isExpanded ? 'is-expanded' : ''
    }`;
  }
}
