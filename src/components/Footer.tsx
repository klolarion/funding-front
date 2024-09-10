import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              © 2023 My Company. All rights reserved.
            </Typography>
          </Grid>
    
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;