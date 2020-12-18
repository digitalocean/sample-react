import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl, FormattedMessage } from "react-intl";
import { connect,useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";

const initialValues = {
  password: "",
  changepassword: ""
};

function ResetPassword(props) {
  const location = useLocation().pathname;
  var str = location.toString()
  var token = str.split("/")[3]
  //console.log(token)

  const { intl } = props;
  const history = useHistory();
  const [isRequested, setIsRequested] = useState(false);
  const globalState  = useSelector(state=>state.auth);
  const [showMsg, setShowMsg] = useState("hide");
  const [cancelText, setCancelText] = useState("Login");
  const [loading, setLoading] = useState(false);
  //console.log(user);

  const RestPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema: RestPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      //console.log(values, token)
      enableLoading();
      setShowMsg("hide");
      props.resetPassword({
        token:token,
        password: values.password
      });
      //console.log(globalState.resetMsg)
      setTimeout(() => {
        if(globalState.resetMsg == true) {
            setIsRequested(false);
            setSubmitting(false);
            disableLoading();
            setShowMsg("show");
            setTimeout(() => {
                history.push({
                    pathname: '/auth/login'
                });
            }, 2000);
        }
        else {
            setIsRequested(false);
            setSubmitting(false);
            disableLoading();
            setShowMsg("show");
        }
      }, 2000);
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth/login" />}
      {!isRequested && (
        <div className="login-form reset-password login-page login-forgot" style={{ display: "block" }}>
          <div id="login-promotion">
            <Link to="/">
              <div className="ad">
                <div className="vault-ad-wrapper"></div>
                <h2 className="font-archivo"><span>QR Buzz</span><br /> By Mumara</h2>
                <h4 className="login-subline"><FormattedMessage id="AUTH.RESET.TITLE" /><br /><FormattedMessage id="AUTH.RESET.DESC" /></h4>
                <div className="robot-hub-2">
                  <div className="block block-1"></div>
                  <div className="block block-2"></div>
                  <img src="/media/images/portal.png" className="portal" />
                  <div className="robot-wrapper ms500">
                    <img src="/media/images/robot.png" className="robot" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="login-wrapper">
            {/* begin::Head */}
            <div id="register-header" className="logo-login">
              <Link to="/" className="flex-column-auto mt-5">
                <img
                    alt="Logo"
                    className="max-h-70px register-logo"
                    src={toAbsoluteUrl("/media/logos/qr.png")}
                />
              </Link>
            </div>
            {/* end::Head */}
            {/* globalState.forgotMsg == true ? "true" : "false" */}
            <form
              onSubmit={formik.handleSubmit}
              className="reset-pass form form-body fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
            >
                {globalState.resetMsg == false ?
                    <div className={`mb-10 alert alert-custom alert-light-danger alert-dismissible `+ showMsg}>
                        <div className="alert-text font-weight-bold">
                            Verification Token missmatch or expired
                        </div>
                    </div>
                : <div className={`mb-10 alert alert-custom alert-light-success alert-dismissible `+ showMsg}>
                    <div className="alert-text font-weight-bold">
                        Your Password is successfuly updated
                    </div>
                 </div>
                }
                <div className="form-group fv-plugins-icon-container mb-15">
                    <input
                    type="password"
                    placeholder="New Password"
                    className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                        "password"
                    )}`}
                    name="password"
                    {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.email}</div>
                    </div>
                    ) : null}
                </div>
                {/* begin: Confirm Password */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                    placeholder="Confirm Password"
                    type="password"
                    className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                        "changepassword"
                    )}`}
                    name="changepassword"
                    {...formik.getFieldProps("changepassword")}
                    />
                    {formik.touched.changepassword && formik.errors.changepassword ? (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                        {formik.errors.changepassword}
                        </div>
                    </div>
                    ) : null}
                </div>
                {/* end: Confirm Password */}
              <div className="form-group">
                <button
                  id="kt_login_forgot_submit"
                  type="submit"
                  className="new-password-button"
                  disabled={formik.isSubmitting}
                >
                  <span>Reset</span> 
                  {loading && <span className="ml-3 spinner spinner-white"></span>}
                </button>
                <Link to="/auth/login"
                  id="kt_login_forgot_cancel"
                  className="new-password-button cancel"
                >
                    {cancelText}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ResetPassword));
