import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

export default function ViewTemplatesTable({ className }) {

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    toast.success("Template imported successfully!", {position: "bottom-center",autoClose: 3000}); 
    //props.handleFile(fileUploaded);
  };

  function removeTemplate() {
		swal({
      title: "Are you sure?",
      text: "Do you want to remove template from list",
      icon: "error",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Template has been removed!", {
          icon: "success",
          buttons: "Close",
        });
      }
    });
	}

  return ( <>
      <img src="/media/bg/03.png" />
      <div className={`card card-custom col-md-12 hide ${className}`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">My Templates List</span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 100+ Templates added</span>
          </h3>
          {/* <div className="card-toolbar">
            <Button className="btn btn-success font-weight-bolder font-size-sm mr-3" onClick={handleClick}>Import Template</Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{display: 'none'}}
            />
          </div> */}
        </div>
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{minWidth: "250px"}}><span className="text-dark-75">Name</span></th>
                  <th style={{minWidth: "100px"}}>Group</th>
                  <th style={{minWidth: "100px"}}>Subject</th>
                  <th style={{minWidth: "100px"}}>Imported On</th>
                  <th style={{minWidth: "130px"}}>Imported</th>
                  <th style={{minWidth: "80px"}}/>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td className="pl-0 py-8">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-4">
                          <span className="symbol-label bg-white">
                            <img src={toAbsoluteUrl("/media/template/1.jpg")} alt="Template" style={{width: "30px"}}/>
                          </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Summer Collection</a>
                        <span className="text-muted font-weight-bold d-block">Mumara Template 37</span>
                      </div>
                    </div>
                  </td>
                  <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                       Holiday
                      </span>
                    <span className="text-muted font-weight-bold">
                        Campaign Group
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Buy 1 Get 1
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Aug 29, 2020
                      </span>
                  </td>
                  <td>
                    <img src={toAbsoluteUrl("/media/logos/stars.png")} alt="image" style={{width: "5.5rem"}}/>
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                        Imported: 426
                      </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail-notification.svg")} />
                        </span>
                    </a>
                    <button onClick={removeTemplate} className="btn btn-icon btn-light btn-hover-danger btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Eraser.svg")} />
                        </span>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-0">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label bg-white">
                          <img src={toAbsoluteUrl("/media/template/2.jpg")} alt="Template" style={{width: "30px"}}/>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Good Friday Promo</a>
                        <span className="text-muted font-weight-bold d-block">Mumara Template 59</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Promo
                    </span>
                    <span className="text-muted font-weight-bold">
                      Campaign Group
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Friday Gifts
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Aug 21, 2020
                    </span>
                  </td>
                  <td>
                    <img src={toAbsoluteUrl("/media/logos/stars.png")} alt="image" style={{width: "5.5rem"}}/>
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Imported: 823
                    </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail-notification.svg")} />
                        </span>
                    </a>
                    <button onClick={removeTemplate} className="btn btn-icon btn-light btn-hover-danger btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Eraser.svg")} />
                        </span>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-8">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label bg-white">
                          <img src={toAbsoluteUrl("/media/template/3.jpg")} alt="Template" style={{width: "30px"}}/>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                          Quaid Anniversary
                        </a>
                        <span className="text-muted font-weight-bold d-block">Mumara Template 93</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Discount Sale
                    </span>
                    <span className="text-muted font-weight-bold">
                      Campaign Group
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      December Promo
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Aug 18, 2020
                    </span>
                  </td>
                  <td>
                    <img src={toAbsoluteUrl("/media/logos/stars.png")} alt="image" style={{width: "5.5rem"}}/>
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Imported: 1432
                    </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail-notification.svg")} />
                        </span>
                    </a>
                    <button onClick={removeTemplate} className="btn btn-icon btn-light btn-hover-danger btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Eraser.svg")} />
                        </span>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-0 ">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label bg-white">
                          <img src={toAbsoluteUrl("/media/template/4.jpg")} alt="Template" style={{width: "30px"}}/>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg">
                          Independence Sale
                        </a>
                        <span className="text-muted font-weight-bold d-block">Mumara Template 21</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left pr-0">
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Flat Sale
                    </span>
                    <span className="text-muted font-weight-bold">
                      Campaign Group
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      14 August
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Aug 13, 2020
                    </span>
                  </td>
                  <td>
                    <img src={toAbsoluteUrl("/media/logos/stars.png")} alt="image" style={{width: "5.5rem"}}/>
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Imported: 143
                    </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Mail-notification.svg")} />
                        </span>
                    </a>
                    <button onClick={removeTemplate} className="btn btn-icon btn-light btn-hover-danger btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Eraser.svg")} />
                        </span>
                    </button>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>  
  );
}
