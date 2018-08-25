import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';

@inject('auth')
@observer
export default class AuthenticationFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }

  render() {
    const {auth} = this.props;
    const {showFields} = this.state;
    return (
      <fieldset>
        <legend>Authentication details (advanced)</legend>
        <div className="settings-form__description">
          These values are set automatically upon logging in. Only edit them if
          you are having trouble authenticating and wish to do so manually.
        </div>

        {showFields
          ? [
              <div key="domain">
                <label htmlFor="domain">Me (domain name)</label>
                <input
                  id="domain"
                  type="text"
                  value={auth.domain}
                  onChange={this.update(auth.setDomain)}
                  placeholder="https://example.com"
                />
              </div>,
              <div key="endpoint">
                <label htmlFor="mp-endpoint">Micropub endpoint</label>
                <input
                  id="mp-endpoint"
                  type="text"
                  value={auth.micropubEndpoint}
                  onChange={this.update(auth.setMicropubEndpoint)}
                  placeholder="https://example.com/micropub"
                />
              </div>,
              <div key="token">
                <label htmlFor="token">Token</label>
                <input
                  id="token"
                  type="text"
                  value={auth.token}
                  onChange={this.update(auth.setToken)}
                />
              </div>,
            ]
          : null}
        <div className="text-right">
          <button type="button" onClick={this.toggle}>
            {showFields ? 'Hide' : 'Show'}
          </button>
        </div>
      </fieldset>
    );
  }

  update(fn) {
    return event => {
      fn(event.target.value);
      window.auth = this.props.auth;
    };
  }

  toggle = () => {
    this.setState({
      showFields: !this.state.showFields,
    });
  };
}
