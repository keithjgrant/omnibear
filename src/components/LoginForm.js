import { h, Component } from 'preact';
import { openLink } from '../utils';
import { fetchSiteMetadata } from '../parseSite'

export default class LoginForm extends Component {
  render() {
    return (
      <form class="container" method="GET" onSubmit={this.handleSubmit}>
        <p>To use Omnibear, sign in with your domain. Your website will need to
        support
        <a href="http://indieweb.org/micropub" onClick={openLink}>Micropub</a>
        for creating new posts.</p>

        <div class="fields-inline">
          <input
            type="text"
            name="me"
            placeholder="https://example.com"
            className="fields-inline__fill"
            value={this.state.domain}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={this.state.isLoading}>
            Sign in
          </button>
        </div>
      </form>
    );
  }

  handleChange = (e) => {
    this.setState({
      domain: e.target.value,
    });
  }

  handleSubmit = (e) => {
    console.log('submitting');
    e.preventDefault();
    this.setState({isLoading: true});
    fetchSiteMetadata(this.state.domain)
    .then((data) => {
      if (!data.authEndpoint || !data.tokenEndpoint || !data.micropub) {
        return this.setState({hasErrors: true});
      }
      const url = `${data.authEndpoint}?${this.getFields(this.state.domain)}`
      console.log('opening ' + url);
      chrome.tabs.create({ url }, (tab) => {
        chrome.runtime.sendMessage({
          action: 'begin-auth',
          payload: {
            tabId: tab.id,
            domain: domain,
            data
          }
        });
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
