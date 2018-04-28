import React, { Component } from 'react';
import { render } from 'react-dom';
import Details from './details';
import { Link } from "react-router-dom";


class Chirper extends Component {
    
    constructor(props) {
        super(props);
    }
        
    render() {
        return (
                    
          <tr className="text-center">
            <td className='text-warning w-75'>{this.props.value.text}</td>
            <td><Link to={`/details/${this.props.value.id}`}>See Details</Link>
            </td>
          </tr>
        );
    };
};

export default Chirper;