import {h, Component} from 'preact';
import {DEFAULT_REACJI} from '../../constants';
import HeartSvg from '../svg/HeartSvg';
import RepostSvg from '../svg/RepostSvg';

/*
Props:
settings
onReacji
isDisabled,
*/

export default class QuickActions extends Component {
  render() {
    const reacji = this.getReacjiList();
    if (!reacji || !reacji.length) {
      return null;
    }
    return (
      <div>
        <h2 className="minor-heading text-right">Quick Replies</h2>
        <ul className="quick-actions">{reacji.map(this.renderReacji)}</ul>
      </div>
    );
  }

  renderReacji = (content, i) => {
    return (
      <li key={content}>
        <button
          onClick={() => this.props.onReacji(content)}
          disabled={this.props.isDisabled}
        >
          {content}
        </button>
      </li>
    );
  };

  getReacjiList() {
    const {settings} = this.props;
    if (settings && settings.reacji) {
      return settings.reacji;
    }
    return DEFAULT_REACJI;
  }
}
