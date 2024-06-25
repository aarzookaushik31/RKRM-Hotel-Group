import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./style.module.css";
import * as Yup from "yup";

const EditUserForm = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <div className={classes.userEditFormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Email</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Address</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
            <button
              className={classes.cancelBtn}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserForm;
