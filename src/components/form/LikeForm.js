import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import Message from '../Message';
import HeartSvg from '../svg/Heart';

@inject('store')
@observer
export default class LikeForm extends Component {
  render() {
    const {store} = this.props;
    return (
      <div className="container text-center">
        <p>Like this entry?</p>
        {store.flashMessage ? <Message message={store.flashMessage} /> : null}
        <button
          type="button"
          className={`button${store.isSending ? ' is-loading' : ''}`}
          onClick={store.sendLike}
          disabled={store.isSending}
        >
          Like <HeartSvg />
        </button>
      </div>
    );
  }
}
