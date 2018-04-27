import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Chirper from './chirper';
import "isomorphic-fetch";



class Chirp extends Component {

    constructor(props) {
        super(props);
        this.state = { text: []};
    };

    componentDidMount() {
        const url = '/api/chirps'

        fetch(url)
          .then(result => result.json())
          .then(result => {
            let keys = Object.keys(result);

            let chirpArr = [];
            for (let i of keys) { 
                if (i !== 'nextid'){
                    let chirp = {
                        text: result[i].text,
                        id: i
                    };
                    chirpArr.push(chirp);                    
                };
            };
            this.setState({ text: chirpArr });
            // console.log(this.state.text);

        });
      
    };
    render() {
        return (
            <div className="d-flex justify-content-center">
                <table className="table table-dark w-50">
                    <tbody>
                 {this.state.text.map(text => <Chirper key={text.id} value={text} />)}
                    </tbody>
                </table>
            </div>
        );
    };
};

export default Chirp;

