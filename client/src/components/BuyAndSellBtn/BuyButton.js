import React, { Component} from "react";


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

class BuyButton extends Component {

  render() {
    return <div className="input-group mb-3 justify-content-center">
        <div style={{ height: "40px", width: "60px" }} className="input-group-prepend ">
          <button style={{ margin: "0px", height: "100%" }} className="btn btn-outline-success" type="button">
            Buy
          </button>
        </div>
        <input type="number" className="form-control col-4" placeholder="$" aria-label="" aria-describedby="basic-addon1" />
      </div>;
  }
}

export default BuyButton;
