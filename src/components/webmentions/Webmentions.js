import {h, Component} from 'preact';
import WebmentionList from './WebmentionList';
import {getPageUrl, getOrigin} from '../../util/utils';
import {findPageLinks} from '../../util/wm';

export default class Webmentions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'loading',
      pageUrl: '',
      links: [],
    };
    this.fetchPageLinks();
  }

  render() {
    const {currentView, pageUrl, links} = this.state;
    switch (currentView) {
      case 'loading':
        return <div className="container">Loading…</div>;
      default:
        return (
          <div className="container">
            <WebmentionList sourceUrl={pageUrl} links={links} />
          </div>
        );
    }
  }

  fetchPageLinks() {
    getPageUrl().then(url => {
      const origin = getOrigin(url);
      this.setState({pageUrl: url}, () => {
        findPageLinks(url, origin).then(links => {
          this.setState({
            currentView: 'ready',
            links: links,
          });
        });
      });
    });
  }
}
