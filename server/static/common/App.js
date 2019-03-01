import React from 'react';
import {Route, Link} from 'react-router-dom'

class Text1 extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>i am text1.</div>
        )
    }
}

class Text2 extends React.Component {
    render () {
        return (
            <div>i am text2.</div>
        )
    }
}

export class App extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        console.log(this.props, '<<<<<<<')
    }
    render () {
        return (
            <div>
                <Link to="/text1">go text1</Link>
                <Link to="/text2">go text2</Link>
                <Route path="/text1" component={Text1}></Route>
                <Route path="/text2" component={Text2}></Route>
            </div>
        )
    }
}