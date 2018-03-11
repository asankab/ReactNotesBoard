import React, { Component } from 'react'
import Notes from './Notes'

class Board extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Notes count={this.props.count} />
            </div>
        )
    }
}

export default Board;