import PropTypes from 'prop-types';
import { Form, Label, Title, Input, Button } from './ContactsForm.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const initialValues = {
    name: '',
    number: '',
};

const onChangeName = e => initialValues.name === e.currentTarget.value;
const onChangeNumber = e => initialValues.number === e.currentTarget.value;

const ContactsForm = () => {
        const dispatch = useDispatch();
        const ContactsArray = useSelector(getContacts);

    const formSubmitHandler = (e, data, { resetForm }) => {
        e.preventDefault();
            if (
                ContactsArray.find(
                    contact => contact.name.toLowerCase() === data.name.toLowerCase()
                )
            ) {
                return Report.warning(
                    `${data.name}`,
                    'This user is already in the contact list.',
                    'OK',
                )
            }
            dispatch(
                addContact({
                    ...data,
                })
            );

            resetForm();
        };

        return (
            <Form initialValues={initialValues} onSubmit={formSubmitHandler}>
                <Label>
                    <Title>Name</Title>
                    <Input
                        type="text"
                        name="name"
                        onChange={onChangeName}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </Label>
                <Label>
                    <Title>Number</Title>
                    <Input
                        type="tel"
                        name="number"
                        onChange={onChangeNumber}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </Label>
                <Button type="submit">Add contact</Button>
            </Form>
        );
    }

export default ContactsForm;

ContactsForm.propType = {
    onSubmit: PropTypes.func.isRequired,
};
