import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';
import { useDispatch } from 'react-redux';


const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),

            password: Yup.string().min(8, 'At least 8 characters').required('Password is required'), // ✅ تم التصحيح هنا
        }),

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(login({ name: values.name ,email:values.email}));
            alert('Form submitted!');
            resetForm();
            navigate('/');
        }
    });
    return (
        <div>

            <form onSubmit={formik.handleSubmit} className='login-form' >
                <h2>Sign Up</h2>

                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="error">{formik.errors.name}</div>
                )}

                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                )}

                <label htmlFor="password">password:</label>
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                )}
                <div style={{ marginBottom: 15 }}>
                    <Link style={{ color: "black" }}>
                        Forgot Password?
                    </Link>
                </div>

                <div className="btn-wrapper">
                    <button type="submit">SignUp</button>
                </div>
            </form>

        </div>
    )
}

export default SignUp
