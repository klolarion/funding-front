import React from 'react';
import { Container, Box, Grid, Typography, Card, CardContent, Button, ListItem, ListItemText, Chip, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 예제 데이터
const member = { memberName: '홍길동', email: 'hong@example.com' };
const myMainPayment = { paymentMethod: { paymentName: 'Visa', accountNumber: '****1234' } };
const myFundingList = [
  { fundingId: 1, productName: '상품 1', progress: 80, totalFundingAmount: 100000, status: '진행중' },
  { fundingId: 2, productName: '상품 2', progress: 60, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 3, productName: '상품 3', progress: 20, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 4, productName: '상품 4', progress: 40, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 5, productName: '상품 5', progress: 50, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 6, productName: '상품 6', progress: 90, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 7, productName: '상품 7', progress: 0, totalFundingAmount: 80000, status: '진행중' },
  { fundingId: 8, productName: '상품 8', progress: 100, totalFundingAmount: 80000, status: '완료' },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" mt={4}>
        {/* User Profile Section */}
        <Box id="mypage-left" textAlign="center" borderRight="1px solid #ccc" pr={4} minWidth="200px">
          <Typography variant="h5" gutterBottom>
            {member.memberName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {member.email}
          </Typography>
          <Box id="mypage-util" mt={2}>
            <Button variant="contained" fullWidth sx={{ mb: 1, backgroundColor: '#ecebeb', color: '#79797e' }}>
              로그아웃
            </Button>
            <Button variant="contained" fullWidth sx={{ backgroundColor: '#ffdae3', color: '#e1103a' }}>
              회원탈퇴
            </Button>
          </Box>
        </Box>

        {/* Main Content Section */}
        <Box flexGrow={1} ml={4}>
          <Grid container spacing={2}>

            {/* Combined Container for Activity and Management Buttons */}
            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ height: '100%' }}>
                {/* Activity Section */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                  <Typography variant="h6" sx={{ padding: '16px' }}>
                      내 활동
                    </Typography>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                      
                      <Box justifyContent="space-between" mb={1}>
                        <Typography variant="body2">펀딩 개설 수: 5</Typography>
                        <Typography variant="body2">펀딩 참여금액: 200,000원</Typography>
                        <Typography variant="body2">만든 그룹 수: 3</Typography>
                        <Typography variant="body2">참여 그룹 수: 4</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Management Section Buttons */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} sx={{ height: '100%' }}>
                    {/* Button Height Adjusted */}
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/payment/method")}
                      >
                        결제수단 관리
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/group/manage")}
                      >
                        그룹 관리
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/friend")}
                      >
                        친구 관리
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/mypayments")}
                      >
                        결제 목록
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/order")}
                      >
                        구매 내역
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/register")}
                      >
                        핑크/실버 신청
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Funding Section */}
            <Grid item xs={12}>
              <Card sx={{ height: 'auto' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    나의 펀딩 내역
                  </Typography>
                  <List sx={{ width: '100%' }}>
                    {myFundingList.map((funding) => (
                      <ListItem
                        key={funding.fundingId}
                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                        onClick={() => navigate(`/funding/${funding.fundingId}`)}
                      >
                        <ListItemText
                          primary={funding.productName}
                          secondary={`진행률: ${funding.progress}% | 총 금액: ${funding.totalFundingAmount.toLocaleString()}원`}
                        />
                        <Chip
                          label={funding.status}
                          sx={{
                            borderRadius: '20px',
                            backgroundColor: funding.status === '완료' ? '#4caf50' : '#E9E9FAFF',
                            color: funding.status === '완료' ? '#fff' : '#7171DFFF',
                            fontSize: 'small',
                            padding: '0 10px',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MyPage;