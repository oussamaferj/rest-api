import React from "react";
import "./App.css";
import Contact from "./components/contact";
import Contactlist from "./components/contactlist";
import { Link, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idc: null,
      contactlist: [],
      update: false,
      name: "",
      phone: null,
      email: ""
    };
  }
  componentDidMount() {
    axios.get("/contacts").then(res =>
      this.setState({
        contactlist: res.data
      })
    );
  }
  updatelist = data => {
    this.setState({ contactlist: data });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  modifiy = (data, id) => {
    this.setState({
      idc: id,
      update: true,
      name: data.name,
      phone: data.phone,
      email: data.email
    });
  };
  test=()=>{
    this.setState({
      update:false,
      name: "",
      phone: "",
      email:""
    })
  }
  render() {
    return (
      <div>
        <h1>Contact app</h1>
        <div className="buttons">
          <Link to="/contact-list">
            <fieldset>
              <button
                className="myButton"
                name="submit"
                type="submit"
                id="contact-submit"
              >
                Contact List
              </button>
            </fieldset>
          </Link>
          <Link to="/add-contact">
            <fieldset>
              <button
                className="myButton"
                name="submit"
                type="submit"
                id="contact-submit"
                onClick={this.test}
              >
                Add Contact
              </button>
            </fieldset>
          </Link>
        </div>
        <Route
          path="/add-contact"
          render={() => (
            <Contact
              update={this.updatelist}
              state={this.state}
              change={this.onChange}
            />
          )}
        />
        <Route
          path="/contact-list"
          render={() => (
            <div className="contactlist">
              {" "}
              {this.state.contactlist.map((e, i) => (
                <Contactlist
                  el={e}
                  index={i}
                  update={this.updatelist}
                  contactlist={this.state.contactlist}
                  modify={this.modifiy}
                />
              ))}{" "}
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
