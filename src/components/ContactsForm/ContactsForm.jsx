import PropTypes from 'prop-types';
import { Label, Title, StyledField, Button } from './ContactsForm.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Please enter name'),
  number: Yup.number().required('Please enter number'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactsForm = () => {
  const dispatch = useDispatch();
  const ContactsArray = useSelector(getContacts);

  const formSubmitHandler = (data, { resetForm }) => {
    if (
      ContactsArray.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      Report.warning(`${data.name} is already in contacts.`);
      return;
    }
    dispatch(
      addContact({
        ...data,
      })
    );

    resetForm();
  };

        return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <Label htmlFor="name">
            <Title>Name</Title>
            <StyledField type="text" name="name" />
                <ErrorMessage name="name" component="div" />
        </Label>
          <Label htmlFor="number">
            <Title>Number</Title>
            <StyledField type="text" name="number" />
                <ErrorMessage name="number" component="div" />
        </Label>
          <Button type="submit">Add to contacts</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactsForm;

ContactsForm.propType = {
    onSubmit: PropTypes.func.isRequired,
};
