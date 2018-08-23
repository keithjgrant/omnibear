import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import QuickReplies from './QuickReplies';
import SyndicateInputs from './SyndicateInputs';
import {clone} from '../../util/utils';
import {NOTE, REPLY, BOOKMARK, LIKE, REPOST} from '../../constants';

/*
Props:
postType,
entry,
syndicateOptions,
isDisabled,
isLoading,
updateEntry: (entry) => void,
onSubmit: (entry) => void,
*/

@inject('store', 'draftStore')
export default class FormInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSlugModified: false,
    };
  }

  componentDidMount() {
    setTimeout(this.focus, 150);
  }

  componentDidUpdate() {
    this.props.draftStore.save();
  }

  render() {
    const {
      postType,
      // entry,
      syndicateOptions,
      isDisabled,
      isLoading,
      entry = draftStore,
    } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        {postType === REPLY ? <QuickReplies /> : null}
        <div>
          <label for="input-content">Content</label>
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
          <label for="input-tags">Tags (space separated)</label>
          <input
            id="input-tags"
            type="text"
            placeholder="e.g. web  personal"
            value={entry.tags}
            onChange={this.updateTags}
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
    this.props.entryStore.setSlug(slug);
    this.setState({
      isSlugModified: slug !== '',
    });
  };

  updateContent = e => {
    const content = e.target.value;
    this.props.entryStore.setContent(content, this.shouldAutoSlug());
  };

  updateTags = e => {
    this.props.entryStore.setTags(e.target.value);
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
    if (this.state.isSlugModified) {
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
