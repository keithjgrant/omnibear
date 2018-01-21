import {h, Component} from 'preact';
import ReacjiSettings from './ReacjiSettings';

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      this.setState(settings);
    } else {
      this.setState({
        defaultToCurrentPage: false,
        reacji: [0x1F44D, 0x1F44E, 0x1F389, 0x2764, 0x1F606, 0x1F62E, 0x1F622, 0x1F620],
        slug: 'mp-slug',
        me: localStorage.getItem('domain'),
        micropubEndpoint: localStorage.getItem('micropubEndpoint'),
        token: localStorage.getItem('token')
      });
    }
  }

  render() {
    const {defaultToCurrentPage, reacji, slug, me, micropubEndpoint, token} = this.state;
    return (
      <div>
        <div class="header header--item">Settings</div>
        <div class="container">
          <form class="settings-form" onSubmit={this.save}>
            <div>
              <label htmlFor="slug">Slug</label>
              <input id="slug" type="text" value={slug} onChange={this.update('slug')}/>
              <div class="settings-form__description">
                Choose the name of the field that the slug will be sent in. This should be <code>mp-slug</code> unless your endpoint is using a custom property or the deprecated <code>slug</code> property.
              </div>
            </div>

            <label>
              <input type="checkbox" checked={defaultToCurrentPage} onChange={this.updateBoolean('defaultToCurrentPage')}/>
              Always open in “Reply to current page” mode
            </label>

            <ReacjiSettings onChange={this.update('reacji')}/>

            <div class="form-buttons">
              <button type="submit">Save</button>
              <button
                type="button"
                className="button-link"
                onClick={this.props.onClose}
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  update(fieldName) {
    return (e) => {
      this.setState({
        [fieldName]: e.target.value
      });
    }
  }

  updateBoolean(fieldName) {
    return (e) => {
      this.setState({
        [fieldName]: e.target.checked,
      })
    }
  }

  save = (e) => {
    e.preventDefault();
    console.log('saving')
    localStorage.setItem('settings', JSON.stringify(this.state));
    this.props.onClose();
  }
}
