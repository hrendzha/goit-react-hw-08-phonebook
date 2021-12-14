import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: 'calc(100vh - 64px)',
      }}
    >
      <Typography variant="h2">Phonebook</Typography>
    </Box>
  );
}
