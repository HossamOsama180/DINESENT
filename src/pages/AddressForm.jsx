// import React from 'react';
// import '../Style/Modal.css';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const AddressForm = ({ onClose, onSave }) => {
//     const formik = useFormik({
//         initialValues: {
//             fname: '',
//             lname: '',
//             phone_number: '',
//             second_phone_number: '',
//             address: {
//                 city: '',
//                 district: '',
//                 street_address: '',
//             }
//         },
//         validationSchema: Yup.object({
//             fname: Yup.string().required('Required'),
//             lname: Yup.string().required('Required'),
//             phone_number: Yup.string()
//                 .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
//                 .required('Required'),
//             second_phone_number: Yup.string().matches(/^\+?[0-9]{7,15}$/, 'Invalid phone'),
//             address: Yup.object({
//                 city: Yup.string().required('Required'),
//                 district: Yup.string(),
//                 street_address: Yup.string().required('Required'),
//             }),
//         }),
//         onSubmit: (values) => {
//             onSave(values);
//         }
//     });

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h3>Add New Address</h3>
//                 <form onSubmit={formik.handleSubmit} className="modal-form">
//                     <div className="row">
//                         <label htmlFor="fname">First Name</label>
//                         <input id="fname" type="text" {...formik.getFieldProps('fname')} />
//                         {formik.touched.fname && formik.errors.fname && <div className="error">{formik.errors.fname}</div>}
//                     </div>

//                     <div className="row">
//                         <label htmlFor="lname">Last Name</label>
//                         <input id="lname" type="text" {...formik.getFieldProps('lname')} />
//                         {formik.touched.lname && formik.errors.lname && <div className="error">{formik.errors.lname}</div>}
//                     </div>

//                     <div className="row">
//                         <label htmlFor="phone_number">Phone Number</label>
//                         <input id="phone_number" type="text" {...formik.getFieldProps('phone_number')} />
//                         {formik.touched.phone_number && formik.errors.phone_number && <div className="error">{formik.errors.phone_number}</div>}
//                     </div>

//                     <div className="row">
//                         <label htmlFor="second_phone_number">Second Phone</label>
//                         <input id="second_phone_number" type="text" {...formik.getFieldProps('second_phone_number')} />
//                         {formik.touched.second_phone_number && formik.errors.second_phone_number && <div className="error">{formik.errors.second_phone_number}</div>}
//                     </div>

//                     <div className="row">
//                         <label htmlFor="city">City</label>
//                         <input id="city" type="text" {...formik.getFieldProps('address.city')} />
//                         {formik.touched.address?.city && formik.errors.address?.city && <div className="error">{formik.errors.address.city}</div>}
//                     </div>

//                     <div className="row">
//                         <label htmlFor="district">District</label>
//                         <input id="district" type="text" {...formik.getFieldProps('address.district')} />
//                     </div>

//                     <div className="row">
//                         <label htmlFor="street_address">Street Address</label>
//                         <input id="street_address" type="text" {...formik.getFieldProps('address.street_address')} />
//                         {formik.touched.address?.street_address && formik.errors.address?.street_address && <div className="error">{formik.errors.address.street_address}</div>}
//                     </div>

//                     <div className="form-actions">
//                         <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
//                         <button type="submit" className="save-btn">Save</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddressForm;
import React from 'react';
 import '../Style/Modal.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddressForm = ({ onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      phone_number: '',
      second_phone_number: '',
      address: {
        city: '',
        street_address: '',
        floor: ''
      }
    },
    validationSchema: Yup.object({
    //   fname: Yup.string().required('Required'),
    //   lname: Yup.string().required('Required'),
      phone_number: Yup.string()
        .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
        .required('Required'),
      second_phone_number: Yup.string().matches(/^\+?[0-9]{7,15}$/, 'Invalid phone'),
      address: Yup.object({
        city: Yup.string().required('Required'),
        street_address: Yup.string().required('Required'),
        floor: Yup.string()
      }),
    }),
    onSubmit: (values) => {
      onSave(values);
    }
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Address</h3>
        <form onSubmit={formik.handleSubmit} className="modal-form">

       

          {/* Address Detail */}
          <div className="row">
            <label htmlFor="address.city">City</label>
            <select id="address.city" {...formik.getFieldProps('address.city')}>
              <option value="">Select City</option>
              <option value="Cairo">Cairo</option>
              <option value="Giza">Giza</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Mansoura">Mansoura</option>
              <option value="Tanta">Tanta</option>
            </select>
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div className="error">{formik.errors.address.city}</div>
            )}
          </div>

          <div className="row">
            <label htmlFor="address.street_address">District</label>
            <input id="address.street_address" type="text" {...formik.getFieldProps('address.street_address')} />
            {formik.touched.address?.street_address && formik.errors.address?.street_address && (
              <div className="error">{formik.errors.address.street_address}</div>
            )}
          </div>

          <div className="row">
            <label htmlFor="address.floor">Street</label>
            <input id="address.floor" type="text" {...formik.getFieldProps('address.floor')} />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
