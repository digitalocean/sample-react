import React, { Component } from "react";

import {
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from "react-bootstrap";

class CustomVariables extends React.Component {
  render() {
    return <>
		<ButtonGroup>
		  <DropdownButton as={ButtonGroup} title="Customer Fields" id="additional-fields"  className="btn btn-secondary btn-sm">
		    <Dropdown.Item eventKey="3">First Name</Dropdown.Item>
		    <Dropdown.Item eventKey="4">Last Name</Dropdown.Item>
		  </DropdownButton>
		</ButtonGroup>
    </>;
  }
}


export default CustomVariables;