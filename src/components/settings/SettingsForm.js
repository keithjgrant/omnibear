import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import EmojiSettings from './EmojiSettings';
import EndpointFields from './EndpointFields';
import AuthenticationFields from './AuthenticationFields';

@inject('settings')
@observer
export default class SettingsForm extends Component {
  render() {
    const {settings} = this.props;
    return (
      <div className="l-main__full">
        <div className="container container--full">
          <h1 className="section-heading">Settings</h1>
          <form className="settings-form">
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

            <EmojiSettings />
            <EndpointFields />
            <AuthenticationFields />
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
}
