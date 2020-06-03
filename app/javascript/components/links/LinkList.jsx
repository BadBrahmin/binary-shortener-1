import React, { Component } from "react";
import NewLink from "./NewLink";
import ReactTooltip from "react-tooltip";
import moment from "moment";

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
    console.log(payload);
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

  formatDate = (date) => {
    // const updatedAt = updatedAtArr.push(
    //   ...updatedAtArr,
    //   moment(date).fromNow()
    // );
    const last_updated = moment(date).fromNow();
    console.log(last_updated);

    // console.log(updatedAtArr, "----date");
    // return this.setState({ ...this.state.updatedAt, last_updated });
  };

  handleSetState = () => {
    this.componentDidMount();
  };

  render() {
    const { links, categories } = this.state;
    console.log(links, "------links");
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
              links.map(
                (
                  {
                    linkid,
                    pinned,
                    original,
                    short_hash,
                    linkcategory,
                    last_visited
                  },
                  i
                ) => {
                  return (
                    <tr key={short_hash}>
                      <th scope="row">
                        <button
                          className={`${
                            pinned ? "btn-primary" : "btn-outline-info"
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
                        {last_visited ? (
                          <>
                            <a
                              href={original}
                              target="_blank"
                              onClick={() => this.handleShowClick(linkid)}
                              data-for={short_hash}
                              data-tip
                            >
                              http://short.is/{short_hash}
                            </a>
                            <ReactTooltip
                              id={short_hash}
                              place="bottom"
                              type="info"
                            >
                              Last Visited:
                              {/* {this.formatDate(last_visited.updated_at)} */}
                              {moment(last_visited.updated_at).fromNow()}
                            </ReactTooltip>
                          </>
                        ) : (
                          <a
                            href={original}
                            target="_blank"
                            onClick={() => this.handleShowClick(linkid)}
                          >
                            http://short.is/{short_hash}
                          </a>
                        )}
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
