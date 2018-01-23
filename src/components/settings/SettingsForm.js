import {h, Component} from 'preact';
import ReacjiSettings from './ReacjiSettings';
import {DEFAULT_REACJI} from '../../constants';

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    let settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
      settings = {
        defaultToCurrentPage: false,
        reacji: DEFAULT_REACJI,
        slug: 'mp-slug',
        autoSlug: false,
      };
    }
    settings.me = localStorage.getItem('domain');
    settings.micropubEndpoint = localStorage.getItem('micropubEndpoint');
    settings.token = localStorage.getItem('token');
    settings.showAuthenticationDetails = false;
    this.setState(settings);
  }

  render() {
    const {
      defaultToCurrentPage,
      reacji,
      slug,
      autoSlug,
      me,
      micropubEndpoint,
      token,
      showAuthenticationDetails,
    } = this.state;
    return (
      <div>
        <h1 class="section-heading">Settings</h1>
        <div class="container">
          <form class="settings-form" onSubmit={this.save}>
            <label>
              <input
                type="checkbox"
                checked={defaultToCurrentPage}
                onChange={this.updateBoolean('defaultToCurrentPage')}
              />
              Always open in “Reply to current page” mode
            </label>

            <label>
              <input
                type="checkbox"
                checked={autoSlug}
                onChange={this.updateBoolean('autoSlug')}
              />
              Automatically generate slug from post content
            </label>

            <ReacjiSettings reacji={reacji} onChange={this.set('reacji')} />

            <div>
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={this.update('slug')}
              />
              <div class="settings-form__description">
                Choose the name of the field that the slug will be sent in. This
                should be <code>mp-slug</code> unless your endpoint is using a
                custom property or the deprecated <code>slug</code> property.
              </div>
            </div>

            <fieldset>
              <legend>Authentication details (advanced)</legend>
              <div class="settings-form__description">
                These values are set automatically upon logging in. Only edit
                them if you are having trouble authenticating and wish to do so
                manually.
              </div>

              {showAuthenticationDetails ? (
                [
                  <div>
                    <label htmlFor="me">Me (domain name)</label>
                    <input
                      id="me"
                      type="text"
                      value={me}
                      onChange={this.update('me')}
                      placeholder="https://example.com"
                    />
                  </div>,
                  <div>
                    <label htmlFor="mp-endpoint">Micropub endpoint</label>
                    <input
                      id="mp-endpoint"
                      type="text"
                      value={micropubEndpoint}
                      onChange={this.update('micropubEndpoint')}
                      placeholder="https://example.com/micropub"
                    />
                  </div>,
                  <div>
                    <label htmlFor="token">Token</label>
                    <input
                      id="token"
                      type="text"
                      value={token}
                      onChange={this.update('token')}
                    />
                  </div>,
                ]
              ) : (
                <div class="text-right">
                  <button
                    type="button"
                    onClick={this.showAuthenticationDetails}
                  >
                    Show
                  </button>
                </div>
              )}
            </fieldset>

            <div class="form-buttons">
              <button type="submit" className="button">
                Save
              </button>
              <button
                type="button"
                className="button-link"
                onClick={this.props.onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  showAuthenticationDetails = () => {
    this.setState({
      showAuthenticationDetails: true,
    });
  };

  update(fieldName) {
    return e => {
      this.set(fieldName)(e.target.value);
    };
  }

  set(fieldName) {
    return value => {
      this.setState({
        [fieldName]: value,
      });
    };
  }

  updateBoolean(fieldName) {
    return e => {
      this.setState({
        [fieldName]: e.target.checked,
      });
    };
  }

  save = e => {
    e.preventDefault();
    const {
      defaultToCurrentPage,
      reacji,
      slug,
      autoSlug,
      me,
      token,
      micropubEndpoint,
    } = this.state;
    localStorage.setItem(
      'settings',
      JSON.stringify({
        defaultToCurrentPage,
        reacji,
        slug,
        autoSlug,
      })
    );
    if (me) {
      localStorage.setItem('domain', me);
    }
    if (token) {
      localStorage.setItem('token', token);
    }
    if (micropubEndpoint) {
      localStorage.setItem('micropubEndpoint', micropubEndpoint);
    }
    this.props.onClose();
  };
}
