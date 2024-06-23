import React from "react";
import classes from "./style.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const MembershipForm = ({ isOpen, onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      membershipName: values.membershipName,
      membershipPrice: values.membershipPrice,
      membershipBenefits: values.membershipBenefits.map((benefit, index) => ({
        id: index + 1,
        desc: benefit.desc,
        discount: parseFloat(benefit.discount),
      })),
    };
    await onSubmit(formData);
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    membershipName: Yup.string().required("Membership Name is required"),
    membershipPrice: Yup.number()
      .typeError("Membership Price must be a number")
      .required("Membership Price is required"),
    membershipBenefits: Yup.array()
      .of(
        Yup.object().shape({
          desc: Yup.string().required("Required"),
          discount: Yup.number()
            .typeError("Discount must be a number")
            .required("Required"),
        })
      )
      .min(1, "Membership Benefits must contain at least 1 element")
      .required("Membership Benefits should not be empty"),
  });

  if (!isOpen) return null;

  return (
    <div className={classes.formContainer}>
      <h1>Create Membership</h1>
      <Formik
        initialValues={{
          membershipName: "",
          membershipPrice: "",
          membershipBenefits: [{ desc: "", discount: "" }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form>
              <div>
                <label htmlFor="membershipName">Enter Name</label>
                <ErrorMessage
                  name="membershipName"
                  component="div"
                  className={classes.error}
                />
                <Field type="text" name="membershipName" />
              </div>

              <div>
                <label htmlFor="membershipPrice">Enter Price</label>
                <ErrorMessage
                  name="membershipPrice"
                  component="div"
                  className={classes.error}
                />
                <Field type="number" name="membershipPrice" />
              </div>

              <div className={classes.benefitFields}>
                <FieldArray name="membershipBenefits">
                  {({ push, remove, form }) => (
                    <div>
                      {form.values.membershipBenefits.map((benefit, index) => (
                        <div className={classes.benefitField} key={index}>
                          <div>
                            <label>Discount</label>
                            <ErrorMessage
                              name={`membershipBenefits.${index}.discount`}
                              component="div"
                              className={classes.error}
                            />
                            <Field
                              type="text"
                              name={`membershipBenefits.${index}.discount`}
                            />
                          </div>
                          <div>
                            <label>Benefit Description</label>
                            <ErrorMessage
                              name={`membershipBenefits.${index}.desc`}
                              component="div"
                              className={classes.error}
                            />
                            <Field
                              type="text"
                              name={`membershipBenefits.${index}.desc`}
                            />
                          </div>

                          <button
                            className={classes.removeBtn}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <div className={classes.buttonContainer}>
                        <button
                          className={classes.addMoreBtn}
                          type="button"
                          onClick={() => push({ desc: "", discount: "" })}
                        >
                          Add More
                        </button>
                        <button type="submit" disabled={isSubmitting}>
                          Create Membership
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MembershipForm;
