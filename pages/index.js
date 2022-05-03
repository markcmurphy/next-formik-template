import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState([
  //   {
  //     accountId: '609993665998a60068c149bc',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Murphy - <strong>mark</strong>.murphy@bigcommerce.com',
  //     displayName: 'Mark Murphy',
  //   },
  //   {
  //     accountId: '6244dde92e101c006a8dfd65',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Harnish - <strong>mark</strong>.harnish@bigcommerce.com',
  //     displayName: 'Mark Harnish',
  //   },
  //   {
  //     accountId: '61f899668d9e3c00688e5db0',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Biddle - <strong>mark</strong>.biddle@bigcommerce.com',
  //     displayName: 'Mark Biddle',
  //   },
  //   {
  //     accountId: '5ba27e9522e7212f71bc11c0',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Seung - <strong>mark</strong>.seung@bigcommerce.com',
  //     displayName: 'Mark Seung',
  //   },
  //   {
  //     accountId: '5eb9d4ee7dab3a0bb45a4185',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Rosales - <strong>mark</strong>.rosales@bigcommerce.com',
  //     displayName: 'Mark Rosales',
  //   },
  //   {
  //     accountId: '61e758889d17400069d9a1e0',
  //     accountType: 'atlassian',
  //     html:
  //       'Teresa <strong>Mark</strong>ovits - teresa.<strong>mark</strong>ovits@bigcommerce.com',
  //     displayName: 'Teresa Markovits',
  //   },
  //   {
  //     accountId: '61e74b41b134e8007015ac2c',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong>ou Morkos - <strong>mark</strong>ou.morkos@bigcommerce.com',
  //     displayName: 'Markou Morkos',
  //   },
  //   {
  //     accountId: '70121:65152589-090c-4db4-b535-9c1eb1fa9f96',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Guenther - <strong>mark</strong>.guenther@bigcommerce.com',
  //     displayName: 'Mark Guenther',
  //   },
  //   {
  //     accountId: '557058:82e38835-9be3-4b15-b118-c5f3b6e98236',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Espiritu - <strong>mark</strong>.espiritu@bigcommerce.com',
  //     displayName: 'Mark Espiritu',
  //   },
  //   {
  //     accountId: '6063be02aee24000686da68a',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Cram - <strong>mark</strong>.cram@bigcommerce.com',
  //     displayName: 'Mark Cram',
  //   },
  //   {
  //     accountId: '61e74d41b134e8007015bed0',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong>us Vogel - <strong>mark</strong>us.vogel@bigcommerce.com',
  //     displayName: 'Markus Vogel',
  //   },
  //   {
  //     accountId: '70121:8b5bd17f-910f-4215-b7c0-4052bbec8cca',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Howes - <strong>mark</strong>.howes@bigcommerce.com',
  //     displayName: 'Mark Howes',
  //   },
  //   {
  //     accountId: '61e757aaf0ed04006881500b',
  //     accountType: 'atlassian',
  //     html:
  //       'Leonardo <strong>Mark</strong>enson - leonardo.<strong>mark</strong>enson@bigcommerce.com',
  //     displayName: 'Leonardo Markenson',
  //   },
  //   {
  //     accountId: '61e74d046b1ad90069b37038',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Peake - <strong>mark</strong>.peake@bigcommerce.com',
  //     displayName: 'Mark Peake',
  //   },
  //   {
  //     accountId: '61fc5e038d9e3c00688ffc49',
  //     accountType: 'atlassian',
  //     html:
  //       '<strong>Mark</strong> Huddleston - <strong>mark</strong>.huddleston@bigcommerce.com',
  //     displayName: 'Mark Huddleston',
  //   },
  //   {
  //     accountId: '60b6f33f46e27800688f6375',
  //     accountType: 'app',
  //     html: '<strong>Mark</strong>down Macros for Confluence - ',
  //     displayName: 'Markdown Macros for Confluence',
  //   },
  // ]);
  const [resultDisplay, setResultDisplay] = useState('');

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

  // const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  //   const [field, meta] = useField(props);

  //   // Show inline feedback if EITHER
  //   // - the input is focused AND value is longer than 2 characters
  //   // - or, the has been visited (touched === true)
  //   const [didFocus, setDidFocus] = React.useState(false);
  //   const handleFocus = () => setDidFocus(true);
  //   const showFeedback =
  //     (!!didFocus && field.value.trim().length > 2) || meta.touched;

  //   return (
  //     <div
  //       className={`form-control ${
  //         showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
  //       }`}
  //     >
  //       <div className="flex items-center space-between">
  //         <label htmlFor={props.id}>{label}</label>{' '}
  //         {showFeedback ? (
  //           <div
  //             id={`${props.id}-feedback`}
  //             aria-live="polite"
  //             className="feedback text-sm"
  //           >
  //             {meta.error ? meta.error : '✓'}
  //           </div>
  //         ) : null}
  //       </div>
  //       <input
  //         {...props}
  //         {...field}
  //         aria-describedby={`${props.id}-feedback ${props.id}-help`}
  //         onFocus={handleFocus}
  //       />
  //       <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
  //         {helpText}
  //       </div>
  //     </div>
  //   );
  // };

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <>
      <h1>Beta Access Request Gen!</h1>
      <Formik
        initialValues={{
          // username: '',
          // firstName: '',
          // lastName: '',
          // email: '',
          // cityId: '',
          // acceptedTerms: false, // added for our checkbox
          pmuid: 'Mark', // added for our select
        }}
        // validationSchema={Yup.object({
        //   pmuid: Yup.string()
        //     .max(15, 'Must be 15 characters or less')
        //     .required('Required'),
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
        //   // specify the set of valid values for job type
        //   // @see http://bit.ly/yup-mixed-oneOf
        //   .oneOf(
        //     ['designer', 'development', 'product', 'other'],
        //     'Invalid Job Type'
        //   )
        //   .required('Required'),
        // })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(
            '🚀 ~ file: index.js ~ line 156 ~ onSubmit={ ~ values',
            values
          );
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
          setSubmitting(false);
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form>
            {/* <TextInputLiveFeedback
              label="Username"
              id="username"
              name="username"
              helpText="Must be 8-20 characters and cannot contain special characters."
              type="text"
            /> */}
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
              // label="Cities"
              style={{ width: 300 }}
              onChange={(event, value) => {
                console.log(
                  '🚀 ~ file: index.js ~ line 178 ~ onSubmit={ ~ value',
                  value
                );
                // getUsers(event.target.value);
                setFieldValue('pmuid', value?.accountId);
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
                  value={values?.pmuid}
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
          </Form>
        )}
      </Formik>
      <div>{resultDisplay}</div>
      <div>
        <Link
          href={`https://bigcommercecloud.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10044&issuetype=10002&priority=3&projectkey=DEVDOCS&customfield10014=DEVDOCS-3603&description=*Link%20to%20request%20in%20%5B%23beta-access-requests%7Chttps%3A%2F%2Fbigcommerce.slack.com%2Farchives%2FC035BREBJ65%5D%3A*%0A*%20%0A%0A*Email%20address(es)%20of%20requesting%20users%3A*%0A*%20%0A&summary=Access%20Request%20-%20PROJECT-NAME&customfield_10062=${res}`}
        >
          Link
        </Link>
      </div>
    </>
  );
};

// export async function getServerSideProps(context) {
//   let myHeaders = new Headers();
//   myHeaders.append(
//     'Authorization',
//     'Basic bWFyay5tdXJwaHlAYmlnY29tbWVyY2UuY29tOlJERk5sQVRNYkhOQmljNWRNZGVWQTE2OQ=='
//   );

//   let requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow',
//   };

//   let name = 'Mark';

//   const res = await fetch(
//     `https://bigcommercecloud.atlassian.net/rest/api/3/users`,
//     requestOptions
//   );

//   const data = await res.json();

//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

export default SignupForm;
