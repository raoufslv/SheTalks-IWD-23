import React, { Component } from 'react';

class Redirect extends Component {
    componentDidMount() {
        window.location.replace("/Posts");
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Redirect;
