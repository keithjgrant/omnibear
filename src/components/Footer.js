import {h, Component} from 'preact';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        {this.props.domain ? (
          <div className="footer__message">
            Authenticated to <strong>{this.props.domain}</strong>
          </div>
        ) : null}
        {this.props.onSettings ? (
          <button
            className="button-link"
            type="button"
            onClick={this.props.onSettings}
          >
            Settings
          </button>
        ) : null}
        {this.props.onLogout ? (
          <button
            className="button-link"
            type="button"
            onClick={this.props.onLogout}
          >
            Logout
          </button>
        ) : null}
      </footer>
    );
  }
}
