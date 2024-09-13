import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

// 구매 항목 타입 정의
interface Purchase {
  purchaseId: string;
  productName: string;
  price: string;
  purchaseDate: string;
}

// 샘플 구매 데이터
const samplePurchases: Purchase[] = [
  {
    purchaseId: '1',
    productName: '상품 1',
    price: '15000',
    purchaseDate: '2023-09-05 14:00:00',
  },
  {
    purchaseId: '2',
    productName: '상품 2',
    price: '25000',
    purchaseDate: '2023-09-06 15:00:00',
  },
  // 추가 샘플 데이터...
];

const FundingOrder: React.FC = () => {
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string | null>(null);

  // 버튼 클릭 시 호출되는 함수, 구매 ID를 설정합니다.
  const handlePurchaseClick = (purchaseId: string) => {
    setSelectedPurchaseId(purchaseId);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          내 구매 목록
        </Typography>
        <form method="post" action="/index">
          <Grid container spacing={2}>
            {samplePurchases.map((purchase) => (
              <Grid item xs={12} key={purchase.purchaseId}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textAlign: 'left', padding: 2 }}
                  onClick={() => handlePurchaseClick(purchase.purchaseId)}
                >
                  {`상품명: ${purchase.productName}, 가격: ${purchase.price}원, 구매일자: ${purchase.purchaseDate}`}
                </Button>
              </Grid>
            ))}
          </Grid>
          <input type="hidden" id="purchaseId" name="purchaseId" value={selectedPurchaseId || ''} />
        </form>
      </Box>
    </Container>
  );
};

export default FundingOrder;