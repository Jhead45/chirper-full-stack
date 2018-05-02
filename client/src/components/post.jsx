import React, { Component } from "react";
import { render } from "react-dom";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      location: "",
      userid: '1'
    };
  }

  onInputChange(value) {
    this.setState({ text: value });
  }

  onInputChange2(value) {
    this.setState({ location: value });
  }

  onInputChange3(value) {
    this.setState({ userid: value });
  }
  
  handleForm(event, text, location, userid) {
    // event.preventDefault();

    const url = '/api/chirps'
    
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify({text, location, userid}), 
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8'
        })
      }).then(res => console.log('Success!'))
      .catch(error => console.error('Error'))
    
  }


  render() { 
    console.log(this.state.userid);   
    return (
      <div className='d-flex justify-content-center'>
        <form
          className="d-flex justify-content-center mb-3 form-control-lg"
          onSubmit={(event) => this.handleForm(event, this.state.text, this.state.location, this.state.userid)}
        >
          <input className='w-100'
            placeholder="Write a message!"
            value={this.state.text}
            onChange={(event) => this.onInputChange(event.target.value)}
          />
          <input className='w-100'
            placeholder="Where are you from?"
            value={this.state.location}
            onChange={(event) => this.onInputChange2(event.target.value)}
          />
            <select 
              value={this.state.userid}
              onChange={(event) => this.onInputChange3(event.target.value)}>
              <option value="1">Justin</option>
              <option value="2">Adam</option>
              <option value="3">Bill</option>
              <option value="4">Chuck</option>
              <option value="5">Ed</option>
              <option value="6">Frank</option>
              <option value="7">George</option>
              <option value="8">Kyle</option>
              <option value="9">John</option>
              <option value="10">Rod</option>
            </select>
          <button className="bg-dark text-warning" type="submit">
            Chirp!
          </button>
        </form>
      </div>
    );
  }
}

export default Post;
