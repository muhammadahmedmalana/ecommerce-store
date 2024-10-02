import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // Handle registration logic (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field 
                  name="name" 
                  type="text" 
                  placeholder="Name" 
                  className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="name"
                />
                <ErrorMessage name="name" component="div" className="text-red-600" />
              </div>
              <div>
                <Field 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>
              <div>
                <Field 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="new-password"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />
              </div>
              <div>
                <Field 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirm Password" 
                  className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="new-password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
