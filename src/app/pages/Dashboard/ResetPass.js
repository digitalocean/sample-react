import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage} from "react-intl";
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as auth from "../../modules/Auth/_redux/authRedux";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../../../_metronic/_assets/css/Profile.scss';
import BlockUI from '../Component/BlockUI';

function ResetPass(props) {
  
    const {user} = useSelector(state => state.auth);
    const globalState  = useSelector(state=>state.auth);

    const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            }
    }));
    const classes = useStyles();

    const [initialValues, setInitialValues] = useState({ 
        password:"",
        new_password: "",
        confirm_password: ""
    });

  
    const [values, setValues] = React.useState({
        password:"",
        new_password: "",
        confirm_password: ""
    });

    const [state, setState] = useState({
        password:"",
        new_password: "",
        confirm_password: ""
    });

    const history = useHistory();
  
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        setState({ ...state, [name]: event.target.value });
    };
    function goBack() {
        history.goBack();
    }

    const [loading, setLoading] = useState(false);

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

    const ProfileSchema = Yup.object().shape({
        password: Yup.string()
        .min(6, "Minimum 6 symbols")
        .required("Enter Current Password"),
        new_password: Yup.string()
        .min(6, "Minimum 6 symbols")
        .required("Enter New Password"),
        confirm_password: Yup.string()
        .required("Confirm New Password")
        .when("new_password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
            [Yup.ref("new_password")],
            "Password and Confirm Password didn't match"
            ),
        }),
	}); 
  
    const formik = useFormik({
        initialValues, validationSchema: ProfileSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {

            props.resetUserPassword({
                user_id:user.id,
                password: values.password,
                new_password:values.new_password
            });
                
            setTimeout(() => {
                console.log(globalState)
                console.log(globalState.set_reset_password)
                if(globalState.set_reset_password == true) {
                    swal({
                        title: "Reset Password",
                        text: "Password changed successfully!",
                        icon: "success",
                        button: null,
                        timer: 2500
                    });
                } else {
                    swal({
                        title: "Reset Password",
                        text: "Current password does not match",
                        icon: "error",
                        button: null,
                        timer: 2500
                    });
                }
            }, 3000);
        },
    });

 
  return <>
    <div className="row profilePage">
      {
        globalState.is_loading == false ? 
        <></>
        :<BlockUI />
      }
        <div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
            <div className="alert-text">
                <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Address-card.svg")}/>
                </span> 
                <span>
                    <FormattedMessage id="PAGE.RESETPASSWORD.DESC" />
                </span>
                <span className="svg-icon menu-icon goBack" onClick={goBack}>
                    <i className="fa fa-long-arrow-alt-left"></i>
                </span>
            </div>
        </div>

        <div className="card card-custom card-stretch col-md-12">
			
          <div className="card-header py-3">
            <div className="card-title align-items-start flex-column">
              <h3 className="card-label font-weight-bolder text-dark"><FormattedMessage id="SIDE.MENU.RESETPASSWORD" /></h3>
                        <span className="text-muted font-weight-bold font-size-sm mt-1">Update your Password below</span>
                    </div>
            <div className="card-toolbar">
            </div>
          </div>

            <div className="card-body">
               
                <form 
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  className="form-offer form fv-plugins-bootstrap fv-plugins-framework"
                >
                    {formik.status ? (
                        <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Current Password</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="password"
                                type="password"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "password"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("password")}
                                value={values.name}
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.password}</div>
                              </div>
                            ) : null}
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                Enter your old Password
                            </p>
                        </div>
                    </div>

                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">New Password</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="new_password"
                                type="password"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "new_password"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("new_password")}
                                value={values.name}
                                {...formik.getFieldProps("new_password")}
                            />
                            {formik.touched.new_password && formik.errors.new_password ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.new_password}</div>
                              </div>
                            ) : null}
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                Enter your New Password
                            </p>
                        </div>
                    </div>

                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Confirm Password</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="confirm_password"
                                type="password"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "confirm_password"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("confirm_password")}
                                value={values.name}
                                {...formik.getFieldProps("confirm_password")}
                            />
                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.confirm_password}</div>
                              </div>
                            ) : null}
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                Enter your New Password
                            </p>
                        </div>
                    </div>
                    
                    <div className="fieldBlk form-group row class-submit">
                      <label className="col-xl-3 col-lg-3 col-form-label"></label>
                      <div className="col-xl-6 col-lg-6">
                          <Button 
                            type="submit"
                            //disabled={formik.isSubmitting}
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                          >
                              Update 
                              {loading && <span className="ml-3 spinner spinner-white"></span>}
                          </Button>
                          <Button variant="contained" className={classes.button} onClick={goBack}>
                              Cancel
                          </Button>
                      </div>
			              </div>
              </form>
                
            </div>

		</div>

    </div>
  </>;
}

export default connect(null, auth.actions)(ResetPass);