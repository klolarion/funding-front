import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
    return (
        <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 화면 전체 높이 사용
      }}
    >
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
              로그인
            </Typography>
            <TextField
              label="이메일"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              type="email"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ backgroundColor: '#4949cc', '&:hover': { backgroundColor: '#3b3bb2' } }}
              onClick={() => navigate('/social')}
            >
              제출
            </Button>
            <br/>
            <Typography onClick={() => navigate('/social')}>
                처음 방문이신가요 ?
            </Typography>
          </Box>
        </Container>
      );
};

export default LoginPage;