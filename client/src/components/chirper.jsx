import React, { Component } from 'react';
import { render } from 'react-dom';

class Chirper extends Component {
    
    constructor(props) {
        super(props);
    };
        
    render() {
        return (

          <tr className="text-center">
            <td>{this.props.value.text}</td>
          </tr>
        );
    };
};

export default Chirper;