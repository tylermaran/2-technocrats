import axios from 'axios';
import React from "react";
import "./Title.css";


class Title extends React.Component {
  componentDidMount() {
    console.log("YOOOOOOOOOOOOOOOOOOOOOOOOO");
    const auth = localStorage.getItem("jwtToken");

    axios({
      method: 'GET',
      url: '/api/users/current',
      headers:
        {
          'Cache-Control': 'no-cache',
          Authorization: auth
        }
    })
      .then((response) => {

        // let stockData = response.data['AAPL'];
        console.log(response);
        console.log("BROOOOOOOOOOOOOOOOOOO");
      }).catch(response => {
        console.log(response);
      });
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
