import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
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
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          요청하신 페이지가 존재하지 않거나, 잘못된 경로로 접근하셨습니다.
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

export default Error404;