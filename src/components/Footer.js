import {h, Component} from 'preact';
import {inject} from 'mobx-preact';

@inject('store', 'auth')
export default class Footer extends Component {
  render() {
    const {store, auth} = this.props;
    return (
      <footer className="l-main__footer footer">
        {auth.isLoggedIn() ? (
          [
            <div key="message" className="footer__message">
              Authenticated to <strong>{auth.domain}</strong>
            </div>,
            <button
              key="logout"
              className="button-link"
              type="button"
              onClick={store.logout}
            >
              Logout
            </button>,
          ]
        ) : (
          <div key="message" className="footer__message">
            Not authenticated
          </div>
        )}
      </footer>
    );
  }
}
