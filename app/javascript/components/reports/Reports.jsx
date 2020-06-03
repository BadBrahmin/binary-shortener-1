import React, { Component } from "react";

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      counters: {}
    };
  }

  componentDidMount() {
    fetch("/api/v1/counters")
      .then((response) => response.json())
      .then((response) => {
        this.setState({ counters: response.counts });
      });
  }
  render() {
    const { counters } = this.state;
    return (
      <>
        <div className="my-5">
          <h2>Reports</h2>
          <table className="table table-striped text-center my-5 p-5">
            <thead className="thead-light">
              <tr>
                <th>Month</th>
                <th># of clicks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(counters).map((month) => {
                return (
                  <tr key={month[0]}>
                    <td>{month[0]}</td>
                    <td>{month[1].length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Reports;
