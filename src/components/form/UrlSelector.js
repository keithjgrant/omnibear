import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import {BOOKMARK} from '../../constants';
import {getPageUrl} from '../../util/utils';

@inject('store')
@observer
export default class UrlSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      options: [],
    };
  }

  componentDidMount() {
    this.refreshUrls();
  }

  render() {
    const {isOpen, options} = this.state;
    const {store} = this.props;
    return (
      <div>
        <h2 className="url-label">{this.getLabel()}</h2>
        <div className={`dropdown ${isOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="dropdown__toggle"
            onClick={this.toggle}
          >
            {store.selectedUrl}
            {/* {this.renderUrlOption(this.findActiveOption())} */}
          </button>
          <div className="dropdown__drawer">
            {options.map(option =>
              this.renderUrlOption(option, option.url === store.selectedUrl)
            )}
          </div>
        </div>
      </div>
    );
  }

  getLabel() {
    const {store} = this.props;
    const action = store.viewType === BOOKMARK ? 'Bookmark' : 'Reply to';
    const option = this.findActiveOption();
    const urlType = option.name ? ` ${option.name.toLowerCase()}` : '';
    return `${action}${urlType}:`;
  }

  renderUrlOption(option, isActive) {
    const {isOpen} = this.state;
    return (
      <button
        type="button"
        className={`url-option${isActive ? ' is-active' : ''} ${
          isOpen ? ' is-in' : ''
        }`}
        onClick={this.selectUrl.bind(this, option.url)}
        disabled={option.isDisabled}
      >
        <div className="url-option__type">{option.name}</div>
        <div className="url-option__url">{option.url}</div>
      </button>
    );
  }

  findActiveOption() {
    const {store} = this.props;
    const {options} = this.state;
    return (
      options.find(option => option.url === store.selectedUrl) || {
        url: store.selectedUrl,
      }
    );
  }

  toggle = () => {
    this.refreshUrls();
    this.setState({isOpen: !this.state.isOpen});
  };

  selectUrl(url) {
    this.setState({
      // url: url,
      isOpen: false,
    });
    this.props.store.selectedUrl = url;
  }

  refreshUrls() {
    const {store} = this.props;
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
        options.push({
          name: 'Selected entry',
          url: '- none -',
          isDisabled: true,
        });
      }
      this.setState({options});
      if (!store.selectedUrl) {
        store.setSelectedUrl(url);
      }
    });
  }
}
