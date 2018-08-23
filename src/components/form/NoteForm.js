import {h, Component} from 'preact';
import QuickActions from './QuickActions';
import Message from '../Message';
import FormInputs from './FormInputs';
import {getDraft, deleteDraft} from '../../util/draft';
import {clone} from '../../util/utils';
import micropub from '../../util/micropub';
import {
  NOTE,
  REPLY,
  BOOKMARK,
  LIKE,
  REPOST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../../constants';
import {getSettings, getSyndicateOptions} from '../../util/settings';
import {info, warning, error} from '../../util/log';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    const selectedEntry = localStorage.getItem('selectedEntry');
    const settings = getSettings();
    const draft = getDraft();
    this.state = {
      postType: this.getPostType(settings), // TODO: determine this in <App>
      selectedEntry: localStorage.getItem('selectedEntry'),
      userDomain: localStorage.getItem('domain'),
      entry: draft,
      hasSelectedEntry: !!selectedEntry,
      isDisabled: false,
      isLoading: false,
      settings: settings,
      syndicateOptions: getSyndicateOptions(),
    };
  }

  getPostType(settings) {
    // TODO: support other post types?
    // const selectedEntry = localStorage.getItem('selectedEntry');
    if (
      location.search.indexOf('type=reply') === -1 &&
      !settings.defaultToCurrentPage
    ) {
      return NOTE;
    }
    return REPLY;
  }

  getCurrentUrl() {
    switch (this.props.postType) {
      case NOTE:
        return null;
      // case PAGE_REPLY:
      default:
        return this.props.pageUrl;
      // case ITEM_REPLY:
      //   return this.state.selectedEntry;
      //   break;
    }
  }

  render() {
    const {
      isDisabled,
      isLoading,
      settings,
      userDomain,
      entry,
      syndicateOptions,
      hasSelectedEntry,
      errorMessage,
      activeUrl,
    } = this.state;
    const {handleSettings, handleLogout, postType} = this.props;
    return (
      <div style={{height: '100%'}}>
        {/* <QuickActions
          postType={postType}
          url={this.getCurrentUrl()}
          onLike={this.handleLike}
          onRepost={this.handleRepost}
          onReacji={this.handleReacji}
          isDisabled={isLoading}
          settings={settings}
        /> */}
        <div className="container">
          <FormInputs
            postType={postType}
            entry={entry}
            settings={settings}
            syndicateOptions={syndicateOptions}
            updateEntry={this.updateEntry}
            onSubmit={this.handleSubmit}
            isDisabled={isDisabled}
            isLoading={isLoading}
            ref={el => (this.form = el)}
          />
          {errorMessage ? (
            <Message type={MESSAGE_ERROR}>{errorMessage}</Message>
          ) : null}
        </div>
      </div>
    );
  }

  setUrl = url => {
    console.log('setting activeUrl', url);
    this.setState({activeUrl: url});
  };

  handleLike = () => {
    const url = this.getCurrentUrl();
    if (!url) {
      warning('Cannot send like; no current URL found');
      return;
    }
    this.postEntry({
      h: 'entry',
      'like-of': url,
    })
      .then(location => {
        const type = this.props.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} liked successfully`, location);
      })
      .catch(err => {
        this.flashErrorMessage('Error posting like', err);
      });
  };

  handleRepost = () => {
    const url = this.getCurrentUrl();
    if (!url) {
      warning('Cannot send repost; no current URL found');
      return;
    }
    this.postEntry({
      h: 'entry',
      'repost-of': url,
    })
      .then(location => {
        const type = this.props.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} reposted successfully`, location);
      })
      .catch(err => {
        this.flashErrorMessage('Error reposting', err);
      });
  };

  handleReacji = emoji => {
    const url = this.getCurrentUrl();
    if (!url) {
      warning('Cannot send reacji; no current URL found');
      return;
    }
    this.postEntry({
      h: 'entry',
      content: emoji,
      'in-reply-to': url,
    })
      .then(location => {
        const type = this.props.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} reacted to successfully`, location);
      })
      .catch(err => {
        this.flashErrorMessage('Error reacting', err);
      });
  };

  updateEntry = newEntry => {
    this.setState({entry: newEntry});
  };

  flashSuccessMessage(message, location) {
    info(message, location);
    this.props.userFeedback(message, MESSAGE_SUCCESS, location);
    if (this.state.settings.closeAfterPosting) {
      setTimeout(() => {
        window.close();
      }, 3000);
    }
  }

  flashErrorMessage(message, err) {
    error(message, err);
    this.setState({
      errorMessage: message,
      isDisabled: false,
      isLoading: false,
    });
    setTimeout(() => {
      if (this.state.errorMessage === message) {
        this.setState({errorMessage: false});
      }
    }, 4000);
  }

  handleSubmit = entry => {
    if (this.props.postType !== NOTE) {
      entry['in-reply-to'] = this.getCurrentUrl();
    }
    this.postEntry(entry)
      .then(location => {
        const type = this.props.postType === NOTE ? 'Note' : 'Reply';
        deleteDraft();
        this.flashSuccessMessage(`${type} posted successfully`, location);
      })
      .catch(err => {
        if (err.status >= 400 && err.status < 500) {
          this.flashErrorMessage(
            'Error authenticating to micropub endpoint. Try logging out and back in.',
            err
          );
        } else {
          this.flashErrorMessage('Error posting Note', err);
        }
      });
  };

  postEntry(entry) {
    this.setState({
      isDisabled: true,
      isLoading: true,
    });
    const aliasedEntry = clone(entry);
    const slugName = this.state.settings.slug;
    const syndicateName = this.state.settings.syndicateTo;
    if (slugName && slugName !== 'mp-slug') {
      aliasedEntry[slugName] = aliasedEntry['mp-slug'];
      delete aliasedEntry['mp-slug'];
    }
    if (syndicateName && syndicateName !== 'mp-syndicate-to') {
      aliasedEntry[syndicateName] = aliasedEntry['mp-syndicate-to'];
      delete aliasedEntry['mp-syndicate-to'];
    }
    return micropub.create(aliasedEntry, 'form');
  }

  /*
  changeView = postType => {
    let url;
    switch (postType) {
      case NOTE:
        url = null;
        break;
      default:
        url = localStorage.getItem('pageUrl');
        break;
      // case PAGE_REPLY:
      //   url = localStorage.getItem('pageUrl');
      //   break;
      // case ITEM_REPLY:
      //   url = localStorage.getItem('selectedEntry');
      //   break;
    }
    this.setState({url, postType});
    this.form.focus();
  };
  */
}
