import { Label, Text, Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { filterContacts } from 'redux/contactsSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const filterValue = useSelector(getFilter);
    const onChangeFilterValue = e => {
        dispatch(filterContacts(e.target.value));
    };

    return (
        <Label htmlFor="filter">
            <Text>Find contacts by name</Text>
            <Input
                type="input"
                name="filter"
                value={filterValue}
                onChange={onChangeFilterValue}
            />
        </Label>
    );
};

export default Filter;
