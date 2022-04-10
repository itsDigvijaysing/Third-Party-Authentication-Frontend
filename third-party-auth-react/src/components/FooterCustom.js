import React, { Component } from "react";

export default class FooterCustom extends Component {
  render() {
    return (
      <footer className="footer">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5>123-456-7890</h5>
          <h5>AuthSystem@gmail.com</h5>
          <h5>Third Party Auth System</h5>
        </div>
      </footer>
    );
  }
}
