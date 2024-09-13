import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const RegisterPage: React.FC = () => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckAccount = async () => {
    try {
      const response = await axios.post('/api/auth/check-account', { email });
      const { provider } = response.data; // 서버로부터 소셜 로그인 제공자 정보 수신
      if (provider) {
        // 소셜 로그인 제공자로 리다이렉트
        window.location.href = `http://localhost:9091/oauth2/authorization/${provider}`;
      } else {
        setError('등록된 소셜 로그인 제공자가 없습니다.');
      }
    } catch (error) {
      console.error('계정 확인 오류:', error);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box textAlign="center" p={4} borderRadius={2} boxShadow={3}>
        <Typography variant="h5" gutterBottom>회원 등록</Typography>
        <TextField
          label="계정 입력"
          variant="outlined"
          fullWidth
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="이메일 입력"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="전화번호 입력"
          variant="outlined"
          fullWidth
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleCheckAccount}>
          확인
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default RegisterPage;