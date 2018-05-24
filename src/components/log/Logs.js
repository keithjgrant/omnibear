import {h, Component} from 'preact';
import LogItem from './LogItem';
import {getLogs} from '../../util/log';

export default class Logs extends Component {
  render() {
    const {onClose} = this.props;
    const logs = getLogs();
    return (
      <div>
        <div class="container">
          <p>Logs</p>
          {logs.length ? (
            <ul className="logs">{logs.map(log => <LogItem log={log} />)}</ul>
          ) : (
            <p className="metadata">No logs found</p>
          )}
        </div>
        <footer className="footer">
          <button className="button-link" type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    );
  }
}
