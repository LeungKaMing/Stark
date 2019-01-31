import React from "react";
import {hydrate} from 'react-dom'
import {renderToString} from 'react-dom/server'
import {StaticRouter, BrowserRouter} from 'react-router-dom'

export function markup (url = '') {
    if (url) {
        return renderToString(
            <StaticRouter context={{}} location={url}>
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
