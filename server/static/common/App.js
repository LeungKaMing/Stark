import React from 'react';
// dom
import {hydrate} from 'react-dom'   // react16以后用hydrate来代替render，用于支持ssr
import {renderToString} from 'react-dom/server'
// router
import {StaticRouter, BrowserRouter, Route, Link} from 'react-router-dom'
// store
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from '../store/reducers'

class ClientCommon extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount () {
        console.log('in client')
    }
    goTo () {
    }
    render () {
        return (
            <div onClick={this.goTo.bind(this)}>client</div>
        )
    }
}

class ServerCommon extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount () {
        console.log('in server')
    }
    goTo () {
    }
    render () {
        return (
            <div onClick={this.goTo.bind(this)}>server</div>
        )
    }
}

export function inital (url = '') {
    const serverStore = createStore(reducers.counter)
    if (url) {
        return {
            dom: renderToString(
                <Provider store={serverStore}>
                    <StaticRouter location={url} context={{demo: 'hello'}}>
                        <div>
                            <Link to="/">go default</Link>
                            <Link to="/test">go test</Link>
                            <Route path="/" component={ServerCommon}></Route>
                            <Route path="/test" component={()=>(<div>test demo</div>)}></Route>
                        </div>
                    </StaticRouter>
                </Provider>
            ),
            store: serverStore.getState()
        }
    } else {
        const clientStore = createStore(reducers.counter, window.__PRELOADED_STATE__)
        delete window.__PRELOADED_STATE__

        return {
            dom: hydrate(
                <Provider store={clientStore}>
                    <BrowserRouter>
                        <div>
                            <Link to="/">go default</Link>
                            <Link to="/test">go test</Link>
                            <Route path="/" component={ClientCommon}></Route>
                            <Route path="/test" component={()=>(<div>test demo</div>)}></Route>
                        </div>
                    </BrowserRouter>
                </Provider>
                , document.getElementById('app')
            )
        }
    }
}
