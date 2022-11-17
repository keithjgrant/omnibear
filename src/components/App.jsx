import { Component } from 'preact';
// import { inject, observer } from 'mobx-preact';
import Layout from './Layout';
import ChangeViewTabs from './ChangeViewTabs';
import Header from './Header';
import MainPane from './MainPane';
import Footer from './Footer';
import Auth from '../contexts/Auth';

// @inject('auth')
// @observer
export default function App() {
  return (
    <Auth.Provider>
      <Layout />
    </Auth.Provider>
  );
}
