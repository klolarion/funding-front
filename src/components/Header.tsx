import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 프로그램matically 라우팅

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }} onClick={() => navigate('/')}>
          Funding Project
        </Typography>
        <Box display="flex" alignItems="center">
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/social')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/mypage')}>My page</Button>
          <Button
            onClick={() => navigate('/search')}
            sx={{
              backgroundColor: '#4949cc',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#3b3bb2',
              },
              ml: 2, // 왼쪽에 약간의 마진 추가
            }}
          >펀딩 시작하기</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;