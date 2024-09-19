import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { accountCheck } from '../../services/AuthApi';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const handleAccountCheck = async (e) => {
    e.preventDefault();
    try{
      const response = await accountCheck(account); 
        if (response.status === 200) {
          const provider = response.data;
          // 상태값을 가지고 라우팅, B 페이지로 provider 전달
          navigate('/social', { state: { provider } });
        } 
      }catch{
        // 가입을 안한경우와 아직 소셜로그인을 안한경우 구분해야함 <---
      navigate('/social', { state: null });
    }
  
  };
  
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
              label="계정"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ backgroundColor: '#4949cc', '&:hover': { backgroundColor: '#3b3bb2' } }}
              onClick={handleAccountCheck}
            >
              제출
            </Button>
            <br/>
            <Typography onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }} // 커서 모양을 손가락(포인터)으로 변경
            >
                처음 방문이신가요 ?
            </Typography>
          </Box>
        </Container>
      );
};

export default LoginPage;