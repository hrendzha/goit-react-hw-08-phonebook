import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import ContactsIcon from '@mui/icons-material/Contacts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'services/api';
import CircularLoader from 'components/CircularLoader';
import { showAlert } from 'redux/alert/alertSlice';
import EditableContactItem from 'components/EditableContactItem';

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function ContactListItem({ name, number, id }) {
  const [isEditing, setIsEditing] = useState(false);

  const [deleteContact, { isLoading: isDeletingContact }] =
    useDeleteContactMutation();
  const [updateContact, { isLoading: isUpdatingContact }] =
    useUpdateContactMutation();

  const dispatch = useDispatch();

  const handleContactDelete = async () => {
    try {
      await deleteContact(id).unwrap();
      dispatch(
        showAlert({
          isOpen: true,
          message: `${name} has been deleted`,
          type: 'success',
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactUpdate = async updatedData => {
    if (updatedData.name === name && updatedData.number === number) {
      setIsEditing(false);
      return;
    }

    try {
      await updateContact({ id, ...updatedData }).unwrap();
      dispatch(
        showAlert({
          isOpen: true,
          message: `${name} has been updated`,
          type: 'success',
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <EditableContactItem
      initialName={name}
      initialNumber={number}
      onUpdate={handleContactUpdate}
      onCancel={() => setIsEditing(false)}
      isUpdating={isUpdatingContact}
    />
  ) : (
    <ListItem
      secondaryAction={
        <>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit contact"
              onClick={() => setIsEditing(true)}
              disabled={isDeletingContact}
            >
              <EditIcon />
              {isDeletingContact && (
                <CircularLoader size={20} sx={{ ml: '-10px', mt: '-10px' }} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label="delete contact"
              onClick={handleContactDelete}
              disabled={isDeletingContact}
            >
              <DeleteIcon />
              {isDeletingContact && (
                <CircularLoader size={20} sx={{ ml: '-10px', mt: '-10px' }} />
              )}
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <ContactsIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={name} secondary={number} />
    </ListItem>
  );
}

export default ContactListItem;
