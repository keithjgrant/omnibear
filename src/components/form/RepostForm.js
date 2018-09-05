import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import Message from '../Message';
import RepostSvg from '../svg/Repost';

@inject('store')
@observer
export default class RepostForm extends Component {
  render() {
    const {store} = this.props;
    return (
      <div className="l-main__main">
        <div className="container text-center">
          <p>Repost this entry?</p>
          {store.flashMessage ? <Message message={store.flashMessage} /> : null}
          <button
            type="button"
            className={`button${store.isSending ? ' is-loading' : ''}`}
            onClick={store.sendRepost}
            disabled={store.isSending}
          >
            Repost <RepostSvg />
          </button>
        </div>
      </div>
    );
  }
}
