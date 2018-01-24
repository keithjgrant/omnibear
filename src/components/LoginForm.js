import {h, Component} from 'preact';
import Message from './Message';
import Footer from './Footer';
import {openLink} from '../util/utils';
import micropub from '../util/micropub';

export default class LoginForm extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.input.focus();
    }, 150);
  }

  render() {
    return (
      <div>
        <form class="container" method="GET" onSubmit={this.handleSubmit}>
          <p>
            To use Omnibear, sign in with your domain. Your website will need to
            support{' '}
            <a href="http://indieweb.org/micropub" onClick={openLink}>
              Micropub
            </a>{' '}
            for creating new posts.
          </p>

          <div class="fields-inline">
            <input
              type="text"
              name="me"
              placeholder="https://example.com"
              className="fields-inline__fill"
              value={this.state.domain}
              onInput={this.handleChange}
              disabled={this.state.isLoading}
              ref={el => (this.input = el)}
            />
            <button
              type="submit"
              disabled={this.state.isLoading}
              className={this.state.isLoading ? 'button is-loading' : 'button'}
            >
              Sign in
            </button>
          </div>

          {this.state.hasErrors ? (
            <Message type="error">{this.state.errorMessage || 'Error'}</Message>
          ) : null}
        </form>
        <Footer onSettings={this.props.handleSettings} />
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      domain: e.target.value,
      hasErrors: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const domain = this.getNormalizedDomain();
    this.setState({isLoading: true, domain});
    micropub.options.me = domain;
    micropub
      .getAuthUrl()
      .then(url => {
        chrome.runtime.sendMessage({
          action: 'begin-auth',
          payload: {
            authUrl: url,
            domain: this.state.domain,
            metadata: {
              authEndpoint: micropub.options.authEndpoint,
              tokenEndpoint: micropub.options.tokenEndpoint,
              micropub: micropub.options.micropubEndpoint,
            },
          },
        });
      })
      .catch(err => {
        console.log(err.message);
        return this.setState({
          hasErrors: true,
          errorMessage: `Missing micropub data on ${
            this.state.domain
          }. Please ensure the following links are present: authorization_endpoint, token_endpoint, micropub`,
          isLoading: false,
        });
      });
  };

  getNormalizedDomain() {
    if (
      this.state.domain.startsWith('http://') ||
      this.state.domain.startsWith('https://')
    ) {
      return this.state.domain;
    } else {
      return `http://${this.state.domain}`;
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
