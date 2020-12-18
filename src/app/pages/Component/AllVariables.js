import React, { Component } from "react";

import {
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from "react-bootstrap";

class AllVariables extends React.Component {
  render() {
    return <div>
    	<label className="btn-group-label" htmlFor="buttons">Insert Variables</label>
			                	<ButtonGroup>
								  <DropdownButton as={ButtonGroup} title="System Variable" id="system-variables"  className="btn btn-primary btn-sm">
								    <Dropdown.Item eventKey="1"> Sender Name </Dropdown.Item>
								    <Dropdown.Item eventKey="2"> Sender Email </Dropdown.Item>
								    <Dropdown.Item eventKey="3"> Recipient Email </Dropdown.Item>
								    <Dropdown.Item eventKey="4"> Reply-to Email </Dropdown.Item>
								    <Dropdown.Item eventKey="5"> Bounce Email </Dropdown.Item>
								    <Dropdown.Item eventKey="6"> Today&apos;s Date </Dropdown.Item>
								    <Dropdown.Item eventKey="7"> Web Version </Dropdown.Item>
								    <Dropdown.Item eventKey="8"> List Name </Dropdown.Item>
								    <Dropdown.Item eventKey="9"> List ID </Dropdown.Item>
								    <Dropdown.Item eventKey="10"> Message ID </Dropdown.Item>
								    <Dropdown.Item eventKey="11"> Campaign ID </Dropdown.Item>
								    <Dropdown.Item eventKey="12"> Sending Domain </Dropdown.Item>
								    <Dropdown.Item eventKey="13"> Confirmation Link </Dropdown.Item>
								    <Dropdown.Item eventKey="14"> Unsubscribe Link </Dropdown.Item>
								  </DropdownButton>
								</ButtonGroup>
								<ButtonGroup>
								  <DropdownButton as={ButtonGroup} title="Additional Fields" id="additional-fields"  className="btn btn-primary btn-sm">
								    <Dropdown.Item eventKey="1">Contact ID</Dropdown.Item>
								    <Dropdown.Item eventKey="2">Title</Dropdown.Item>
								    <Dropdown.Item eventKey="3">First Name</Dropdown.Item>
								    <Dropdown.Item eventKey="4">Last Name</Dropdown.Item>
								    <Dropdown.Item eventKey="5">Birth Date</Dropdown.Item>
								    <Dropdown.Item eventKey="6">Phone</Dropdown.Item>
								    <Dropdown.Item eventKey="7">Mobile</Dropdown.Item>
								    <Dropdown.Item eventKey="8">Company</Dropdown.Item>
								    <Dropdown.Item eventKey="9">Country</Dropdown.Item>
								    <Dropdown.Item eventKey="10">State</Dropdown.Item>
								    <Dropdown.Item eventKey="11">City</Dropdown.Item>
								    <Dropdown.Item eventKey="12">Zip Code</Dropdown.Item>
								    <Dropdown.Item eventKey="13">Fax</Dropdown.Item>
								  </DropdownButton>
								</ButtonGroup>
								<ButtonGroup>
								  <DropdownButton as={ButtonGroup} title="Spin Tags" id="spin-tagss"  className="btn btn-primary btn-sm">
								    <Dropdown.Item eventKey="1">Sales-Signature</Dropdown.Item>
								    <Dropdown.Item eventKey="2">Sales-Agent-Name</Dropdown.Item>
								    <Dropdown.Item eventKey="3">Mumara-Social-FB</Dropdown.Item>
								    <Dropdown.Item eventKey="4">Mumara-Social-TW</Dropdown.Item>
								    <Dropdown.Item eventKey="5">Mumara-Social-GO</Dropdown.Item>
								    <Dropdown.Item eventKey="6">Mumara-Social-LK</Dropdown.Item>
								  </DropdownButton>
								</ButtonGroup>
								<ButtonGroup>
								  <DropdownButton as={ButtonGroup} title="Dynamic Contents" id="dynamic-tag"  className="btn btn-primary btn-sm">
								    <Dropdown.Item eventKey="1">Sales-Signature</Dropdown.Item>
								    <Dropdown.Item eventKey="2">Sales-Agent-Name</Dropdown.Item>
								    <Dropdown.Item eventKey="3">Mumara-Social-FB</Dropdown.Item>
								    <Dropdown.Item eventKey="4">Mumara-Social-TW</Dropdown.Item>
								    <Dropdown.Item eventKey="5">Mumara-Social-GO</Dropdown.Item>
								    <Dropdown.Item eventKey="6">Mumara-Social-LK</Dropdown.Item>
								  </DropdownButton>
								</ButtonGroup>
								<ButtonGroup>
								  <DropdownButton as={ButtonGroup} title="Copy as Text" id="copy-text"  className="btn btn-primary btn-sm copy-text">
								  </DropdownButton>
								</ButtonGroup>
    </div>;
  }
}


export default CustomVariables;