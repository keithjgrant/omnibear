import {h, Component} from 'preact';
import QuickActions from './QuickActions';
import Message from './Message';
import ChangeViewTabs from './ChangeViewTabs';
import FormInputs from './FormInputs';
import Footer from './Footer';
import micropub from '../util/micropub';
import {
  NEW_NOTE,
  PAGE_REPLY,
  ITEM_REPLY,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';
import {getSettings} from '../util/settings';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    const selectedEntry = localStorage.getItem('selectedEntry');
    const settings = getSettings();
    const draft = JSON.parse(localStorage.getItem('draft')) || {};
    this.state = {
      postType: this.getPostType(settings),
      url: this.getEntryUrl(),
      userDomain: localStorage.getItem('domain'),
      entry: {
        h: 'entry',
        content: draft.content || '',
        category: draft.category || [],
        'mp-slug': draft['mp-slug'] || '',
      },
      hasSelectedEntry: !!selectedEntry,
      isDisabled: false,
      isLoading: false,
      settings: settings,
    };
  }

  getPostType(settings) {
    const selectedEntry = localStorage.getItem('selectedEntry');
    if (
      location.search.indexOf('reply=true') === -1 &&
      !settings.defaultToCurrentPage
    ) {
      return NEW_NOTE;
    }
    if (selectedEntry) {
      return ITEM_REPLY;
    } else {
      return PAGE_REPLY;
    }
  }

  getEntryUrl() {
    const selectedEntry = localStorage.getItem('selectedEntry');
    if (selectedEntry) {
      return selectedEntry;
    } else {
      return localStorage.getItem('pageUrl');
    }
  }

  render() {
    const {
      postType,
      url,
      isDisabled,
      isLoading,
      settings,
      userDomain,
      entry,
      hasSelectedEntry,
      errorMessage,
    } = this.state;
    const {handleSettings, handleLogout} = this.props;
    return (
      <div>
        <ChangeViewTabs
          postType={postType}
          onChange={this.changeView}
          hasSelectedEntry={hasSelectedEntry}
        />
        <QuickActions
          postType={postType}
          url={url}
          onLike={this.handleLike}
          onRepost={this.handleRepost}
          onReacji={this.handleReacji}
          isDisabled={isLoading}
          settings={settings}
        />
        <div className="container">
          <FormInputs
            postType={postType}
            entry={entry}
            settings={settings}
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
        <Footer
          domain={userDomain}
          onSettings={handleSettings}
          onLogout={handleLogout}
        />
      </div>
    );
  }

  handleLike = () => {
    if (!this.state.url) {
      return;
    }
    this.postEntry({
      h: 'entry',
      'like-of': this.state.url,
    })
      .then(location => {
        const type = this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} liked successfully`, location);
      })
      .catch(err => {
        console.error(err);
        this.flashErrorMessage('Error posting like');
      });
  };

  handleRepost = () => {
    if (!this.state.url) {
      return;
    }
    this.postEntry({
      h: 'entry',
      'repost-of': this.state.url,
    })
      .then(location => {
        const type = this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} reposted successfully`, location);
      })
      .catch(err => {
        console.error(err);
        this.flashErrorMessage('Error reposting');
      });
  };

  handleReacji = emoji => {
    if (!this.state.url) {
      return;
    }
    this.postEntry({
      h: 'entry',
      content: emoji,
      'in-reply-to': this.state.url,
    })
      .then(location => {
        const type = this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        this.flashSuccessMessage(`${type} reacted to successfully`, location);
      })
      .catch(err => {
        console.error(err);
        this.flashErrorMessage('Error reacting');
      });
  };

  updateEntry = newEntry => {
    this.setState({entry: newEntry});
  };

  flashSuccessMessage(message, location) {
    this.props.userFeedback(message, MESSAGE_SUCCESS, location);
    if (this.state.settings.closeAfterPosting) {
      setTimeout(() => {
        window.close();
      }, 3000);
    }
  }

  flashErrorMessage(message) {
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
    if (this.state.postType !== NEW_NOTE) {
      entry['in-reply-to'] = this.state.url;
    }
    this.postEntry(entry)
      .then(location => {
        const type = this.state.postType === NEW_NOTE ? 'Note' : 'Reply';
        this.flashSuccessMessage(`${type} posted successfully`, location);
      })
      .catch(err => {
        console.error(err);
        if (err.status >= 400 && err.status < 500) {
          this.flashErrorMessage(
            'Error authenticating to micropub endpoint. Try logging out and back in.'
          );
        } else {
          this.flashErrorMessage('Error posting Note');
        }
      });
  };

  postEntry(entry) {
    const slugName = this.state.settings.slug;
    this.setState({
      isDisabled: true,
      isLoading: true,
    });
    if (slugName) {
      entry[slugName] = entry['mp-slug'];
      delete entry['mp-slug'];
    }
    return micropub.create(entry, 'form');
  }

  changeView = postType => {
    let url;
    switch (postType) {
      case NEW_NOTE:
        url = null;
        break;
      case PAGE_REPLY:
        url = localStorage.getItem('pageUrl');
        break;
      case ITEM_REPLY:
        url = localStorage.getItem('selectedEntry');
        break;
    }
    this.setState({url, postType});
    this.form.focus();
  };
}
