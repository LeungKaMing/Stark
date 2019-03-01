import React from 'react';
// dom
import {hydrate} from 'react-dom'   // react16以后用hydrate来代替render，用于支持ssr
import {renderToString} from 'react-dom/server'
// router
import {StaticRouter, BrowserRouter} from 'react-router-dom'
// store
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from '../store/reducers'
import { App } from './App'

export function inital (url = '') {
    if (url === 'server') {
        console.log(1, url)
        const serverStore = createStore(reducers.counter)
        return {
            dom: renderToString(
                <Provider store={serverStore}>
                    <StaticRouter location={url} context={{}}>
                        <App type={url} />
                    </StaticRouter>
                </Provider>
            ),
            store: serverStore
        }
    } else if (url === 'client') {
        console.log(2, url)
        const clientStore = createStore(reducers.counter, window.__PRELOADED_STATE__)
        delete window.__PRELOADED_STATE__

        return {
            dom: hydrate(
                <Provider store={clientStore}>
                    <BrowserRouter>
                        <App type={url} />
                    </BrowserRouter>
                </Provider>
                , document.getElementById('root')
            ),
            store: clientStore
        }
    }
}
