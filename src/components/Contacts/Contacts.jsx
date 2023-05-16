import PropTypes from 'prop-types';
import { FaTrash, FaUserAlt } from 'react-icons/fa';
import { ContactsContainer, Icon, Button } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
    const dispatch = useDispatch();
    const ContactsArray = useSelector(getContacts);
    const filterValue = useSelector(getFilter);

    const filteredContacts = () => {
        if (filterValue.toLowerCase() === '') return ContactsArray;
        return ContactsArray.filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    };

    return (
        <ContactsContainer>
            {filteredContacts()?.map(contact => {
                return (
                    <li key={contact.id}>
                        <Icon>
                            <FaUserAlt />
                        </Icon>
                        {contact.name} : {contact.number}
                        <Button type="button" onClick={() => dispatch(deleteContact(contact.id))}>
                            <FaTrash />
                        </Button>
                    </li>
                );
            })}
        </ContactsContainer>
    );
};

export default ContactList;

ContactList.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};
