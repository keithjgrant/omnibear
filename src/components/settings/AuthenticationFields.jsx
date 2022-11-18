import { useState, useContext } from 'preact/hooks';
import Auth from '../../contexts/Auth';

export default function AuthenticationFields() {
  cosnt[(showFields, setShowFields)] = useState(false);
  const auth = useContext(Auth);

  const update = (fn) => {
    return (event) => {
      fn(event.target.value);
      // window.auth = auth; // debugging remnant?
    };
  };

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
              <label htmlFor="token">OAuth Token</label>
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
        <button
          type="button"
          onClick={() => {
            setShowFields(!showFields);
          }}
        >
          {showFields ? 'Hide' : 'Show'}
        </button>
      </div>
    </fieldset>
  );
}
