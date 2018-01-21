import { h, Component } from 'preact';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__message">
          Authenticated to <strong>{this.props.domain}</strong>
        </div>
        <button
          className="button-link"
          type="button"
          onClick={this.props.onSettings}
        >
            Settings
        </button>
        <button
          className="button-link"
          type="button"
          onClick={this.props.onLogout}
        >
          Logout
        </button>
      </footer>
    );
  }
}
