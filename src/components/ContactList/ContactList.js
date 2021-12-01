import { memo } from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import { useFetchContactsQuery } from 'services/contacts-api';
import filterContacts from 'js/filterContacts';
import s from './ContactList.module.css';

ContactList.propTypes = {
    filter: PropTypes.string.isRequired,
};

function ContactList({ filter }) {
    const { data: contacts, isFetching } = useFetchContactsQuery();

    const visibleContacts = filterContacts(contacts, filter);

    const showContacts = !isFetching && visibleContacts.length > 0;
    const showIfListEmpty =
        visibleContacts.length === 0 && !isFetching && !filter;
    const showIfNoResults =
        visibleContacts.length === 0 && !isFetching && filter;

    return (
        <>
            {isFetching && <p>Loading contacts ...</p>}
            {showContacts && (
                <ul>
                    {visibleContacts.map(({ id, name, number }) => (
                        <li className={s.listItem} key={id}>
                            <ContactListItem
                                name={name}
                                number={number}
                                id={id}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {showIfListEmpty && <h2>Contact list empty</h2>}
            {showIfNoResults && <h2>No results</h2>}
        </>
    );
}

export default memo(ContactList);
