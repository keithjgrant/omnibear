import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import QuickActions from './QuickActions';
import Message from '../Message';
import micropub from '../../util/micropub';

@inject('store')
@observer
export default class LikeForm extends Component {
  render() {
    return (
      <div className="l-main__main">
        <div className="container text-center">
          <p>Like this entry?</p>
          <button
            type="button"
            className="button"
            onClick={this.props.store.sendLike}
          >
            Like
          </button>
        </div>
      </div>
    );
  }
}
