import {h, Component} from 'preact';
import {observer, inject} from 'mobx-preact';
import Message from './Message';
import {openLink} from '../util/utils';
import {MESSAGE_ERROR, MESSAGE_INFO} from '../constants';

@inject('auth')
@observer
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.input.focus();
    }, 150);
  }

  render() {
    const {auth} = this.props;
    return (
      <div className="l-main__full">
        <form
          className="container container--full"
          method="GET"
          onSubmit={this.handleSubmit}
        >
          <p>
            To use Omnibear, sign in with your domain. Your website will need to
            support{' '}
            <a href="http://indieweb.org/micropub" onClick={openLink}>
              Micropub
            </a>{' '}
            for creating new posts.
          </p>

          <div className="fields-inline">
            <input
              type="text"
              name="me"
              placeholder="https://example.com"
              className="fields-inline__fill"
              value={this.state.domain}
              onInput={this.handleChange}
              disabled={auth.isLoading}
              ref={el => (this.input = el)}
            />
            <button
              type="submit"
              disabled={auth.isLoading}
              className={auth.isLoading ? 'button is-loading' : 'button'}
            >
              Sign in
            </button>
          </div>

          {auth.hasErrors ? (
            <Message
              message={{
                type: MESSAGE_ERROR,
                message: auth.errorMessage || 'Error',
              }}
            />
          ) : null}
          {auth.authorizationPageOpened ? (
            <Message
              message={{
                type: MESSAGE_INFO,
                message:
                  'Your authorization page has been opened in a new tab. You may close this window and complete your login there.',
              }}
            />
          ) : null}
        </form>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      domain: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const domain = this.getNormalizedDomain();
    this.setState({domain});
    await this.props.auth.login(domain);
  };

  getNormalizedDomain() {
    if (
      this.state.domain.startsWith('http://') ||
      this.state.domain.startsWith('https://')
    ) {
      return this.state.domain;
    } else {
      return `https://${this.state.domain}`;
    }
  }

  getFields(domain) {
    return [
      'redirect_uri=https://omnibear.com/auth/success/',
      'client_id=https://omnibear.com',
      'response_type=code',
      'scope=create',
      `me=${domain}`,
    ].join('&');
  }
}
