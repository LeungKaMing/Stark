import React from "react";
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'

export function markup (url) {
    return renderToString(
        <div>123</div>
    )
}
