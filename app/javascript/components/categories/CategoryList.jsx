import React, { Component } from "react";
import NewCategory from "./NewCategory";

class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/categories")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ categories: response });
      });
  }

  handleDelete = (id) => {
    fetch(`/api/v1/categories/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState((state) => {
          let newCategories = state.categories.filter(
            (category) => category.id !== id
          );
          return { categories: newCategories };
        }, alert(response.message));
      });
  };

  handleNewCategory = (newCategory) => {
    this.setState((state) => {
      return {
        categories: state.categories.concat(newCategory)
      };
    });
  };

  render() {
    const { categories } = this.state && this.state;
    return (
      <div className="my-5">
        <h2>Category List</h2>
        <NewCategory action={this.handleNewCategory} />
        <table className="table table-striped text-center">
          <thead className="thead-light">
            <tr>
              <th>Color</th>
              <th>Category Name</th>
              <th>
                <i className="fas fa-trash-alt"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">
                      <button
                        className="btn px-4 py-2"
                        style={{ background: `${category.color}` }}
                      >
                        {category.color}
                      </button>
                    </th>
                    <td>{category.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => this.handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoryList;
