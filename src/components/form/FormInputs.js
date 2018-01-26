import {h, Component} from 'preact';
import SyndicateInputs from './SyndicateInputs';
import {saveDraft} from '../../util/draft';
import {clone} from '../../util/utils';
import {generateSlug} from '../../util/utils';
import {NEW_NOTE} from '../../constants';

export default class FormInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSlugEdited: false,
    };
  }

  componentDidMount() {
    setTimeout(this.focus, 150);
  }

  componentDidUpdate() {
    saveDraft(this.props.entry);
  }

  render() {
    const {
      postType,
      entry,
      syndicateOptions,
      isDisabled,
      isLoading,
    } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label for="input-content">
            {postType === NEW_NOTE ? 'Content' : 'Reply'}
          </label>
          <textarea
            id="input-content"
            value={entry.content}
            onInput={this.updateContent}
            onBlur={this.updateContent}
            rows="4"
            disabled={isDisabled}
            ref={el => {
              this.content = el;
            }}
          />
          <div class="input-extra">{entry.content.length}</div>
        </div>
        <div>
          <label for="input-category">Tags (space separated)</label>
          <input
            id="input-category"
            type="text"
            placeholder="e.g. web  personal"
            value={entry.category.join(' ')}
            onChange={this.updateFieldArray('category')}
            disabled={isDisabled}
          />
        </div>
        <div>
          <label for="input-slug">Slug</label>
          <input
            id="input-slug"
            type="text"
            name="mp-slug"
            value={entry['mp-slug']}
            onInput={this.updateSlug}
            disabled={isDisabled}
          />
        </div>
        <SyndicateInputs
          options={syndicateOptions}
          selected={entry['mp-syndicate-to']}
          onUpdate={this.updateSyndicateTo}
          isDisabled={isDisabled}
        />
        <button
          type="submit"
          disabled={isDisabled || !entry.content}
          className={isLoading ? 'button is-loading' : 'button'}
        >
          Post
        </button>
      </form>
    );
  }

  focus = () => {
    this.content.focus();
  };

  updateSlug = e => {
    const slug = e.target.value.trim();
    const entry = clone(this.props.entry);
    entry['mp-slug'] = slug;
    this.props.updateEntry(entry);
    this.setState({
      isSlugEdited: slug !== '',
    });
  };

  updateContent = e => {
    const content = e.target.value;
    const entry = clone(this.props.entry);
    entry.content = content;
    if (this.shouldAutoSlug()) {
      entry['mp-slug'] = generateSlug(content);
    }
    this.props.updateEntry(entry);
  };

  updateFieldArray(fieldName) {
    return e => {
      e.preventDefault();
      var entry = clone(this.props.entry);
      entry[fieldName] = e.target.value.trim().split(' ');
      this.props.updateEntry(entry);
    };
  }

  updateSyndicateTo = values => {
    const entry = clone(this.props.entry);
    entry['mp-syndicate-to'] = values;
    this.props.updateEntry(entry);
  };

  shouldAutoSlug() {
    if (this.state.isSlugEdited) {
      return false;
    }
    if (this.props.settings && this.props.settings.autoSlug) {
      return true;
    }
    return false;
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.props.entry);
  };
}
