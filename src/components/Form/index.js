import React from "react";
import classes from "./style.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const HotelForm = ({
  isOpen,
  onSubmit,
  initialValues,
  validationSchema,
  fields,
  formTitle,
}) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await onSubmit(values);
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className={classes.formContainer}>
      <h1>{formTitle}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className={classes.error}
                />

                {field.type === "radio" ? (
                  <div className={classes.radioGroup}>
                    {field.options.map((option) => (
                      <div key={option.value} className={classes.radioOption}>
                        <Field
                          type="radio"
                          id={`${field.name}-${option.value}`}
                          name={field.name}
                          value={option.value}
                        />
                        <label
                          htmlFor={`${field.name}-${option.value}`}
                          className={classes.radioLabel}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Field type={field.type} name={field.name} />
                )}
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              {formTitle}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HotelForm;
