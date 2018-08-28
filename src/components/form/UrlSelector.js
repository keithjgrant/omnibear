import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import {BOOKMARK, LIKE, REPOST} from '../../constants';
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
    document.addEventListener('click', this.close);
  }

  render() {
    const {isOpen, options} = this.state;
    const {store} = this.props;
    return (
      <div onClick={e => e.stopPropagation()}>
        <h2 className="header-title">{this.getLabel()}</h2>
        <div className={`dropdown ${isOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="dropdown__toggle"
            onClick={this.toggle}
          >
            <div className="nowrap">{store.selectedUrl}</div>
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

  getLabel() {
    const {store} = this.props;
    let action;
    switch (store.viewType) {
      case BOOKMARK:
        action = 'Bookmark';
        break;
      case LIKE:
        action = 'Like';
        break;
      case REPOST:
        action = 'Repost';
        break;
      default:
        action = 'Reply to';
        break;
    }
    const option = this.findActiveOption();
    const urlType = option.name ? ` ${option.name.toLowerCase()}` : '';
    return `${action}${urlType}:`;
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
    this.setState({isOpen: !this.state.isOpen});
  };

  close = () => {
    this.setState({isOpen: false});
  };

  selectUrl(url) {
    this.setState({
      isOpen: false,
    });
    this.props.store.setSelectedUrl(url);
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
        store.setSelectedUrl(selectedEntry || url);
      }
    });
  }
}
