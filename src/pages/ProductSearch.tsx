import React, { useState } from 'react';
import { Container, Box, TextField, Button, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { search } from '../services/FundingApi';
import { ProductSearchDto } from '../types/types';


// // DTO 타입 정의
// interface ProductDTO {
//   title: string;
//   link: string;
//   image: string;
//   price: string;
//   mallname: string;
//   productid: string;
//   producttype: string;
//   category1: string;
//   category2: string;
//   category3: string;
// }

// 샘플 데이터 정의
// const sampleProducts: ProductDTO[] = [
//   {
//     title: '샘플 상품 1',
//     link: 'https://example.com/product1',
//     image: 'https://via.placeholder.com/150',
//     price: '10000',
//     mallname: '몰1',
//     productid: '1',
//     producttype: '1',
//     category1: '패션',
//     category2: '여성의류',
//     category3: '원피스',
//   },
//   {
//     title: '샘플 상품 2',
//     link: 'https://example.com/product2',
//     image: 'https://via.placeholder.com/150',
//     price: '20000',
//     mallname: '몰2',
//     productid: '2',
//     producttype: '1',
//     category1: '전자제품',
//     category2: '컴퓨터',
//     category3: '노트북',
//   },
//   // 샘플 데이터 8개 추가
//   {
//     title: '샘플 상품 3',
//     link: 'https://example.com/product3',
//     image: 'https://via.placeholder.com/150',
//     price: '30000',
//     mallname: '몰3',
//     productid: '3',
//     producttype: '1',
//     category1: '가전',
//     category2: '생활가전',
//     category3: '청소기',
//   },
//   {
//     title: '샘플 상품 4',
//     link: 'https://example.com/product4',
//     image: 'https://via.placeholder.com/150',
//     price: '40000',
//     mallname: '몰4',
//     productid: '4',
//     producttype: '1',
//     category1: '스포츠',
//     category2: '헬스',
//     category3: '운동기구',
//   },
//   {
//     title: '샘플 상품 5',
//     link: 'https://example.com/product5',
//     image: 'https://via.placeholder.com/150',
//     price: '50000',
//     mallname: '몰5',
//     productid: '5',
//     producttype: '1',
//     category1: '도서',
//     category2: '소설',
//     category3: '역사',
//   },
//   {
//     title: '샘플 상품 6',
//     link: 'https://example.com/product6',
//     image: 'https://via.placeholder.com/150',
//     price: '60000',
//     mallname: '몰6',
//     productid: '6',
//     producttype: '1',
//     category1: '음반',
//     category2: '클래식',
//     category3: '교향곡',
//   },
//   {
//     title: '샘플 상품 7',
//     link: 'https://example.com/product7',
//     image: 'https://via.placeholder.com/150',
//     price: '70000',
//     mallname: '몰7',
//     productid: '7',
//     producttype: '1',
//     category1: '패션',
//     category2: '남성의류',
//     category3: '셔츠',
//   },
//   {
//     title: '샘플 상품 8',
//     link: 'https://example.com/product8',
//     image: 'https://via.placeholder.com/150',
//     price: '80000',
//     mallname: '몰8',
//     productid: '8',
//     producttype: '1',
//     category1: '음식',
//     category2: '과일',
//     category3: '사과',
//   },
//   {
//     title: '샘플 상품 9',
//     link: 'https://example.com/product9',
//     image: 'https://via.placeholder.com/150',
//     price: '90000',
//     mallname: '몰9',
//     productid: '9',
//     producttype: '1',
//     category1: '여행',
//     category2: '국내여행',
//     category3: '서울',
//   },
//   {
//     title: '샘플 상품 10',
//     link: 'https://example.com/product10',
//     image: 'https://via.placeholder.com/150',
//     price: '100000',
//     mallname: '몰10',
//     productid: '10',
//     producttype: '1',
//     category1: '가구',
//     category2: '침실가구',
//     category3: '침대',
//   },
// ];

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
                  {product.mallname}
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

