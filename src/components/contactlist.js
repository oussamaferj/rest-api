import React from "react";
import "./contact.css";
import axios from "axios";
import { Link, Route } from "react-router-dom";
class Contactlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update:false,
      name:"",
      phone:null,
      email:""
    };
    
  }
  delete = event => {
    axios
      .delete("/delete-contact/" + event.target.id)
      .then(res =>
        axios.get("/contacts").then(res => this.props.update(res.data))
      );
  };
  updateContact=(event)=>{
    
    this.props.contactlist.map((el,i)=>{
    
      
      if (i==event.target.id){
        
       this.props.modify(el,event.target.name);
}
}
    )};
  render() {
    return (
      <div class="flex-container">
        <div>Name :{this.props.el.name}</div>
        <div>Phone :{this.props.el.phone}</div>
        <div> email :{this.props.el.email}</div>
        <button
          className="myButton"
          id={this.props.el._id}
          onClick={this.delete}
        >
          Delete
        </button>
        <Link to="/add-contact">
        <button className="myButton" name={this.props.el._id}  id={this.props.index} onClick={this.updateContact}>Update</button>
        </Link>
      </div>
    );
  }
}
export default Contactlist;
