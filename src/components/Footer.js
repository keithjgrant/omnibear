import {h, Component} from 'preact';
import {inject} from 'mobx-preact';
import {openLink} from '../util/utils';

@inject('store', 'auth')
export default class Footer extends Component {
  render() {
    const {store, auth} = this.props;
    return (
      <footer className="l-main__footer footer">
        {auth.isLoggedIn()
          ? [
              <div key="message" className="footer__message">
                Authenticated to <strong>{auth.domain}</strong>
              </div>,
              <a
                key="help"
                href="https://omnibear.com/help"
                className="footer__right"
                onClick={openLink}
              >
                Help
              </a>,
              <button
                key="logout"
                className="button-link"
                type="button"
                onClick={store.logout}
              >
                Logout
              </button>,
            ]
          : [
              <div key="message" className="footer__message">
                Not authenticated
              </div>,
            ]}
      </footer>
    );
  }
}
