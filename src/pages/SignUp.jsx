
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import '../Style/SignUp.css'; // <-- الاستايل هنا

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone_number: '',
            second_phone_number: '',
            password: '',
            confirmPassword: '',
            address: {
                city: '',
                district: '',
                street_address: '',
            },
        },

        validationSchema: Yup.object({
            fname: Yup.string().max(255).required('First name is required'),
            lname: Yup.string().max(255).required('Last name is required'),
            email: Yup.string().email('Invalid email').max(255).required('Email is required'),
            phone_number: Yup.string()
                .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
                .max(15)
                .required('Phone number is required'),
            second_phone_number: Yup.string()
                .matches(/^\+?[0-9]{7,15}$/, 'Invalid second phone')
                .max(15)
                .nullable(),
            password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm your password'),
            address: Yup.object({
                city: Yup.string().max(255).required('City is required'),
                district: Yup.string().max(255).nullable(),
                street_address: Yup.string().max(255).required('Street address is required'),
            }),
        }),

        //     onSubmit: (values, { resetForm }) => {
        //         console.log(values);
        //         dispatch(login({ name: `${values.fname} ${values.lname}`, email: values.email }));
        //         alert('Form submitted!');
        //         resetForm();
        //         navigate('/');
        //     },
        // });

        onSubmit: (values, { resetForm }) => {
            dispatch(login({ name: `${values.fname} ${values.lname}`, email: values.email }));
            localStorage.setItem('userAddress', JSON.stringify(values));
            navigate('/addresses'); // ⬅️ نروح على صفحة العناوين
        }
    });

    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h2>Sign Up</h2>

                {/* Full Name */}
                <div className="form-row two-columns">
                    <div>
                        <label htmlFor="fname">First Name:</label>
                        <input id="fname" type="text" {...formik.getFieldProps('fname')} />
                        {formik.touched.fname && formik.errors.fname && <div className="error">{formik.errors.fname}</div>}
                    </div>

                    <div>
                        <label htmlFor="lname">Last Name:</label>
                        <input id="lname" type="text" {...formik.getFieldProps('lname')} />
                        {formik.touched.lname && formik.errors.lname && <div className="error">{formik.errors.lname}</div>}
                    </div>
                </div>

                {/* Email */}
                <div className="form-row">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </div>

                {/* Phone Numbers */}
                <div className="form-row two-columns">
                    <div>
                        <label htmlFor="phone_number">Phone Number:</label>
                        <input id="phone_number" type="text" {...formik.getFieldProps('phone_number')} />
                        {formik.touched.phone_number && formik.errors.phone_number && (
                            <div className="error">{formik.errors.phone_number}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="second_phone_number">Second Phone (optional):</label>
                        <input id="second_phone_number" type="text" {...formik.getFieldProps('second_phone_number')} />
                        {formik.touched.second_phone_number && formik.errors.second_phone_number && (
                            <div className="error">{formik.errors.second_phone_number}</div>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className="form-row">
                    <label htmlFor="address.city">City:</label>
                    <input id="address.city" type="text" {...formik.getFieldProps('address.city')} />
                    {formik.touched.address?.city && formik.errors.address?.city && (
                        <div className="error">{formik.errors.address.city}</div>
                    )}
                </div>

                <div className="form-row two-columns">
                    <div>
                        <label htmlFor="address.district">District (optional):</label>
                        <input id="address.district" type="text" {...formik.getFieldProps('address.district')} />
                        {formik.touched.address?.district && formik.errors.address?.district && (
                            <div className="error">{formik.errors.address.district}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="address.street_address">Street Address:</label>
                        <input id="address.street_address" type="text" {...formik.getFieldProps('address.street_address')} />
                        {formik.touched.address?.street_address && formik.errors.address?.street_address && (
                            <div className="error">{formik.errors.address.street_address}</div>
                        )}
                    </div>
                </div>

                {/* Passwords */}
                <div className="form-row two-columns">
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password && (
                            <div className="error">{formik.errors.password}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input id="confirmPassword" type="password" {...formik.getFieldProps('confirmPassword')} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="error">{formik.errors.confirmPassword}</div>
                        )}
                    </div>
                </div>

                <div className="form-row" style={{ textAlign: 'right' }}>
                    <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>

                <div className="form-row">
                    <button type="submit" className="submit-btn">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
