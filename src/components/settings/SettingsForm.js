import {h, Component} from 'preact';
import ReacjiSettings from './ReacjiSettings';
import EndpointFields from './EndpointFields';
import AuthenticationFields from './AuthenticationFields';
import {DEFAULT_REACJI} from '../../constants';
import {
  getSettings,
  saveSettings,
  saveAuthenticationDetails,
} from '../../util/settings';

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    const settings = getSettings();
    settings.me = localStorage.getItem('domain');
    settings.micropubEndpoint = localStorage.getItem('micropubEndpoint');
    settings.token = localStorage.getItem('token');
    settings.showAuthenticationDetails = false;
    this.setState(settings);
  }

  render() {
    const {
      defaultToCurrentPage,
      autoSlug,
      closeAfterPosting,
      reacji,
      slug,
      syndicateTo,
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

            <label>
              <input
                type="checkbox"
                checked={closeAfterPosting}
                onChange={this.updateBoolean('closeAfterPosting')}
              />
              Close Omnibear window after posting
            </label>

            <ReacjiSettings reacji={reacji} onChange={this.set('reacji')} />
            <EndpointFields
              slug={slug}
              syndicateTo={syndicateTo}
              onChange={this.set}
            />
            <AuthenticationFields
              me={me}
              micropubEndpoint={micropubEndpoint}
              token={token}
              onChange={this.set}
            />

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

  update(fieldName) {
    return e => {
      this.set(fieldName)(e.target.value);
    };
  }

  set = fieldName => {
    return value => {
      this.setState({
        [fieldName]: value,
      });
    };
  };

  updateBoolean(fieldName) {
    return e => {
      this.setState({
        [fieldName]: e.target.checked,
      });
    };
  }

  save = e => {
    e.preventDefault();
    const {me, token, micropubEndpoint} = this.state;
    saveSettings(this.state);
    saveAuthenticationDetails(me, token, micropubEndpoint);
    this.props.onClose();
  };
}
