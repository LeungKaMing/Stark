import React from 'react';
import {hydrate} from 'react-dom'   // react16以后用hydrate来代替render，用于支持ssr
import {renderToString} from 'react-dom/server'
import {StaticRouter, BrowserRouter} from 'react-router-dom'

export function markup (url = '') {
    if (url) {
        return renderToString(
            <StaticRouter>
                <div>server</div>
            </StaticRouter>
        )
    } else {
        return hydrate(
            <BrowserRouter>
                <div>client</div>
            </BrowserRouter>
        , document.getElementById('app'))
    }
}
