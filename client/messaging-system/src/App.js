import React, { useEffect } from 'react';
import './App.css';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import reducers from './redux/reducers';
import Compose from './components/compose/Compose';
import Manage from './components/manage/Manage';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import Register from './components/login/Register';
import { getUserInfo } from './redux/actions/userActions'
import { mySaga } from './redux/sagas/Saga';
import { ProtectedRoute } from './components/router/ProtectedRoute';
import userPage from './components/userPage/UserPage';


const rootReducer = combineReducers(
  reducers
)

// const INITIAL_STATE={};
const sagaMiddleware = createSagaMiddleware();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(mySaga)

function App() {
  return (
    <Provider store={store}>
      <AppBody />
    </Provider>
  );
}

function AppBody() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(user.userId))
  }, [])

  const { user } = useSelector(state => state)

  return (
    <Router>

      <div className="App">
      
        {/* {user.isLogedIn  && <Nav />}                                     */}
        <Nav />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/" exact component={userPage} />          
          <ProtectedRoute path="/compose" component={Compose} />
          <ProtectedRoute path="/manage" component={Manage} />
        </Switch>
      </div>
    </Router>)
}



export default App;
