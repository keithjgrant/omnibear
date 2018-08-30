import {h, Component} from 'preact';
import {observer} from 'mobx-preact';
import {MESSAGE_SUCCESS, MESSAGE_ERROR, MESSAGE_INFO} from '../constants';
import {openLink} from '../util/utils';

@observer
export default class Message extends Component {
  render() {
    const {message} = this.props || {};
    return (
      <div className={this.getClass()}>
        {message.message}
        {message.location ? (
          <span>
            {':'}
            <br />
            <a href={message.location} onClick={openLink}>
              {message.location}
            </a>
          </span>
        ) : null}
      </div>
    );
  }

  getClass() {
    const types = {
      [MESSAGE_INFO]: 'message message--info',
      [MESSAGE_SUCCESS]: 'message message--success',
      [MESSAGE_ERROR]: 'message message--danger',
    };
    return types[this.props.message.type] || types[MESSAGE_INFO];
  }
}
