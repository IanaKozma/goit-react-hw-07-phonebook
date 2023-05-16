import { Container, Title, TitleСolor, Subtitle } from './App.styled';
import ContactList from './Contacts/Contacts';
import Filter from './Filter/Filter';
import ContactsForm from './ContactsForm/ContactsForm';
import Loader from './Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import {  getError, getLoader } from 'redux/selectors';

export default function App() {
  const isLoading = useSelector(getLoader);
  const isError = useSelector(getError)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Title>
        Phone<TitleСolor>book</TitleСolor>
      </Title>
      <ContactsForm />
      <Subtitle>Contacts</Subtitle>
      <Filter />
      {isError && <p>{isError}</p>}
      {isLoading && <Loader/>}
      {!isLoading && <ContactList />}
    </Container>
  );
}
