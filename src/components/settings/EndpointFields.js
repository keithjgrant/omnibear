import {h, Component} from 'preact';

export default class EndpointFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
    };
  }

  render() {
    const {slug, syndicateTo} = this.props;
    return (
      <fieldset>
        <legend>Customize endpoint fields</legend>
        <div class="settings-form__description">
          If your micropub server expects custom or legacy fieldnames, you can
          specify those here
        </div>

        {this.state.showFields ? (
          [
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
                should be <code>mp-slug</code> for up-to-date endpoints.
              </div>
            </div>,
            <div>
              <label htmlFor="syndicate-to">Syndicate To</label>
              <input
                id="syndicate-to"
                type="text"
                value={syndicateTo}
                onChange={this.update('syndicateTo')}
              />
              <div class="settings-form__description">
                Choose the name of the field that the syndicate-to UIDs will be
                sent in. This should be <code>mp-syndicate-to</code> for
                up-to-date endpoints.
              </div>
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
