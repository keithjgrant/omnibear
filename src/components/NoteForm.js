import { h, Component } from 'preact';
import Header from './Header';
import ChangeViewButton from './ChangeViewButton';
import FormInputs from './FormInputs';
import Footer from './Footer';
import {postFormData} from '../requests';
import {getCurrentTabUrl} from '../utils';
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
            onSubmit={this.postEntry}
            disabled={this.state.isDisabled}
          />
        </div>
        <Footer domain={this.state.userDomain} onLogout={this.props.handleLogout} />
      </div>
    );
  }

  handleLike() {
    console.log('liked: ' + this.state.url);
  }

  handleRepost() {
    console.log('reposted: ' + this.state.url);
  }

  updateEntry = (newEntry) => {
    this.setState({entry: newEntry});
  }

  postEntry = (entry) => {
    if (this.state.postType !== NEW_NOTE) {
      entry['in-reply-to'] = this.state.url;
    }
    const endpoint = localStorage.getItem('micropubEndpoint')
    const token = localStorage.getItem('token');
    this.setState({
      isDisabled: true,
    });
    postFormData(endpoint, entry, token)
    .then(() => {
      const type = (this.state.postType === NEW_NOTE) ? 'Note' : 'Reply';
      this.props.userFeedback(`${type} posted successfully`);
    });
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
