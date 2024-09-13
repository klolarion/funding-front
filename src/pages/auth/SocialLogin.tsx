import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import KakaoIcon from '@mui/icons-material/Chat';  // Kakao 아이콘 대체
import NaverIcon from '@mui/icons-material/TravelExplore';  // Naver 아이콘 대체

const SocialLogin: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box textAlign="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            maxWidth: 400, // 박스의 최대 너비
            padding: 4,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            boxShadow: 3, // 약간의 그림자 추가
          }}
        >
          <Typography variant="h4" gutterBottom>
            인증
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<GoogleIcon />}
                href="http://localhost:9091/oauth2/authorization/google" // Spring Boot의 OAuth2 로그인 엔드포인트
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
                href="http://localhost:9091/oauth2/authorization/kakao"
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
                href="http://localhost:9091/oauth2/authorization/naver"
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
    </Box>
  );
};

export default SocialLogin;