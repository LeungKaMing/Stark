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

export function inital (url = '') {
    const serverStore = createStore(reducers.counter)
    if (url) {
        return {
            dom: renderToString(
                <Provider store={serverStore}>
                    <StaticRouter location={url} context={{demo: 'hello'}}>
                        <div>server</div>
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
                        <div>client</div>
                    </BrowserRouter>
                </Provider>
                , document.getElementById('app')
            )
        }
    }
}
