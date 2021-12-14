import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useFetchContactsQuery, useAddContactMutation } from 'services/api';
import { addContactFormSchema } from 'utils/yupSchemata';
import Wrapper from 'components/Wrapper';
import SubmitFormBtn from 'components/SubmitFormBtn';
import TitleWithIcon from 'components/TitleWithIcon';
import { showAlert } from 'redux/alert/alertSlice';

function ContactForm() {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
    },
    mode: 'onChange',
    resolver: yupResolver(addContactFormSchema),
  });

  const { data: contacts = [] } = useFetchContactsQuery();

  const [addContact, { isLoading: isAddingContact }] = useAddContactMutation();

  const isContactNameExist = contactName =>
    contacts.find(contact => contact.name === contactName);

  const onSubmit = async contactData => {
    if (isContactNameExist(contactData.name)) {
      dispatch(
        showAlert({
          isOpen: true,
          message: `${contactData.name} is already in contacts`,
          type: 'error',
        }),
      );
      return;
    }

    try {
      await addContact(contactData).unwrap();
      dispatch(
        showAlert({
          isOpen: true,
          message: `${contactData.name} has been added`,
          type: 'success',
        }),
      );
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <TitleWithIcon
        title="New contact"
        icon={ContactPageIcon}
        titleComponent="h2"
      />

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              ref={field.ref}
              {...field}
              required
              fullWidth
              autoComplete="given-name"
              name="name"
              id="given-name"
              label="Name"
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="number"
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              autoComplete="given-number"
              inputProps={{ inputMode: 'tel' }}
              name="number"
              id="given-number"
              label="Number"
              margin="normal"
              error={Boolean(errors.number)}
              helperText={errors.number?.message}
            />
          )}
        />

        <SubmitFormBtn isSubmitting={isAddingContact}>
          Add contact
        </SubmitFormBtn>
      </Box>
    </Wrapper>
  );
}

export default memo(ContactForm);
