import {h, Component} from 'preact';
import {getPageUrl} from '../../util/utils';

/*
Props:
url
onChange
*/

export default class UrlSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      options: [],
    };
  }

  componentWillMount() {
    this.refreshUrls();
  }

  render() {
    const {isOpen, options} = this.state;
    const {url} = this.props;
    return (
      <div className={`dropdown ${isOpen ? ' is-open' : ''}`}>
        <button className="dropdown__toggle" onClick={this.toggle}>
          {this.renderUrlOption(this.findActiveOption())}
        </button>
        {isOpen ? (
          <div className="dropdown__drawer">
            {options.map(option =>
              this.renderUrlOption(option, option.url === url)
            )}
          </div>
        ) : null}
      </div>
    );
  }

  renderUrlOption(option, isActive) {
    return (
      <button
        className={`url-option${isActive ? ' is-active' : ''}`}
        onClick={this.selectUrl.bind(this, option.url)}
        disabled={option.isDisabled}
      >
        <div className="url-option__type">{option.name}</div>
        <div className="url-option__url">{option.url}</div>
      </button>
    );
  }

  findActiveOption() {
    const {url} = this.props;
    const {options} = this.state;
    return options.find(option => option.url === url) || {url};
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  selectUrl(url) {
    this.setState({
      url: url,
      isOpen: false,
    });
    this.props.onChange(url);
  }

  refreshUrls() {
    getPageUrl().then(url => {
      const options = [
        {
          name: 'Current page',
          url,
        },
      ];
      const selectedEntry = localStorage.getItem('selectedEntry');
      if (selectedEntry) {
        options.push({name: 'Selected entry', url: selectedEntry});
      } else {
        options.push({name: 'Selected entry', url: '—', isDisabled: true});
      }
      this.setState({options});
      if (!this.props.url) {
        this.props.onChange(url);
      }
    });
  }
}