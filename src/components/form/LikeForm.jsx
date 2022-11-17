import { useContext } from 'preact';
import AppContext from '../../contexts/App';
import Message from '../Message';
import HeartSvg from '../svg/Heart';

export default function LikeForm() {
  const app = useContext(AppContext);
  return (
    <div className="container text-center">
      <p>Like this entry?</p>
      {app.flashMessage ? <Message message={app.flashMessage} /> : null}
      <button
        type="button"
        className={`button${app.isSending ? ' is-loading' : ''}`}
        onClick={app.sendLike}
        disabled={app.isSending}
      >
        Like <HeartSvg />
      </button>
    </div>
  );
}
