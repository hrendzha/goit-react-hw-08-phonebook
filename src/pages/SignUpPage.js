import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Grid, Box, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import { useRegisterMutation } from 'services/api';
import Copyright from 'components/Copyright';
import { signUpFormSchema } from 'utils/yupSchemata';
import Section from 'components/Section';
import Wrapper from 'components/Wrapper';
import TitleWithIcon from 'components/TitleWithIcon';
import NameInputField from 'components/NameInputField';
import EmailInputField from 'components/EmailInputField';
import PasswordInputField from 'components/PasswordInputField';
import SubmitFormBtn from 'components/SubmitFormBtn';

export default function SignUp() {
  const [registerUser, { isLoading: isSignUpLoading }] = useRegisterMutation();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = async credentials => {
    try {
      await registerUser(credentials).unwrap();
      history.push('/contacts');
    } catch (error) {
      const isEmailTaken = error.data?.keyValue?.email;
      if (isEmailTaken) {
        setError(
          'email',
          {
            type: 'custom',
            message: 'This email is already taken',
          },
          {
            shouldFocus: true,
          },
        );
      }
    }
  };

  return (
    <Section>
      <Container maxWidth="xs">
        <Wrapper>
          <TitleWithIcon title="Sign up" icon={LockIcon} />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <NameInputField autoFocus register={register} errors={errors} />

            <EmailInputField register={register} errors={errors} />

            <PasswordInputField
              inputId="new-password"
              autoComplete="new-password"
              register={register}
              errors={errors}
              helperTextFor="signUpForm"
            />

            <SubmitFormBtn isSubmitting={isSignUpLoading} sx={{ mb: 3 }}>
              Sign Up
            </SubmitFormBtn>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>

        <Copyright />
      </Container>
    </Section>
  );
}
