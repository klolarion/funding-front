import React from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';

// 예제 데이터
const funding = {
  fundingId: 1,
  productName: '상품 1',
  travelName: null, // '여행 1' 로 대체 가능
  memberName: '홍길동',
  groupName: null,
  progress: 100,
  totalFundingAmount: 100000,
  currentFundingAmount: 100000,
};

const FundingDetail: React.FC = () => {
  const isGoalReached = funding.progress >= 100;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
        {/* Product or Travel Name */}
        {funding.productName ? (
          <Typography variant="h4" gutterBottom>
            {funding.productName}
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            {funding.travelName}
          </Typography>
        )}

        {/* Host Information */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          펀딩 주최
        </Typography>
        <Typography variant="body1">
          {funding.groupName ? funding.groupName : funding.memberName}
        </Typography>

        {/* Progress */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          달성률
        </Typography>
        <Typography variant="body1">{funding.progress}%</Typography>

        {/* Total Amount */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          목표 금액
        </Typography>
        <Typography variant="body1">{funding.totalFundingAmount.toLocaleString()}원</Typography>

        {/* Current Amount */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          현재 모금액
        </Typography>
        <Typography variant="body1">{funding.currentFundingAmount.toLocaleString()}원</Typography>

        {/* Participation Amount Form */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          참여 금액
        </Typography>
        <form method="post" action="/detail">
          <input type="hidden" name="fundingId" value={funding.fundingId} />
          <TextField
            type="number"
            name="amount"
            placeholder="참여하고 싶은 금액을 입력하세요."
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            펀딩 참여하기
          </Button>
        </form>

        {/* Purchase Button for 100% Progress */}
        {isGoalReached && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#ff5722', '&:hover': { backgroundColor: '#e64a19' } }}
          >
            상품 구매하기
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default FundingDetail;