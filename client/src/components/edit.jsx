import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

class Edit extends Component {
    
    constructor(props) {
        super(props);
        this.urlId = this.props.match.params;
        console.log(this.props.match.params);
    }

    componentDidMount() {
        const url = `/api/chirps/${this.urlId}`;
        console.log(url);
    
        fetch(url)
          .then(result => result.json())
          .then(result => {
              this.setState({ text: result });
            console.log(this.state.text.text);
            
        })
      }

    render() {
        return <h3>Edit Chirp</h3>
    }
}

export default Edit;

// Need to add form and finish api to edit