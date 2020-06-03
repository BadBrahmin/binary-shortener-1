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
        this.setState((state) => {
          let newLinks = state.links.filter((link) => link.linkid !== id);
          return { links: newLinks };
        }, alert(response.message));
      });
  };

  handleShowClick = (id) => {
    fetch(`/api/v1/links/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
  };

  handleNewLink = (newLink) => {
    this.setState((state) => {
      return {
        links: state.links.concat(newLink)
      };
    });
  };

  render() {
    const { links, categories } = this.state;
    return (
      <div className="my-5">
        <h2>Links List</h2>
        <NewLink action={this.handleNewLink} />
        <table className="table table-striped text-center">
          <thead className="thead-light">
            <tr>
              <th>
                <i className="fas fa-thumbtack"></i>
              </th>
              <th>Original Link</th>
              <th>Short Link</th>
              <th>Category</th>
              <th>Visits</th>
              <th>
                <i className="fas fa-trash-alt"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {links &&
              links.map(
                (
                  { linkid, pinned, original, short_hash, linkcategory, count },
                  i
                ) => {
                  return (
                    <tr key={short_hash}>
                      <th scope="row">
                        <button
                          className={`${
                            pinned ? "btn-info" : "btn-outline-info"
                          } p-2`}
                          onClick={() => this.handlePin(linkid, pinned)}
                        >
                          <i className="fas fa-thumbtack"></i>
                        </button>
                      </th>
                      <td>
                        <a href={original} target="_blank">
                          {original}
                        </a>
                      </td>
                      <td>
                        <a
                          href={original}
                          target="_blank"
                          onClick={() => this.handleShowClick(linkid)}
                        >
                          http://short.is/{short_hash}
                        </a>
                      </td>
                      <td>
                        <div className="dropdown">
                          {linkcategory ? (
                            <div>
                              <button
                                className="btn btn-outline-primary dropdown-toggle"
                                style={{ background: `${linkcategory.color}` }}
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {linkcategory.name}{" "}
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
                                            linkid
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
                                Select
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
                                            linkid
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
                      <td>{count}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => this.handleDelete(linkid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LinkList;
