import React, { Component } from "react";
import { render } from "react-dom";
import Edit from "./edit";
import { Link } from "react-router-dom";



class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { text: []};
    this.urlId = props.match.params.id;
  }

  componentDidMount() {
    const url = `/api/chirps/${this.urlId}`;

    fetch(url)
      .then(result => result.json())
      .then(result => {
          this.setState({ text: result[0] })
        })
        .catch(error => console.log('Error'));
  }

  handleClick(e) {

    fetch(`/api/chirps/${this.urlId}`, {
        method: 'DELETE', 
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        })
      }).then((res) => {
        location.reload();
        this.props.history.replace('/')
      }).catch(error => console.log('Error'));
      
      

  }


  render() {
    return (
        <div className="d-flex justify-content-center">
            <div className='align-content-center'>
                <h1 className='display-1 goldText'>Chirp Details:</h1>
                <h2 className='text-center'>{this.state.text.text}</h2>
                <p className='d-flex justify-content-center mt-3'>
                <button className='justify-content-center btn-lg button text-warning' onClick={(e) => this.handleClick(e)}>X (delete)</button>
                <Link to={`/edit/${this.urlId}`}>Edit Chirp</Link></p>


            </div>
        </div>
    )
  }
}

export default Details;
