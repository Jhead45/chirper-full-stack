import React, { Component } from "react";
import { render } from "react-dom";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  onInputChange(value) {
    this.setState({ text: value });
  }

  handleForm(e, text) {
    event.preventDefault();
    const url = '/api/chirps'

    let data = this.state
    console.log(data);
    
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify({text}), 
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        })
      }).then(res => console.log('Success!'))
      .catch(error => console.error('Error'))
    

  }


  render() {
     console.log(this.state);
    return (
      <div>
        <form
          className="d-flex justify-content-center mb-3 form-control-lg"
          onSubmit={(e) => this.handleForm(e, this.state.text)}
        >
          <input
            placeholder="Write a message!"
            value={this.state.text}
            onChange={(event) => this.onInputChange(event.target.value)}
          />
          <br />
          <button className="bg-dark text-warning" type="submit">
            Chirp!
          </button>
        </form>
      </div>
    );
  }
}

export default Post;
