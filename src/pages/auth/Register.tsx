import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { lookAccount, lookTel, register } from '../../services/AuthApi';
import { RegisterDto } from '../../types/types';

const RegisterPage: React.FC = () => {
  const [account, setAccount] = useState('');
  const [tel, setTel] = useState('');
  const [error, setError] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [telStatus, setTelStatus] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // 입력값이 모두 'success' 상태인지 확인
    if (accountStatus !== 'success' || telStatus !== 'success') {
      alert('모든 입력값을 확인해주세요.');
      return;
    }
    const registerDto: RegisterDto = { account, tel };
    try {
      const response = await register(registerDto);
      if (response.status === 200) {
        alert('가입이 완료되었습니다. 계정으로 로그인하세요.');
        navigate('/login');
      }
    } catch {
      alert('Error');
    }
  };

  const handleAccountCheck = async () => {
    try {
      const response = await lookAccount(account);
      if (response.status === 200) {
        setAccountStatus('success');
      }
    } catch {
      setAccountStatus('error');
    }
  };

  const handleTelCheck = async () => {
    try {
      const response = await lookTel(tel);
      if (response.status === 200) {
        setTelStatus('success');
      }
    } catch {
      setTelStatus('error');
    }
  };

  const getBorderColor = (status: string) => {
    if (status === 'success') return '2px solid green';
    if (status === 'error') return '2px solid red';
    return '';
  };

  // 입력 값이 변경될 때마다 상태 초기화
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
    setAccountStatus('');
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTel(e.target.value);
    setTelStatus('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" px={2}>
      <Box textAlign="center" p={4} borderRadius={2} boxShadow={3} sx={{ width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          회원 등록
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label="계정 입력"
              variant="outlined"
              fullWidth
              value={account}
              onChange={handleAccountChange}
              sx={{ mb: 2 }}
              style={{ border: getBorderColor(accountStatus) }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color={accountStatus === 'success' ? 'success' : accountStatus === 'error' ? 'error' : 'primary'}
              fullWidth
              onClick={handleAccountCheck}
              sx={{ height: '100%' }}
            >
              중복 체크
            </Button>
          </Grid>
          <Grid item xs={9}>
            <TextField
              label="전화번호 입력"
              variant="outlined"
              fullWidth
              value={tel}
              onChange={handleTelChange}
              sx={{ mb: 2 }}
              style={{ border: getBorderColor(telStatus) }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color={telStatus === 'success' ? 'success' : telStatus === 'error' ? 'error' : 'primary'}
              fullWidth
              onClick={handleTelCheck}
              sx={{ height: '100%' }}
            >
              중복 체크
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
          확인
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RegisterPage;