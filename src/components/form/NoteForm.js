import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import QuickReplies from './QuickReplies';
import SyndicateInputs from './SyndicateInputs';
import Message from '../Message';

@inject('store', 'draft', 'settings')
@observer
export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      syndicateOptions: props.settings.getSyndicateOptions(),
    };
  }

  componentDidMount() {
    setTimeout(this.focus, 150);
  }

  componentDidUpdate() {
    this.props.draft.save();
  }

  render() {
    const {store, draft} = this.props;
    const {syndicateOptions} = this.state;
    const isLoading = store.isSending;
    return (
      <form className="container" onSubmit={this.onSubmit}>
        {store.includeTitle ? (
          <div>
            <label htmlFor="input-title">Title</label>
            <input
              id="input-title"
              type="text"
              name="title"
              value={draft.title}
              onInput={this.updateTitle}
              disabled={isLoading}
            />
          </div>
        ) : null}
        <div>
          <label htmlFor="input-content">Content</label>
          <textarea
            id="input-content"
            value={draft.content}
            onInput={this.updateContent}
            onBlur={this.updateContent}
            rows="4"
            disabled={isLoading}
            ref={el => {
              this.content = el;
            }}
          />
          <div className="input-extra">{draft.content.length}</div>
          <QuickReplies />
        </div>
        <div>
          <label htmlFor="input-tags">Tags (space separated)</label>
          <input
            id="input-tags"
            type="text"
            placeholder="e.g. web  personal"
            value={draft.tags}
            onChange={this.updateTags}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="input-slug">Slug</label>
          <input
            id="input-slug"
            type="text"
            name="mp-slug"
            value={draft.slug}
            onInput={this.updateSlug}
            disabled={isLoading}
          />
        </div>
        <SyndicateInputs
          options={syndicateOptions}
          selected={draft.syndicateList}
          onUpdate={draft.setSyndicateList}
          isDisabled={isLoading}
        />
        {store.flashMessage ? <Message message={store.flashMessage} /> : null}
        <button
          type="submit"
          disabled={isLoading || !draft.content}
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

  updateTitle = e => {
    const title = e.target.value;
    this.props.draft.setTitle(title);
  };

  updateSlug = e => {
    const slug = e.target.value;
    this.props.draft.setSlug(slug);
  };

  updateContent = e => {
    const content = e.target.value;
    this.props.draft.setContent(content);
  };

  updateTags = e => {
    this.props.draft.setTags(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.store.send();
  };
}
