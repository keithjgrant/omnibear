import {h, Component} from 'preact';
import {clone} from '../util/utils';
import {generateSlug} from '../util/utils';
import {NEW_NOTE} from '../constants';

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

  render() {
    const {postType} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label for="input-content">
            {postType === NEW_NOTE ? 'Content' : 'Reply'}
          </label>
          <textarea
            id="input-content"
            value={this.props.entry.content}
            onInput={this.updateContent}
            onBlur={this.updateContent}
            rows="4"
            disabled={this.props.isDisabled}
            ref={el => {
              this.content = el;
            }}
          />
          <div class="input-extra">{this.props.entry.content.length}</div>
        </div>
        <div>
          <label for="input-category">Tags (space separated)</label>
          <input
            id="input-category"
            type="text"
            placeholder="e.g. web  personal"
            value={this.props.entry.category.join(' ')}
            onChange={this.updateFieldArray('category')}
            disabled={this.props.isDisabled}
          />
        </div>
        <div>
          <label for="input-slug">Slug</label>
          <input
            id="input-slug"
            type="text"
            name="mp-slug"
            value={this.props.entry['mp-slug']}
            onInput={this.updateSlug}
            disabled={this.props.isDisabled}
          />
        </div>
        <button
          type="submit"
          disabled={this.props.isDisabled || !this.props.entry.content}
          className={this.props.isLoading ? 'button is-loading' : 'button'}
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
    var entry = clone(this.props.entry);
    entry['mp-slug'] = slug;
    console.log(slug);
    this.props.updateEntry(entry);
    this.setState({
      isSlugEdited: slug !== '',
    });
  };

  updateContent = e => {
    const content = e.target.value;
    var entry = clone(this.props.entry);
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
