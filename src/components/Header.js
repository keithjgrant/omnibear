import {h, Component} from 'preact';
import UrlSelector from './form/UrlSelector';
import {
  NOTE,
  REPLY,
  BOOKMARK,
  LIKE,
  REPOST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';

/*
Props:
postType
url
setUrl
*/

export default class Header extends Component {
  render() {
    const {url, setUrl} = this.props;
    return (
      <header className="l-main__header">
        {this.showUrlSelector() ? (
          <UrlSelector url={url} onChange={setUrl} />
        ) : null}
      </header>
    );
  }

  showUrlSelector() {
    return [REPLY, BOOKMARK, LIKE, REPOST].includes(this.props.postType);
  }
}
