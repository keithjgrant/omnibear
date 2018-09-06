import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import DownArrow from '../svg/DownArrow';
import WebmentionSvg from '../svg/Webmention';
import {BOOKMARK, LIKE, REPOST} from '../../constants';

@inject('store')
@observer
export default class UrlSelector extends Component {
  constructor(props) {
    super(props);
    const options = this.loadOptions();
    this.state = {
      isOpen: false,
      options,
      supportsWebmention: false,
    };
    if (options[1].isDisabled) {
      this.selectEntry(options[0], true);
    } else {
      this.selectEntry(options[1], true);
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.close);
  }

  render() {
    const {isOpen, options, supportsWebmention} = this.state;
    const {store} = this.props;
    return (
      <div className="url-selector" onClick={e => e.stopPropagation()}>
        {supportsWebmention ? (
          <div className="wm-overlay">
            <WebmentionSvg title="This page supports webmention" />
          </div>
        ) : null}
        <h2 className="header-title">{this.getLabel()}</h2>
        <div className={`dropdown ${isOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="dropdown__toggle"
            onClick={this.toggle}
          >
            <div className="nowrap">{store.selectedEntry.url}</div>
            <div className="dropdown__toggle__arrow">
              <DownArrow />
            </div>
          </button>
          <div className="dropdown__drawer">
            {options.map(option =>
              this.renderUrlOption(
                option,
                option.url === store.selectedEntry.url
              )
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
        onClick={this.selectEntry.bind(this, option)}
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
      options.find(option => option.url === store.selectedEntry.url) ||
      store.selectedEntry
    );
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  close = () => {
    this.setState({isOpen: false});
  };

  selectEntry(entry, initialLoad) {
    this.setState({
      isOpen: false,
      supportsWebmention: entry.webmention,
    });
    this.props.store.setSelectedEntry(entry, initialLoad);
  }

  refreshUrls() {
    const {store} = this.props;
    const options = this.loadOptions();
    this.setState({options});
    if (!store.selectedEntry) {
      store.setSelectedEntry(options[options.length - 1]);
    }
  }

  loadOptions() {
    const pageEntry = JSON.parse(localStorage.getItem('pageEntry'));
    const options = [
      {
        name: 'Current page',
        url: pageEntry.url,
        title: pageEntry.title,
        webmention: pageEntry.webmention,
      },
    ];
    const itemEntry = JSON.parse(localStorage.getItem('itemEntry'));
    if (itemEntry) {
      options.push({
        name: 'Selected entry',
        url: itemEntry.url,
        title: itemEntry.title,
        webmention: itemEntry.webmention,
      });
    } else {
      options.push({
        name: 'Selected entry',
        url: '- none -',
        title: '',
        isDisabled: true,
      });
    }
    return options;
  }
}
