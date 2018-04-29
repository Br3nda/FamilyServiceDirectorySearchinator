import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import AppCon from './container/app-container';
import ServiceInfo from './components/Service/ServiceInfo';
import Footer from './components/Templates/Footer';
// import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route, Switch } from 'react-router-dom';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <h1 className="container-fluid">Find Whānau Support - Mobile Site</h1>

          <Switch>
            <Route exact path="/" component={AppCon} />
            <Route path="/category/:category" component={AppCon} />
            <Route path="/service/:name" component={ServiceInfo} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
