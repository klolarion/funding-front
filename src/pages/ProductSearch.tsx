import React, { useState } from 'react';
import { Container, Box, TextField, Button, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { search } from '../services/FundingApi';
import { ProductSearchDto } from '../types/types';
import { useNavigate } from 'react-router-dom';

const ProductSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductSearchDto[]>([]);

  // 검색 버튼 클릭 시 호출
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const results = await search(searchTerm);
        setFilteredProducts(results);
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" alignItems="center" mt={4} mb={4}>
        <TextField
          label="상품 검색"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 600, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ backgroundColor: '#4949cc', '&:hover': { backgroundColor: '#3b3bb2' } }}
          startIcon={<SearchIcon />}
        >
          검색
        </Button>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ height: 140 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {Number(product.lprice).toLocaleString()}원
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.mallName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.category1}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                href={product.link}
                target="_blank"
                rel="noopener"
                sx={{ m: 1 }}
              >
                자세히 보기
              </Button>
              <Button
                variant="contained"
                color="primary"
                rel="noopener"
                sx={{ m: 1 }}
                onClick={() => navigate('/funding/create')}
              >
                펀딩 생성하기
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductSearch;

