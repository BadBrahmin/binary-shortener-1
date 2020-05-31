import React, { Component } from "react";
import NewLink from "./NewLink";

class LinkList extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      categories: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/links")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          links: response.links,
          categories: response.categories
        });
      });
  }

  handlePin = (id, pinned) => {
    let payload = {
      link: {
        pinned: !pinned
      }
    };

    fetch(`/api/v1/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ links: response.links });
      });
  };

  handleCategoryClick = (category_id, link_id) => {
    let payload = {
      link: {
        category_id: category_id
      }
    };

    fetch(`/api/v1/links/${link_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ links: response.links });
      });
  };

  handleDelete = (id) => {
    fetch(`/api/v1/links/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .then(() => this.componentDidMount());
  };

  handleShowClick = (id) => {
    fetch(`/api/v1/links/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
  };

  handleSetState = () => {
    this.componentDidMount();
  };

  render() {
    const { links, categories } = this.state;
    return (
      <div className="my-5">
        <h2>Links List</h2>
        <NewLink action={this.handleSetState} />
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-light">
            <tr>
              <th>
                {" "}
                <i className="fas fa-thumbtack"></i>
              </th>
              <th>Original Link</th>
              <th>Short Link</th>
              <th>Category</th>
              <th>
                <i className="fas fa-trash-alt"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {links &&
              links.map((link, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">
                      <button
                        className={`${
                          link.pinned ? "btn-primary" : "btn-outline-info"
                        } p-2`}
                        onClick={() => this.handlePin(link.id, link.pinned)}
                      >
                        <i className="fas fa-thumbtack"></i>
                      </button>
                    </th>
                    <td>
                      <a href={link.original} target="_blank">
                        {link.original}
                      </a>
                    </td>
                    <td>
                      <a
                        href={link.original}
                        target="_blank"
                        onClick={() => this.handleShowClick(link.id)}
                      >
                        http://short.is/{link.short_hash}
                      </a>
                    </td>
                    <td>
                      <div className="dropdown">
                        {link.category ? (
                          <div>
                            <button
                              className="btn btn-outline-primary dropdown-toggle"
                              style={{ background: `${link.category.color}` }}
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              {link.category.name}{" "}
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {categories &&
                                categories.map((category, i) => {
                                  return (
                                    <a
                                      style={{
                                        textDecorationColor: `${category.color}`
                                      }}
                                      key={i}
                                      className="dropdown-item p-2"
                                      onClick={() =>
                                        this.handleCategoryClick(
                                          category.id,
                                          link.id
                                        )
                                      }
                                    >
                                      {category.name}
                                    </a>
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="btn btn-outline-primary dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Choose category
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {categories &&
                                categories.map((category, i) => {
                                  return (
                                    <a
                                      key={i}
                                      className="dropdown-item p-2"
                                      onClick={() =>
                                        this.handleCategoryClick(
                                          category.id,
                                          link.id
                                        )
                                      }
                                    >
                                      {category.name}
                                    </a>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => this.handleDelete(link.id)}
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

export default LinkList;
