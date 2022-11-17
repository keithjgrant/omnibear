import { useContext } from 'preact';
import AppContext from '../../contexts/App';
import Message from '../Message';
import RepostSvg from '../svg/Repost';

export default function RepostForm() {
  const app = useContext(AppContext);
  return (
    <div className="container text-center">
      <p>Repost this entry?</p>
      {app.flashMessage ? <Message message={app.flashMessage} /> : null}
      <button
        type="button"
        className={`button${app.isSending ? ' is-loading' : ''}`}
        onClick={app.sendRepost}
        disabled={app.isSending}
      >
        Repost <RepostSvg />
      </button>
    </div>
  );
}
