import {h, Component} from 'preact';
import WebmentionTarget from './WebmentionTarget';
import {getPageUrl} from '../../util/utils';

export default class WebmentionList extends Component {
  render() {
    const {sourceUrl, links} = this.props;
    return (
      <div>
        <p>
          <small>
            Source URL: <a href={sourceUrl}>{sourceUrl}</a>
          </small>
        </p>
        <table class="webmention-list">
          <thead>
            <tr>
              <th>Target URL</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {links.map(l => (
              <WebmentionTarget sourceUrl={sourceUrl} target={l} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
