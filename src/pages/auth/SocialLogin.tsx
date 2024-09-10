import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import KakaoIcon from '@mui/icons-material/Chat';  // Kakao 아이콘 대체
import NaverIcon from '@mui/icons-material/TravelExplore';  // Naver 아이콘 대체

const SocialLogin: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box textAlign="center">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
              href="/oauth2/authorization/google"
              sx={{
                backgroundColor: '#DB4437',
                '&:hover': { backgroundColor: '#C33D29' },
                color: '#fff',
                mb: 2,
              }}
            >
              Google Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<KakaoIcon />}
              href="/oauth2/authorization/kakao"
              sx={{
                backgroundColor: '#FEE500',
                '&:hover': { backgroundColor: '#E4C800' },
                color: '#000',
                mb: 2,
              }}
            >
              Kakao Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<NaverIcon />}
              href="/oauth2/authorization/naver"
              sx={{
                backgroundColor: '#03C75A',
                '&:hover': { backgroundColor: '#02984A' },
                color: '#fff',
              }}
            >
              Naver Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialLogin;