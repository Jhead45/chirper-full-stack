import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.urlId = this.props.match.params.id;
    }

    componentDidMount() {
        const url = `/api/chirps/${this.urlId}`;

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                let text = result[0].text;
                this.setState({ text });
            });
    }

    onInputChange(value) {
        this.setState({ text: value });
    }

    handleForm(e, text) {
        event.preventDefault();
        const url2 = `/api/chirps/${this.urlId}`;

        fetch(url2, {
            method: 'PUT',
            body: JSON.stringify({ text }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',
            }),
        })
            .then((res) => {
                console.log('Success!');
                location.reload();
                this.props.history.replace('/');
            })
            .catch((error) => console.error('Error'));
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <form
                    className="d-flex justify-content-center mb-3 form-control-lg"
                    onSubmit={(e) => this.handleForm(e, this.state.text)}>
                    <input
                        placeholder={this.state.text}
                        value={this.state.value}
                        onChange={(event) =>
                            this.onInputChange(event.target.value)
                        }
                    />
                    <br />
                    <button className="bg-dark text-warning" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        );
    }
}

export default Edit;
