import React from "react";
import "./contact.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link, Route } from "react-router-dom";
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      contactlist: [],
      go: false,
      update: false
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addContact = e => {
    e.preventDefault();
    axios
      .post("/add-contact", {
        name: this.props.state.name,
        phone: this.props.state.phone,
        email: this.props.state.email
      })
      .then(res =>
        axios.get("/contacts").then(res => this.props.update(res.data))
      )
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      go: true
    });
  };
  updateContact = e => {
    this.setState({
      update: true
    });
  };
  modify = (e) => {
    e.preventDefault();
    axios
    .put("/modify-contact/" + this.props.state.idc, {
      name: this.props.state.name,
      phone: this.props.state.phone,
      email: this.props.state.email
    })
    .then(res =>
      axios.get("/contacts").then(res => this.props.update(res.data))
    );
    this.setState({
      go: true
    });
  };
  render() {
    if (this.state.go) {
      return <Redirect to="/contact-list"></Redirect>;
    }

    return (
      <div>
        <div className="container">
          <form id="contact">
            <h1>Contact Form </h1>
            <br></br>
            <fieldset>
              <input
                placeholder="Contact Name"
                type="text"
                name="name"
                value={this.props.state.name}
                onChange={this.props.change}
                required
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Phone Number "
                name="phone"
                type="tel"
                value={this.props.state.phone}
                onChange={this.props.change}
                required
              ></input>
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Email Address"
                type="email"
                name="email"
                onChange={this.props.change}
                value={this.props.state.email}
                required
              ></input>
            </fieldset>
            <fieldset>
              <button
                id="contact-submit"
                onClick={
                  this.props.state.update ? this.modify : this.addContact
                }
              >
                {this.props.state.update ? "Update Contact" : "Add Contact"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
export default Contact;
