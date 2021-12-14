import { Avatar, Box, Skeleton, Typography } from '@mui/material';

export default function ContactItemSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        pl: '8px',
      }}
    >
      <Box sx={{ margin: 1 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
        <Box sx={{ width: '70%' }}>
          <Skeleton width="100%">
            <Typography variant="body2">.</Typography>
          </Skeleton>
        </Box>
      </Box>

      <Box sx={{ margin: 2 }}>
        <Skeleton variant="circular">
          <Avatar sx={{ width: '24px', height: '24px' }} />
        </Skeleton>
      </Box>
    </Box>
  );
}
