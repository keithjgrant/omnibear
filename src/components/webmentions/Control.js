import {h, Component} from 'preact';
import {findEndpoint, sendWebmention} from '../../util/wm';

const LOADING = 'LOADING';
const READY = 'READY';
const NO_ENDPOINT = 'NO_ENDPOINT';
const SENDING = 'SENDING';
const SENT = 'SENT';

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: LOADING,
      endpointUrl: null,
    };
  }

  componentDidMount() {
    findEndpoint(this.props.target).then(this.setEndpoint);
  }

  render() {
    const {source, target} = this.props;
    const classes = 'button button-small button--block';
    switch (this.state.status) {
      case LOADING:
        return (
          <button className={`${classes} is-loading`} disabled>
            Finding&nbsp;endpoint
          </button>
        );
      case READY:
        return (
          <button className={classes} onClick={this.sendWebmention}>
            Send&nbsp;Webmention
          </button>
        );
      case NO_ENDPOINT:
        return (
          <button className={classes} disabled>
            No&nbsp;endpoint&nbsp;found
          </button>
        );
      case SENDING:
        return (
          <button className={`${classes} is-loading`} disabled>
            Sending
          </button>
        );
      default:
        return (
          <button className={classes} disabled>
            Sent
          </button>
        );
    }
  }

  setEndpoint = endpointUrl => {
    if (endpointUrl) {
      this.setState({
        status: READY,
        endpointUrl: endpointUrl,
      });
    } else {
      this.setState({
        status: NO_ENDPOINT,
      });
    }
  };

  sendWebmention = () => {
    //
  };
}
