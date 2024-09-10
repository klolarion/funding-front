import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid, FormControlLabel, RadioGroup, Radio, FormControl, TextField } from "@mui/material";

// 샘플 데이터 - 이전 검색 결과 (검색 페이지에서 전달되는 데이터로 가정)
const productList = [
  { productId: '1', productName: 'Product 1', price: 50000 },
  { productId: '2', productName: 'Product 2', price: 100000 },
];

const travelList = [
  { travelId: '1', travelName: 'Travel 1', price: 30000 },
  { travelId: '2', travelName: 'Travel 2', price: 60000 },
];

const myLeaderGroups = [
  { groupId: '1', groupName: 'Group 1', groupCategoryCode: '901' },
  { groupId: '2', groupName: 'Group 2', groupCategoryCode: '902' },
];

const statusCodes = {
  '상품': '901',
  '여행': '902',
  '핑크': '903',
  '실버': '904'
};

const CreateFunding: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('상품');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedTravel, setSelectedTravel] = useState<any | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    // 기본 카테고리 설정에 따라 상품 또는 여행 옵션 표시
    toggleSelectionList();
  }, [selectedCategory]);

  const toggleSelectionList = () => {
    // 카테고리에 따라 상품 또는 여행 리스트 토글
    if (selectedCategory === '상품' || selectedCategory === '핑크' || selectedCategory === '실버') {
      setSelectedTravel(null);
    } else if (selectedCategory === '여행') {
      setSelectedProduct(null);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setSelectedTravel(null);
  };

  const handleTravelClick = (travel: any) => {
    setSelectedTravel(travel);
    setSelectedProduct(null);
  };

  const handleGroupClick = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 폼 제출 로직 (예: API 호출)
    alert('펀딩이 생성되었습니다.');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          펀딩 만들기
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* 카테고리 선택 */}
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <RadioGroup row name="groupCategory" value={selectedCategory} onChange={handleCategoryChange}>
              <FormControlLabel value="상품" control={<Radio />} label="상품" />
              <FormControlLabel value="여행" control={<Radio />} label="여행" />
              <FormControlLabel value="핑크" control={<Radio />} label="핑크" />
              <FormControlLabel value="실버" control={<Radio />} label="실버" />
            </RadioGroup>
          </FormControl>

          {/* 상품 또는 여행 선택 */}
          {selectedCategory === '상품' || selectedCategory === '핑크' || selectedCategory === '실버' ? (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                상품 선택
              </Typography>
              <Grid container spacing={2}>
                {productList.map((product) => (
                  <Grid item xs={12} key={product.productId}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleProductClick(product)}
                      sx={{
                        borderColor: selectedProduct?.productId === product.productId ? '#4949cc' : 'grey',
                        backgroundColor: selectedProduct?.productId === product.productId ? '#E9E9FAFF' : 'white',
                      }}
                    >
                      {product.productName} - {product.price.toLocaleString()}원
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                여행 선택
              </Typography>
              <Grid container spacing={2}>
                {travelList.map((travel) => (
                  <Grid item xs={12} key={travel.travelId}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleTravelClick(travel)}
                      sx={{
                        borderColor: selectedTravel?.travelId === travel.travelId ? '#4949cc' : 'grey',
                        backgroundColor: selectedTravel?.travelId === travel.travelId ? '#E9E9FAFF' : 'white',
                      }}
                    >
                      {travel.travelName} - {travel.price.toLocaleString()}원
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* 목표 금액 표시 */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              목표 금액
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={
                selectedProduct ? `${selectedProduct.price.toLocaleString()}원` :
                selectedTravel ? `${selectedTravel.price.toLocaleString()}원` : ''
              }
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          {/* 그룹 선택 */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              그룹 선택 <span style={{ fontSize: 'small', color: '#79797e' }}>*옵션</span>
            </Typography>
            <Grid container spacing={2}>
              {myLeaderGroups.map((group) => (
                <Grid item xs={12} key={group.groupId}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleGroupClick(group.groupId)}
                    sx={{
                      borderColor: selectedGroup === group.groupId ? '#4949cc' : 'grey',
                      backgroundColor: selectedGroup === group.groupId ? '#E9E9FAFF' : 'white',
                    }}
                  >
                    {group.groupName}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 숨겨진 입력 값들 */}
          <input type="hidden" name="productId" value={selectedProduct?.productId || ''} />
          <input type="hidden" name="travelId" value={selectedTravel?.travelId || ''} />
          <input type="hidden" name="groupId" value={selectedGroup || ''} />
          <input type="hidden" name="statusCode" value={statusCodes[selectedCategory]} />

          {/* 펀딩 만들기 버튼 */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            펀딩 만들기
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateFunding;