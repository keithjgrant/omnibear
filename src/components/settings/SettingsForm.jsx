import { useContext } from 'preact/hooks';
import Settings from '../../contexts/Settings';
import EmojiSettings from './EmojiSettings';
import EndpointFields from './EndpointFields';
import AuthenticationFields from './AuthenticationFields';

export default function SettingsForm() {
  const settings = useContext(Settings);

  const updateBoolean = (fn) => {
    return (event) => {
      fn(event.target.checked);
    };
  };

  return (
    <div className="container container--full">
      <h1 className="section-heading">Settings</h1>
      <form className="settings-form">
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={settings.defaultToCurrentPage}
              onChange={updateBoolean(settings.setDefaultToCurrentPage)}
            />
            Always open in “Reply” mode
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.autoSlug}
              onChange={updateBoolean(settings.setAutoSlug)}
            />
            Automatically generate slug from post content
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.closeAfterPosting}
              onChange={updateBoolean(settings.setCloseAfterPosting)}
            />
            Close Omnibear window after posting
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.debugLog}
              onChange={updateBoolean(settings.setDebugLog)}
            />
            Record debug logs
          </label>
        </div>

        <EmojiSettings />
        <EndpointFields />
        <AuthenticationFields />
      </form>
    </div>
  );
}
