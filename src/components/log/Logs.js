import {h, Component} from 'preact';
import LogItem from './LogItem';
import {getLogs, clearLogs} from '../../util/log';

export default class Logs extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {onClose} = this.props;
    const logs = getLogs();
    return (
      <div className="l-main__full">
        <div className="container container--full">
          <h1 className="section-heading">Logs</h1>
          {logs.length ? (
            <ul className="logs">{logs.map(log => <LogItem log={log} />)}</ul>
          ) : (
            <p className="metadata">No logs found</p>
          )}
          <p className="text-right">
            <button type="button" onClick={this.clearLogs}>
              Clear logs
            </button>
          </p>
        </div>
        <footer className="footer">
          <button className="button-link" type="button" onClick={onClose}>
            Close logs
          </button>
        </footer>
      </div>
    );
  }

  clearLogs = () => {
    clearLogs();
    this.forceUpdate();
  };
}
