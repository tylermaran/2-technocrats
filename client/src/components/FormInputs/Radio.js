import React, { Component } from 'react';
import cx from 'classnames';
import uncheckImage from '../../assets/images/radio-1.svg.png';
import checkImage from '../../assets/images/radio-2.svg.png';

class Radio extends Component {

  componentWillReceiveProps(props) {

    console.log(props);

  }



  render() {

    let {

      input,

      label,

      type,

      meta: { touched, error, warning },

      disabled

    } = this.props;

    return (

      <label className={cx("radio", {

        checked: input.checked,

        disabled: disabled

      })}>

        <span className="icons">

          <img className="first-icon" src={uncheckImage} width={17} />

          <img className="second-icon" src={checkImage} width={17} />

        </span>

        <input {...input} type="radio" data-toggle="radio" disabled={disabled} />

        {label}

      </label>

    );

  }

}

export default Radio;