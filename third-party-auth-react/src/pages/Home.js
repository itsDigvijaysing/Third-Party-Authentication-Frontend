import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import impimage from "../img/main_wall_3.png";
import otherone from "../img/main_wall_2.jpg";
import "../App.css";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={impimage} alt="First slide" />
            <Carousel.Caption>
              <h1>Security is the main lock for your digital data</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={otherone} alt="Second slide" />
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
