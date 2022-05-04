import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <img
                className="d-block h-100 w-100"
                src={"main_wall_2.jpg"}
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block h-100 w-100"
              src={"Security1.jpg"}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block h-100 w-100"
              src={"./security2.png"}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
        <div
          class="raw text-center"
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 35,
          }}
        >
          <h1>{"Built with Security & Comfort."}</h1>
          <hr />
          <p class="lead">Welcome to Third Party Authentication website</p>
        </div>
      </div>
    );
  }
}
