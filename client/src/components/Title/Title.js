import axios from 'axios';
import React from "react";
import "./Title.css";


class Title extends React.Component {
  componentDidMount() {
    axios.get("/api/students/test").then(response => console.log(response.data));
    axios.get("/api/transactions/test").then(response => console.log(response.data));


  }

  render() {
    return(
    <div className="row">
      <div className="col-7 title">Student Portfolio</div>
      <form className="col-5 form">
        <input placeholder=" search"/>
      </form>
    </div>

    );
  }
}

export default Title;
