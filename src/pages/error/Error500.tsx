import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h1" color="error" gutterBottom>
          500
        </Typography>
        <Typography variant="h5" gutterBottom>
          서버 오류가 발생했습니다.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          죄송합니다. 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 3 }}
        >
          홈으로 돌아가기
        </Button>
      </Box>
    </Container>
  );
};

export default Error500;