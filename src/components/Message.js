import { h, Component } from 'preact';

export default class Message extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.close();
    }, 2000);
  }

  render() {
    return (
      <div className="header header--new">{this.props.children}</div>
    );
  }
}
