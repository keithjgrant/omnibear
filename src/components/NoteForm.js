import { h, Component } from 'preact';
import Header from './Header';
import Message from './Message';
import ChangeViewButtons from './ChangeViewButtons';
import FormInputs from './FormInputs';
import Footer from './Footer';
import {postFormData} from '../util/requests';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY, MESSAGE_SUCCESS, MESSAGE_ERROR} from '../constants';


export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    let entryUrl = null;
    let postType;
    const selectedEntry = localStorage.getItem('selectedEntry');
    if (location.search.indexOf('reply=true') === -1) {
      postType = NEW_NOTE;
    } else {
      if (selectedEntry) {
        postType = ITEM_REPLY;
        entryUrl = selectedEntry;
      } else {
        postType = PAGE_REPLY;
        entryUrl = localStorage.getItem('pageUrl');
      }
    }
    this.state = {
      postType: postType,
      url: entryUrl,
      userDomain: localStorage.getItem('domain'),
      entry: {
        'h': 'entry',
        'content': '',
        'tags': [],
        'mp-slug': '',
      },
      hasSelectedEntry: !!selectedEntry,
      isDisabled: false,
    };
  }

  render() {
    return (
      <div>
        <Header
          postType={this.state.postType}
          url={this.state.url}
          onLike={this.handleLike}
          onRepost={this.handleRepost}
        />
        <div className="container">
          <div className="text-right">
            <ChangeViewButtons
              postType={this.state.postType}
              onChange={this.changeView}
              hasSelectedEntry={this.state.hasSelectedEntry}
            />
          </div>
          <FormInputs
            entry={this.state.entry}
            updateEntry={this.updateEntry}
            onSubmit={this.handleSubmit}
            isDisabled={this.state.isDisabled}
            ref={(el) => this.form = el}
          />
          {
            this.state.errorMessage
            ? <Message type={MESSAGE_ERROR}>{this.state.errorMessage}</Message>
            : null
          }
        </div>
        <Footer domain={this.state.userDomain} onLogout={this.props.handleLogout} />
      </div>
    );
  }

  handleLike = () => {
    if (!this.state.url) { return; }
    this.postEntry({
      'h': 'entry',
      'like-of': this.state.url,
    })
    .then(() => {
      const type = (this.state.postType === ITEM_REPLY) ? 'Item' : 'Page';
      this.flashSuccessMessage(`${type} liked successfully`);
    }).catch((err) => {
      console.error(err);
      this.flashErrorMessage('Error posting like');
    });
  }

  handleRepost = () => {
    if (!this.state.url) { return; }
    this.postEntry({
      'h': 'entry',
      'repost-of': this.state.url,
    })
    .then(() => {
      const type = (this.state.postType === ITEM_REPLY) ? 'Item' : 'Page';
      this.flashSuccessMessage(`${type} reposted successfully`);
    }).catch((err) => {
      console.error(err);
      this.flashErrorMessage('Error reposting');
    });
  }

  updateEntry = (newEntry) => {
    this.setState({entry: newEntry});
  }

  flashSuccessMessage(message) {
    this.props.userFeedback(message, MESSAGE_SUCCESS);
    setTimeout(() => {
      window.close();
    }, 4000);
  }

  flashErrorMessage(message) {
    this.setState({
      errorMessage: message,
      isDisabled: false,
    });
    setTimeout(() => {
      if (this.state.errorMessage === message) {
        this.setState({errorMessage: false});
      }
    }, 4000);
  }

  handleSubmit = (entry) => {
    if (this.state.postType !== NEW_NOTE) {
      entry['in-reply-to'] = this.state.url;
    }
    this.postEntry(entry)
    .then(() => {
      const type = (this.state.postType === NEW_NOTE) ? 'Note' : 'Reply';
      this.flashSuccessMessage(`${type} posted successfully`);
    }).catch((err) => {
      this.flashErrorMessage('Error posting Note');
    });
  }

  postEntry(entry) {
    const endpoint = localStorage.getItem('micropubEndpoint')
    const token = localStorage.getItem('token');
    this.setState({
      isDisabled: true,
    });
    return postFormData(endpoint, entry, token);
  }

  changeView = (postType) => {
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
  }
}
