import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';

@inject('settings')
@observer
export default class EndpointFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }

  render() {
    const {settings} = this.props;
    const {showFields} = this.state;
    return (
      <fieldset>
        <legend>Customize endpoint fields</legend>
        <div className="settings-form__description">
          If your micropub server expects custom or legacy fieldnames, you can
          specify those here
        </div>

        {showFields
          ? [
              <div key="slug">
                <label htmlFor="slug">Slug</label>
                <input
                  id="slug"
                  type="text"
                  value={settings.slugFieldName}
                  onChange={this.update(settings.setSlugFieldName)}
                />
                <div className="settings-form__description">
                  Choose the name of the field that the slug will be sent in.
                  This should be <code>mp-slug</code> for up-to-date endpoints.
                </div>
              </div>,
              <div key="syndicate">
                <label htmlFor="syndicate-to">Syndicate To</label>
                <input
                  id="syndicate-to"
                  type="text"
                  value={settings.syndicateToFieldName}
                  onChange={this.update(settings.setSyndicateToFieldName)}
                />
                <div className="settings-form__description">
                  Choose the name of the field that the syndicate-to UIDs will
                  be sent in. This should be <code>mp-syndicate-to</code> for
                  up-to-date endpoints.
                </div>
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
    };
  }

  toggle = () => {
    this.setState({
      showFields: !this.state.showFields,
    });
  };
}
