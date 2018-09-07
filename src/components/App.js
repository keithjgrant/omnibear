import {h, Component} from 'preact';
import {inject, observer} from 'mobx-preact';
import ChangeViewTabs from './ChangeViewTabs';
import Header from './Header';
import MainPane from './MainPane';
import Footer from './Footer';

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <div className="l-main">
        <nav className="l-main__sidebar">
          <ChangeViewTabs />
        </nav>
        <div className="l-main__full">
          <Header />
          <MainPane />
        </div>
        <Footer />
      </div>
    );
  }
}
