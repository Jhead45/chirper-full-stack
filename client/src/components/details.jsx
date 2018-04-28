import React, { Component } from "react";
import { render } from "react-dom";
import Edit from "./edit";
import { Link } from "react-router-dom";



class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { text: ''};
    this.urlId = props.match.params.id;
  }

  componentDidMount() {
    const url = `/api/chirps/${this.urlId}`;
    // console.log(url);

    fetch(url)
      .then(result => result.json())
      .then(result => {
          this.setState({ text: result });
        // console.log(this.state.text.text);
        
    })
  }

  handleClick(e) {

    fetch(`/api/chirps/${this.urlId}`, {
        method: 'DELETE', 
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        })
      }).then(res => this.props.history.push('/'))
      .catch(error => console.error('Error'))

  }


  render() {
    return (
        <div className="d-flex justify-content-center">
            <div>
                <h1>Chirp Details:</h1>
                <h2 className='text-center'>{this.state.text.text}</h2>
                <button className='bg-dark text-warning' onClick={(e) => this.handleClick(e)}>X (delete)</button>
                <Link to={`/edit/${this.urlId}`}>Edit Chirp</Link>


            </div>
        </div>
    )
  }
}

export default Details;
