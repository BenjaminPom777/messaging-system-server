import React, { Fragment, useEffect } from 'react';
import './App.css';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider,useSelector ,useDispatch} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import reducers from './redux/reducers';
import Compose from './components/compose/Compose';
import Manage from './components/manage/Manage';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import {getUserInfo} from './redux/actions/userActions'
import { mySaga } from './redux/sagas/Saga';


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

function AppBody(){
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo(user.userId))
    }, [])   

  const {user}= useSelector(state=>state)

  return (
   <Router>  
      
        <div className="App">
          {user.isLogedIn?
            <Fragment>           
              <Nav />
                      
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/compose" component={Compose} />
                <Route path="/manage" component={Manage} />
              </Switch>
               
            </Fragment>:
            <Login />
          }
        </div>
    </Router>)
}


const Home = () => (<div>
  <h1>Home Page</h1>
</div>)



export default App;
