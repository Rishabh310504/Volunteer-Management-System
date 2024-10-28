import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  hours: Yup.number().required("Hours are required").positive().integer(),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddVolunteer = ({ onAddVolunteer }) => {
  const handleSubmit = (values, { resetForm }) => {
    const newVolunteer = {
      id: Date.now(), // Unique ID for the volunteer
      name: values.name,
      hours: values.hours,
      startDate: values.startDate,
      endDate: values.endDate,
      phone: values.phone,
      email: values.email,
    };
    onAddVolunteer(newVolunteer);
    resetForm(); // Reset the form after submission
  };

  return (
    <Formik
      initialValues={{ name: '', hours: '', startDate: '', endDate: '', phone: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="mt-4">
        <div>
          <label className="block">Name</label>
          <Field name="name" className="border rounded p-2 w-full" />
          <ErrorMessage name="name" component="div" className="text-red-500" />
        </div>
        <div className="mt-4">
          <label className="block">Hours Volunteered</label>
          <Field name="hours" type="number" className="border rounded p-2 w-full" />
          <ErrorMessage name="hours" component="div" className="text-red-500" />
        </div>
        <div className="mt-4">
          <label className="block">Start Date</label>
          <Field name="startDate" type="date" className="border rounded p-2 w-full" />
          <ErrorMessage name="startDate" component="div" className="text-red-500" />
        </div>
        <div className="mt-4">
          <label className="block">End Date</label>
          <Field name="endDate" type="date" className="border rounded p-2 w-full" />
          <ErrorMessage name="endDate" component="div" className="text-red-500" />
        </div>
        <div className="mt-4">
          <label className="block">Phone</label>
          <Field name="phone" type="tel" className="border rounded p-2 w-full" />
          <ErrorMessage name="phone" component="div" className="text-red-500" />
        </div>
        <div className="mt-4">
          <label className="block">Email</label>
          <Field name="email" type="email" className="border rounded p-2 w-full" />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Add Volunteer
        </button>
      </Form>
    </Formik>
  );
};

export default AddVolunteer;
