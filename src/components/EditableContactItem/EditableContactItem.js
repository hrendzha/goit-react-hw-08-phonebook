import PropTypes from 'prop-types';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  TextField,
  Tooltip,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularLoader from 'components/CircularLoader';
import { addContactFormSchema as updateContactSchema } from 'utils/yupSchemata';

EditableContactItem.propTypes = {
  initialName: PropTypes.string.isRequired,
  initialNumber: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default function EditableContactItem({
  initialName,
  initialNumber,
  onUpdate,
  onCancel,
  isUpdating,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialName,
      number: initialNumber,
    },
    mode: 'onChange',
    resolver: yupResolver(updateContactSchema),
  });

  const onSubmit = updatedContactData => {
    onUpdate(updatedContactData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ListItem sx={{ pr: '6px' }}>
        <ListItemAvatar>
          <Avatar>
            <ContactsIcon />
          </Avatar>
        </ListItemAvatar>

        <Box>
          <TextField
            size="small"
            sx={{ mb: 1 }}
            fullWidth
            required
            disabled={isUpdating}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            size="small"
            fullWidth
            required
            inputProps={{ inputMode: 'tel' }}
            disabled={isUpdating}
            error={Boolean(errors.number)}
            helperText={errors.number?.message}
            {...register('number')}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            pl: 1,
          }}
        >
          <Tooltip title="Save">
            <IconButton
              aria-label="save the updated contact"
              disabled={isUpdating}
              type="submit"
            >
              <CheckIcon />
              {isUpdating && (
                <CircularLoader size={20} sx={{ ml: '-10px', mt: '-10px' }} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Undo">
            <IconButton
              aria-label="undo changes"
              onClick={onCancel}
              disabled={isUpdating}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItem>
    </Box>
  );
}
