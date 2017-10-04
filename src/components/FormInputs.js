import {h, Component} from 'preact';
import {clone} from '../util/utils';

export default class FormInputs extends Component {
  componentDidMount() {
    setTimeout(this.focus, 150);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label for="input-content">Content</label>
          <textarea
            id="input-content"
            value={this.props.entry.content}
            onInput={this.updateField('content')}
            onBlur={this.updateField('content')}
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
            name="slug"
            value={this.props.entry['slug']}
            onChange={this.updateField('slug')}
            disabled={this.props.isDisabled}
          />
        </div>
        <button
          type="submit"
          disabled={this.props.isDisabled || !this.props.entry.content}
          className={this.props.isLoading ? 'is-loading' : ''}
        >
          Post
        </button>
      </form>
    );
  }

  focus = () => {
    this.content.focus();
  };

  updateField(fieldName) {
    return e => {
      // e.preventDefault();
      var entry = clone(this.props.entry);
      entry[fieldName] = e.target.value;
      this.props.updateEntry(entry);
    };
  }

  updateFieldArray(fieldName) {
    return e => {
      e.preventDefault();
      var entry = clone(this.props.entry);
      entry[fieldName] = e.target.value.trim().split(' ');
      this.props.updateEntry(entry);
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.props.entry);
  };
}
