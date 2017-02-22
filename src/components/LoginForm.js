import { h, Component } from 'preact';
import Message from './Message';
import { openLink } from '../util/utils';
import { fetchSiteMetadata } from '../util/parseSite'

export default class LoginForm extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.input.focus();
    }, 150);
  }

  render() {
    return (
      <form class="container" method="GET" onSubmit={this.handleSubmit}>
        <p>To use Omnibear, sign in with your domain. Your website will need to
        support{' '}
        <a href="http://indieweb.org/micropub" onClick={openLink}>Micropub</a>
        {' '}for creating new posts.</p>

        <div class="fields-inline">
          <input
            type="text"
            name="me"
            placeholder="https://example.com"
            className="fields-inline__fill"
            value={this.state.domain}
            onKeyUp={this.handleChange}
            ref={(el) => this.input = el}
          />
          <button type="submit" disabled={this.state.isLoading}>
            Sign in
          </button>
        </div>

        { this.state.hasErrors ? <Message type="error">{this.state.errorMessage || 'Error'}</Message> : null }
      </form>
    );
  }

  handleChange = (e) => {
    this.setState({
      domain: e.target.value,
      hasErrors: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isLoading: true});
    fetchSiteMetadata(this.state.domain)
    .then((data) => {
      if (!data.authEndpoint || !data.tokenEndpoint || !data.micropub) {
        return this.setState({
          hasErrors: true,
          errorMessage: `Missing micropub data on ${this.state.domain}. Please ensure the following links are present: authorization_endpoint, token_endpoint, micropub`,
          isLoading: false,
        });
      }
      const url = `${data.authEndpoint}?${this.getFields(this.state.domain)}`
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: {
          authUrl: url,
          domain: this.state.domain,
          metadata: data,
        }
      });
    }).catch((err) => {
      this.setState({
        hasErrors: true,
        errorMessage: `Error fetching page: ${this.state.domain}`,
        isLoading: false,
      });
    });
  }

  getFields(domain) {
    return ([
      'redirect_uri=http://omnibear.com/auth/success/',
      'client_id=http://omnibear.com',
      'response_type=code',
      'scope=create',
      `me=${domain}`
    ]).join('&');
  }
}
