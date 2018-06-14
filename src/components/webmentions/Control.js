import {h, Component} from 'preact';

export default class Control extends Component {
  render() {
    const {sourceUrl, target} = this.props;
    return (
      <button className="button button--block">Send&nbsp;Webmention</button>
    );
  }
}
