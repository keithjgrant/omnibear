import {h, Component} from 'preact';
import Control from './Control';
import {getPageUrl} from '../../util/utils';

export default class WebmentionTarget extends Component {
  render() {
    const {sourceUrl, target} = this.props;
    return (
      <tr>
        <td>{target}</td>
        <td>
          <Control source={sourceUrl} target={target} />
        </td>
      </tr>
    );
  }
}
