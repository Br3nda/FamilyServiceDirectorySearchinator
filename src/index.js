import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppCon from './container/app-container';
// import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import ServiceInfo from './components/Service/ServiceInfo';
import { HashRouter, Route } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <h1 className="container-fluid">Find Whānau Services in your area</h1>
          <Route exact path="/" component={AppCon} />
          <Route path="/service/:category/:name" component={ServiceInfo} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><HttpsRedirect><App /></HttpsRedirect></Provider>, document.getElementById('root'));
