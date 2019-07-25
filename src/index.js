import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './config';
import { Login, Register } from './container';
import AuthRoute from './component/authroute/authroute';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)
const store = createStore(reducers, enhancer)

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/* 普通组件，如果也想获取路由的信息,可以在组件内部使用withRouter */}
                <AuthRoute></AuthRoute>
                {/* 下面是路由组件即在Route中用component包裹的组件 */}
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
)