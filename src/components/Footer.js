import { h, Component } from 'preact';


export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div>
          Authenticated to <strong>{this.props.domain}</strong>
        </div>
        <button className="button-link" onClick={this.handleClick}>Logout</button>
      </footer>
    );
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onLogout();
  }
}
