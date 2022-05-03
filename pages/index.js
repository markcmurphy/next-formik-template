import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

// import ReactDOM from 'react-dom';
import {
  Formik,
  Form,
  FormikProvider,
  useField,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import '@emotion/react';
import { values } from 'lodash';

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

const projectNames = [
  'Abandoned Cart Emails API',
  'Customer Segmentation Phase 1A',
  'Data Solutions API',
  'Multi-Location Inventory API',
  'Order Confirmation Page API',
  'Partner Billing GQL API',
  'Webhooks Admin API',
  'Promotions API',
  'Powered by',
];

const MyMUITextInput = (params) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...params}
        onChange={(event, value) => {
          handleChange(event);
          getUsers(event.target.value);
        }}
        // onChange={handleChange}
        margin="normal"
        fullWidth
        label="PM Lead"
        value={values?.pmuid}
      />
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  const [createdLink, setCreatedLink] = useState('none Yet');
  const [res, setRes] = useState([]);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [linkDisplay, setLinkDisplay] = useState(false);
  let [loading, setLoading] = useState(false);
  const [resultDisplay, setResultDisplay] = useState('');

  const ref = useRef(null);

  const getUsers = async (values) => {
    console.log('🚀 ~ file: index.js ~ line 96 ~ getUsers ~ values', values);
    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    }
    const result = await postData('/api/names', values);

    setUsers(result.users);
  };

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <>
      <h1>Beta Access Request Gen!</h1>
      <Formik
        innerRef={ref}
        initialValues={{
          // username: '',
          // firstName: '',
          // lastName: '',
          // email: '',
          // cityId: '',
          projectName: null,
          // acceptedTerms: false, // added for our checkbox
          pmuid: '', // added for our select
        }}
        // validationSchema={Yup.object({
        //pmuid: Yup.string()
        //     .max(15, 'Must be 15 characters or less')
        //     .required('Required'),
        // projectName: Yup.string()
        //     .max(15, 'Must be 15 characters or less')
        // .required('Required'),
        // lastName: Yup.string()
        //   .max(20, 'Must be 20 characters or less')
        //   .required('Required'),
        // email: Yup.string()
        //   .email('Invalid email addresss`')
        //   .required('Required'),
        // acceptedTerms: Yup.boolean()
        //   .required('Required')
        //   .oneOf([true], 'You must accept the terms and conditions.'),
        // pmuid: Yup.string()
        // specify the set of valid values for job type
        // @see http://bit.ly/yup-mixed-oneOf
        // .oneOf(
        //   ['designer', 'development', 'product', 'other'],
        //   'Invalid Job Type'
        // )
        // .required('Required'),
        // })}
        onSubmit={async (values, { setSubmitting }) => {
          setRes([]);
          setName('');
          // setLinkDisplay(false);

          // async function postData(url = '', data = {}) {
          //   const response = await fetch(url, {
          //     method: 'POST',
          //     body: JSON.stringify(data),
          //   });
          //   return response.json();
          // }
          // const result = await postData('/api/pmuid', values);
          // // result.length
          //   ? setResultDisplay('Results:')
          //   : setResultDisplay('No results found!');

          setRes(values.pmuid);
          setName(values.projectName);

          setLinkDisplay(!linkDisplay);
          // setLoading(!loading);

          setSubmitting(false);
        }}
      >
        {({ handleChange, values, setFieldValue, resetForm }) => (
          <Form>
            {/* <MyTextInput
              label="PM Email"
              name="email"
              type="email"
              placeholder="Enter PM User Email"
            /> */}
            <Autocomplete
              id="pmuid"
              name="pmuid"
              options={users}
              // groupBy={(option) => option.state}
              getOptionLabel={(option) => option.displayName}
              label="PM Lead"
              style={{ width: 300 }}
              onChange={(event, value) => {
                console.log(
                  '🚀 ~ file: index.js ~ line 178 ~ onSubmit={ ~ value',
                  value
                );
                // getUsers(event.target.value);
                setFieldValue('pmuid', value?.accountId);
                setRes(value?.accountId);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(event, value) => {
                    handleChange(event);
                    getUsers(event.target.value);
                  }}
                  // onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  helperText="Begin typing to populate names"
                  label="PM Lead"
                  value={values.pmuid}
                />
              )}
            />
            <Autocomplete
              id="projectName"
              name="projectName"
              options={projectNames}
              // groupBy={(option) => option.state}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              onChange={(event, value) => {
                console.log(
                  '🚀 ~ file: index.js ~ line 276 ~ SignupForm ~ value',
                  value
                );
                setFieldValue('projectName', value);
                setName(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  required
                  label="Project Name"
                  value={values.projectName}
                />
              )}
            />
            {/* <MySelect label="PM" name="pmuid">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect> */}
            {/* <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox> */}
            <br />
            <button type="submit">Submit</button>
            <button
              type="reset"
              onClick={() => {
                setFieldValue('projectName', null);
                setFieldValue('pmuid', '');
                setName('');
                setRes([]);
              }}
            >
              {' '}
              Reset
            </button>
          </Form>
        )}
      </Formik>
      <div style={{ display: linkDisplay ? 'block' : 'none' }}>
        <a
          target="_blank"
          href={`https://bigcommercecloud.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10044&issuetype=10002&priority=3&projectkey=DEVDOCS&customfield10014=DEVDOCS-3603&description=*Link%20to%20request%20in%20%5B%23beta-access-requests%7Chttps%3A%2F%2Fbigcommerce.slack.com%2Farchives%2FC035BREBJ65%5D%3A*%0A*%20%0A%0A*Email%20address(es)%20of%20requesting%20users%3A*%0A*%20%0A&summary=Access%20Request%20-%20${name}&customfield_10062=${res}`}
          rel="noopener noreferrer"
        >
          Link
        </a>
      </div>
      {/* {JSON.stringify(ref.current?.values)}      */}
      <div>{`PM Jira Account ID: ${res}`}</div>
      <div>{`Beta Project Name: ${name}`}</div>
      {/* {console.log(ref.current?.values.pmuid)} */}
      {/* {console.log(ref.current?.values.projectName)}  */}
    </>
  );
};

export default SignupForm;
