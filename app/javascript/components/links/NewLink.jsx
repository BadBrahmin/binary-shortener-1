import React, { Component } from "react";

class NewLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { original } = this.state;
    if (!original) return alert("Please enter a valid link!");

    function isValidUrl(original) {
      try {
        new URL(original);
      } catch (_) {
        return false;
      }
      return true;
    }
    if (isValidUrl(original)) {
      const link = {
        original
      };

      fetch("/api/v1/links", {
        method: "POST",
        body: JSON.stringify(link),
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response.message);
          this.setState({
            original: ""
          });
          this.props.action(response.link);
        })
        .catch((response) => alert(response.message));
    } else {
      alert("Link not valid!");
      this.setState({
        original: ""
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center mt-4">
        <h5 className="mr-4 mt-1">Add new Link:</h5>
        <form className="form-inline">
          <input
            type="url"
            className="form-control mb-2 mr-sm-2 shadow-sm"
            value={this.state.original}
            name="original"
            placeholder="Link to shorten"
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="btn btn-success mr-2 mb-2"
            onClick={this.handleSubmit}
          >
            Shorten!
          </button>
        </form>
      </div>
    );
  }
}

export default NewLink;
