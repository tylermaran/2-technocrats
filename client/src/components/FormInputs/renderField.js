import React from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Radio from './Radio';

const renderField = (props) => (

  <div>

    { (props.type === 'Name' ||

       props.type === 'Email' ||

       props.type === 'password') &&

      <TextInput {...props} />

    }

    { props.type === 'checkbox' && <Checkbox {...props} /> }

    { props.type === 'radio' && <Radio {...props} /> }

  </div>

);

export default rederField;