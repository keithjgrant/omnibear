import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';

@inject('store', 'settings')
@observer
export default class QuickReplies extends Component {
  render() {
    const {settings} = this.props;
    const reacji = settings.reacji;
    if (!reacji || !reacji.length) {
      return null;
    }
    return <ul className="quick-replies">{reacji.map(this.renderReacji)}</ul>;
  }

  renderReacji = content => {
    return (
      <li key={content}>
        <button
          type="button"
          onClick={() => this.send(content)}
          disabled={this.props.store.isSending}
        >
          {content}
        </button>
      </li>
    );
  };

  send = content => {
    const {store} = this.props;
    store.addQuickReply(content);
  };
}
