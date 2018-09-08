import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import ChangeViewTabs from './ChangeViewTabs';
import Header from './Header';
import MainPane from './MainPane';
import Footer from './Footer';

@inject('auth')
@observer
export default class App extends Component {
  render() {
    return (
      <div className={this.getClass()}>
        <nav className="l-main__sidebar">
          <ChangeViewTabs />
        </nav>
        <div className="l-main__full">
          <div className="gradient-wrapper">
            <Header />
            <MainPane />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  getClass() {
    const {auth} = this.props;
    const height = auth.isLoggedIn() ? 'l-main--tall' : 'l-main--short';
    return `l-main ${height}`;
  }
}
