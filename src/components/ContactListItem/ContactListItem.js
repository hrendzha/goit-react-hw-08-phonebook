import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';
import { useDeleteContactMutation } from 'services/api';

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

function ContactListItem({ name, number, id }) {
    const [deleteContact, { isLoading: isDeletingContact }] =
        useDeleteContactMutation();

    return (
        <>
            <span>
                {name}: {number}
            </span>
            <button
                className={s.btnDelete}
                type="button"
                onClick={() => deleteContact(id)}
                disabled={isDeletingContact}
            >
                {isDeletingContact ? 'Deleting...' : 'Delete'}
            </button>
        </>
    );
}

export default ContactListItem;
