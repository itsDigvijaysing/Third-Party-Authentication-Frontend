import React, { Component } from "react";
import "../App.css";

export default class User extends Component {
  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%", height: "80vh" }}>
            <div>
              <div>
                <h3>Login History</h3>
              </div>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
                <tr>
                  <td>Anom</td>
                  <td>19</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>Megha</td>
                  <td>19</td>
                  <td>Female</td>
                </tr>
                <tr>
                  <td>Subham</td>
                  <td>25</td>
                  <td>Male</td>
                </tr>
              </table>
            </div>
          </div>
          <div style={{ width: "50%", height: "80vh" }}>
            <div>World</div>
          </div>
        </div>
      </div>
    );
  }
}
