import React, { useEffect, useState,useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect,useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {

  const onChange = (value) => {
    console.log("Captcha value:", value);
  }

  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
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
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
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

  const history = useHistory();
  const globalState  = useSelector(state=>state.auth);
  const [disableSubmit,setDisableSubmit] = useState(true);
  const [showMsg, setShowMsg] = useState("hide");
 
  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setShowMsg("hide");

      props.registerUser({
        name:values.fullname,
        email: values.email,
        password:values.password,
        push: history.push
      });
      console.log('Global state has been', globalState)
      setTimeout(() => {
        //console.log('Global state has been', globalState)
        if(globalState.registerStatus == true) {
          //console.log('Global state has been', globalState)
          setShowMsg("show");
          disableLoading();
        } else {
          setSubmitting(false);
          setShowMsg("show");
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        }
      }, 2000);
    },
  });

  return (
    <div className="login-form register-page reset-password login-page login-signin" style={{ display: "block" }}>
      <div id="login-promotion">
        <Link to="/auth/registration">
          <div className="ad">
            <div className="vault-ad-wrapper"></div>
            <h2 className="font-archivo"><span>QR Buzz</span><br /> By Mumara</h2>
            <h4 className="login-subline"><FormattedMessage id="AUTH.REGISTER.TITLE" /><br />Enter your details to create your account</h4>
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
          <Link to="/auth/registration" className="flex-column-auto mt-5">
            <img
                alt="Logo"
                className="max-h-70px register-logo"
                src={toAbsoluteUrl("/media/logos/qr.png")}
            />
          </Link>
        </div>
        {/* end::Head */}
        <form
          id="kt_login_signin_form"
          className="form form-body fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          onSubmit={formik.handleSubmit}
        >
          {/* begin: Alert */}
          {globalState.registerStatus == true ?
            <div className={`mb-10 alert alert-custom alert-light-success alert-dismissible `+ showMsg}>
            <div className="alert-text font-weight-bold">
                Verification email sent. please check your email.
            </div>
          </div>
          : <div className={`mb-10 alert alert-custom alert-light-danger alert-dismissible `+ showMsg}>
              <div className="alert-text font-weight-bold">This email address already registered.</div>
            </div>
          }
          {/* end: Alert */}
          
          {/* begin: Fullname */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Full name"
              type="text"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "fullname"
              )}`}
              name="fullname"
              {...formik.getFieldProps("fullname")}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.fullname}</div>
              </div>
            ) : null}
          </div>
          {/* end: Fullname */}

          {/* begin: Email */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Email"
              type="email"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "email"
              )}`}
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          {/* end: Email */}

          {/* begin: Password */}
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Password"
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.password}</div>
              </div>
            ) : null}
          </div>
          {/* end: Password */}

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

          {/* begin: Terms and Conditions */}
          <div className="form-group">
            <label className="checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                className="m-1"
                {...formik.getFieldProps("acceptTerms")}
              />
              <span />
              <Link to="/terms" target="_blank" className="ml-2" rel="noopener noreferrer">
              I agree the Terms & Conditions
              </Link>
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.acceptTerms}</div>
              </div>
            ) : null}
          </div>
          {/* end: Terms and Conditions */}
          <div className="form-group">
          <ReCAPTCHA
            sitekey="6Le38tIZAAAAAMZ1yhvSvuTIt20_FOb6-VezVwQW"
            onChange={() => setDisableSubmit(false)}
            //onChange={onChange}
          />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.values.acceptTerms || disableSubmit}
              className="new-password-button"
            >
              <span>Submit</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>

            <Link 
              to="/auth/login"
              className="new-password-button cancel"
            >
                Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
