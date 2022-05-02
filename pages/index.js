import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// import ReactDOM from 'react-dom';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import '@emotion/react';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  const [createdLink, setCreatedLink] = useState('none Yet');
  const [res, setRes] = useState([]);
  const [resultDisplay, setResultDisplay] = useState('');
  return (
    <>
      <h1>Beta Access Request Gen!</h1>
      <Formik
        initialValues={{
          // firstName: '',
          // lastName: '',
          email: '',
          // acceptedTerms: false, // added for our checkbox
          // pmuid: '', // added for our select
        }}
        validationSchema={Yup.object({
          // firstName: Yup.string()
          //   .max(15, 'Must be 15 characters or less')
          //   .required('Required'),
          // lastName: Yup.string()
          //   .max(20, 'Must be 20 characters or less')
          //   .required('Required'),
          email: Yup.string()
            .email('Invalid email addresss`')
            .required('Required'),
          // acceptedTerms: Yup.boolean()
          //   .required('Required')
          //   .oneOf([true], 'You must accept the terms and conditions.'),
          // pmuid: Yup.string()
          //   // specify the set of valid values for job type
          //   // @see http://bit.ly/yup-mixed-oneOf
          //   .oneOf(
          //     ['designer', 'development', 'product', 'other'],
          //     'Invalid Job Type'
          //   )
          //   .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          async function postData(url = '', data = {}) {
            const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(data),
            });
            return response.json();
          }
          const result = await postData('/api/pmuid', values);
          result.length
            ? setResultDisplay('Results:')
            : setResultDisplay('No results found!');
          console.log(
            '🚀 ~ file: index.js ~ line 126 ~ onSubmit={ ~ result',
            result
          );
          setRes(result);
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="PM Email"
            name="email"
            type="email"
            placeholder="Enter PM User Email"
          />
          <MySelect label="PM" name="pmuid">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          {/* <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox> */}
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {/* <div>{resultDisplay}</div> */}
      <div>
        <Link
          href={`https://bigcommercecloud.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10044&issuetype=10002&priority=3&projectkey=DEVDOCS&customfield10014=DEVDOCS-3603&description=*Link%20to%20request%20in%20%5B%23beta-access-requests%7Chttps%3A%2F%2Fbigcommerce.slack.com%2Farchives%2FC035BREBJ65%5D%3A*%0A*%20%0A%0A*Email%20address(es)%20of%20requesting%20users%3A*%0A*%20%0A&summary=Access%20Request%20-%20PROJECT-NAME&customfield_10062=${res[0]?.accountId}`}
        >
          Link
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
