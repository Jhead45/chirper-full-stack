import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Chirper from './chirper';
import Post from './post';
import 'isomorphic-fetch';

class Chirp extends Component {
    constructor(props) {
        super(props);
        this.state = { text: [] };
    }

    componentDidMount() {
        const url = '/api/chirps';

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                this.setState({ text: result });
            })
            .catch((error) => console.log('Error'));
    }
    render() {
        console.log(this.state.text);

        return (
            <div>
                <h1 className="display-1 text-warning text-center" id="heading">
                    Chirper!
                </h1>
                <div className="d-flex justify-content-center">
                    <table className="table table-dark w-75">
                        <tbody>
                            {this.state.text.map((text) => (
                                <Chirper key={text.id} value={text} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <Post />
            </div>
        );
    }
}

export default Chirp;
