/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";

export function DropdownTlds() {

  const history = useHistory();  
  function addMailbox() {
    history.push("/mailbox/create");
  }
    return <>
        {/*begin::Navigation*/}
        <ul className="navi navi-hover py-5">
            <li className="navi-item">
                <a href="/mailbox/tld/create" className="navi-link">
                    <span className="navi-icon"><i className="fa fa-edit"></i></span>
                    <span className="navi-text">Edit</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link" onClick={addMailbox}>
                    <span className="navi-icon"><i className="fa fa-plus"></i></span>
                    <span className="navi-text">Add a Milbox</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link">
                    <span className="navi-icon"><i className="fa fa-file-upload"></i></span>
                    <span className="navi-text">Import Mailbox</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link">
                    <span className="navi-icon"><i className="fa fa-question-circle"></i></span>
                    <span className="navi-text">Test all Mailboxes</span>
                </a>
            </li>
            <li className="navi-item">
                <a href="#" className="navi-link">
                    <span className="navi-icon"><i className="fa fa-trash"></i></span>
                    <span className="navi-text">Delete All Mailboxes</span>
                </a>
            </li>
        </ul>
        {/*end::Navigation*/}

    </>
}
