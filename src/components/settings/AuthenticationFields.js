import {h, Component} from 'preact';

export default class AuthenticationFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }

  render() {
    return (
      <fieldset>
        <legend>Authentication details (advanced)</legend>
        <div class="settings-form__description">
          These values are set automatically upon logging in. Only edit them if
          you are having trouble authenticating and wish to do so manually.
        </div>

        {this.state.showFields ? (
          [
            <div>
              <label htmlFor="me">Me (domain name)</label>
              <input
                id="me"
                type="text"
                value={this.props.me}
                onChange={this.update('me')}
                placeholder="https://example.com"
              />
            </div>,
            <div>
              <label htmlFor="mp-endpoint">Micropub endpoint</label>
              <input
                id="mp-endpoint"
                type="text"
                value={this.props.micropubEndpoint}
                onChange={this.update('micropubEndpoint')}
                placeholder="https://example.com/micropub"
              />
            </div>,
            <div>
              <label htmlFor="token">Token</label>
              <input
                id="token"
                type="text"
                value={this.props.token}
                onChange={this.update('token')}
              />
            </div>,
          ]
        ) : (
          <div class="text-right">
            <button type="button" onClick={this.showAuthenticationDetails}>
              Show
            </button>
          </div>
        )}
      </fieldset>
    );
  }

  update(fieldName) {
    return e => {
      this.props.onChange(fieldName)(e.target.value);
    };
  }

  showAuthenticationDetails = () => {
    this.setState({
      showFields: true,
    });
  };
}
