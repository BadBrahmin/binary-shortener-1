import React, { Component } from "react";

class NewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, color } = this.state;
    if (!name || !color) return alert("Please enter all the fields!");
    if (color.length !== 7)
      return alert("Please enter a valid Hex Code: #FF0000");

    const category = {
      name,
      color
    };

    fetch("/api/v1/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        this.setState({
          name: "",
          color: ""
        });
        this.props.action(response.category);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="d-flex justify-content-center mt-4">
        <h5 className="mr-4 mt-1">Add new Category: </h5>
        <form className="form-inline">
          <input
            type="text"
            className="form-control mb-2 mr-sm-2 shadow-sm"
            value={this.state.name}
            name="name"
            placeholder="Category Name"
            onChange={this.handleChange}
          />

          <input
            className="form-control mb-2 mr-sm-2 shadow-sm"
            value={this.state.color}
            name="color"
            placeholder="Color: #FF0000"
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="btn btn-success mr-2 mb-2"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewCategory;
