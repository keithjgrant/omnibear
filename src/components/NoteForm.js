import { h, Component } from 'preact';
import Header from './Header';
import ChangeViewButton from './ChangeViewButton';
import FormInputs from './FormInputs';
import Footer from './Footer';
import {postFormData} from '../util/requests';
import {getCurrentTabUrl} from '../util/utils';
import {NEW_NOTE, PAGE_REPLY, ITEM_REPLY} from '../constants';


export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postType: NEW_NOTE,
      url: null,
      userDomain: localStorage.getItem('domain'),
      entry: {
        'h': 'entry',
        'content': '',
        'tags': [],
        'mp-slug': '',
      },
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
            <ChangeViewButton postType={this.state.postType} onChange={this.changeView} />
          </div>
          <FormInputs
            entry={this.state.entry}
            updateEntry={this.updateEntry}
            onSubmit={this.handleSubmit}
            isDisabled={this.state.isDisabled}
          />
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
      this.props.userFeedback(`${type} liked successfully`);
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
      this.props.userFeedback(`${type} reposted successfully`);
    });
  }

  updateEntry = (newEntry) => {
    this.setState({entry: newEntry});
  }

  handleSubmit = (entry) => {
    if (this.state.postType !== NEW_NOTE) {
      entry['in-reply-to'] = this.state.url;
    }
    this.postEntry(entry)
    .then(() => {
      const type = (this.state.postType === NEW_NOTE) ? 'Note' : 'Reply';
      this.props.userFeedback(`${type} posted successfully`);
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

  changeView = (newView) => {
    if (newView == PAGE_REPLY) {
      getCurrentTabUrl()
      .then((url) => {
        this.setState({
          url: url,
          postType: newView,
        });
      });
    } else {
      this.setState({
        url: null,
        postType: newView,
      });
    }
  }
}
