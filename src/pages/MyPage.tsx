import React from 'react';
import { Container, Box, Grid, Typography, Card, CardContent, Button, ListItem, ListItemText, Chip, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 예제 데이터
const member = { memberName: '홍길동', email: 'hong@example.com' };
const myMainPayment = { paymentMethod: { paymentName: 'Visa', accountNumber: '****1234' } };
const myFundingList = [
  { fundingId: 1, productName: '상품 1', progress: 80, totalFundingAmount: 100000, status: '진행중' },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" mt={4}>
        {/* User Profile Section */}
        <Box id="mypage-left" textAlign="center" borderRight="1px solid #ccc" pr={4}>
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
          <Grid container spacing={4}>

            {/* Payment Method Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h6">결제 수단</Typography>
                  <Box>
                    {myMainPayment ? (
                      <Typography variant="body2">
                        {myMainPayment.paymentMethod.paymentName} {myMainPayment.paymentMethod.accountNumber}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        결제 수단을 추가하세요.
                      </Typography>
                    )}
                  </Box>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/payment/method')}>
                    결제 수단 관리
                  </Button>
                </CardContent>
              </Card>
            </Grid>


            {/* Group Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h6">그룹 관리</Typography>
                
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/group/manage')}>
                    그룹 관리
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            

            {/* Friend Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h6">친구 관리</Typography>
                  <Box>
                      <Typography variant="body2">
                      </Typography>
                  </Box>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/friend')}>
                    친구 관리
                  </Button>
                </CardContent>
              </Card>
            </Grid>


            {/* Payment Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h6">결제목록</Typography>
                
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/mypayments')}>
                    결제목록
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant="h6">구매내역</Typography>
                
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    구매내역
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Funding Section */}
            <Grid item xs={12} md={6}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            나의 펀딩 내역
          </Typography>
          <List>
            {myFundingList.map((funding) => (
              <ListItem key={funding.fundingId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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