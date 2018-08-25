import {h, Component} from 'preact';
import {inject} from 'mobx-preact';

@inject('store')
export default class Footer extends Component {
  render() {
    const {store} = this.props;
    return (
      <footer className="l-main__footer footer">
        {this.props.domain ? (
          <div className="footer__message">
            Authenticated to <strong>{this.props.domain}</strong>
          </div>
        ) : (
          <div className="footer__message">Not authenticated</div>
        )}
        {this.props.onLogs ? (
          <button
            className="button-link"
            type="button"
            onClick={this.props.onLogs}
          >
            Logs
          </button>
        ) : null}
        {this.props.onLogout ? (
          <button className="button-link" type="button" onClick={store.logout}>
            Logout
          </button>
        ) : null}
      </footer>
    );
  }
}
