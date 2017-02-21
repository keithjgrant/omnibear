import { h, Component } from 'preact';
import {clone} from '../utils';


export default class FormInputs extends Component {
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label for="input-content">Content</label>
          <textarea
            id="input-content"
            value={this.props.entry.content}
            onChange={this.updateField('content')}
            rows="4"
            disabled={this.props.isDisabled}
          />
        </div>
        <div>
          <label for="input-tags">Tags</label>
          <input
            id="input-tags"
            type="text"
            placeholder="e.g. web, personal"
            value={this.props.entry.tags.join(' ')}
            onChange={this.updateFieldArray('tags')}
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
            onChange={this.updateField('mp-slug')}
            disabled={this.props.isDisabled}
          />
        </div>
        <button
          type="submit"
          disabled={this.props.isDisabled}
        >Post</button>
      </form>
    );
  }

  updateField(fieldName) {
    return (e) => {
      e.preventDefault();
      var entry = clone(this.props.entry);
      entry[fieldName] = e.target.value;
      this.props.updateEntry(entry);
    }
  }

  updateFieldArray(fieldName) {
    return (e) => {
      e.preventDefault();
      var entry = clone(this.props.entry);
      entry[fieldName] = e.target.value.trim().split(' ');
      this.props.updateEntry(entry);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.entry);
  }
}
