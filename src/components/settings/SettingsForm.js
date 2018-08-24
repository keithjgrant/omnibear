import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import ReacjiSettings from './ReacjiSettings';
import EndpointFields from './EndpointFields';
import AuthenticationFields from './AuthenticationFields';
import {clearLogs} from '../../util/log';

@inject('settingsStore')
@observer
export default class SettingsForm extends Component {
  render() {
    const {settingsStore: settings} = this.props;
    return (
      <div className="l-main__full">
        <div className="container container--full">
          <h1 className="section-heading">Settings</h1>
          <form className="settings-form" onSubmit={this.save}>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.defaultToCurrentPage}
                  onChange={this.updateBoolean(
                    settings.setDefaultToCurrentPage
                  )}
                />
                Always open in “Reply” mode
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={settings.autoSlug}
                  onChange={this.updateBoolean(settings.setAutoSlug)}
                />
                Automatically generate slug from post content
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={settings.closeAfterPosting}
                  onChange={this.updateBoolean(settings.setCloseAfterPosting)}
                />
                Close Omnibear window after posting
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={settings.debugLog}
                  onChange={this.updateBoolean(settings.setDebugLog)}
                />
                Record debug logs
              </label>
            </div>

            <ReacjiSettings
              reacji={settings.reacji}
              onChange={settings.setReacji}
            />
            <EndpointFields />
            <AuthenticationFields />

            {/* <div className="form-buttons">
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
            </div> */}
          </form>
        </div>
      </div>
    );
  }

  updateBoolean(fn) {
    return event => {
      fn(event.target.checked);
    };
  }

  // save = e => {
  //   e.preventDefault();
  //   const {settingsStore: settings} = this.props;
  //   settings.save();
  //   if (!settings.debugLog) {
  //     clearLogs();
  //   }
  //   this.props.onClose();
  // };
}
