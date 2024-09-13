import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Card, CardContent, Button, ListItem, ListItemText, Chip, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { myPage } from '../services/FundingApi';
import { MyPageDto } from '../types/types';

// 예제 데이터

// const member = { memberName: '홍길동', email: 'hong@example.com', status: '일반'  };
// const myMainPayment = { paymentMethod: { paymentName: 'Visa', accountNumber: '****1234' } };
const myMainPayment = { paymentMethod: null};
const myFundingList = [
  { fundingId: 1, productName: '상품 1', progress: 80, totalFundingAmount: 100000, status: '진행중' },
];

const borderColorMap: { [key: string]: string } = {
  일반: theme.normal,  // 갈색
  핑크: theme.pink, // 핑크
  실버: theme.silver, // 은색
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const [myPageData, setMyPageData] = useState<MyPageDto | null>(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await myPage(); // API 호출
        setMyPageData(data);
      } catch (error) {
        console.error('Failed to fetch my page data:', error);
      }
    };

    fetchData();
  }, []);

  if (!myPageData) {
    return <Typography>Loading...</Typography>; // 데이터가 로드되기 전 로딩 메시지 표시
  }

  const { fundingListDtos, myMainPaymentMethod, memberDto, myActivity } = myPageData;

  const borderColor = borderColorMap[memberDto.memberStatus] || '#A52A2A'; 
  
  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" mt={4}>
        {/* User Profile Section */}
        <Box id="mypage-left" textAlign="center" borderRight="1px solid #ccc" pr={4} minWidth="200px">
          {/* 사용자 상태 표시 */}
          <Typography
            variant="body2"
            sx={{ color: borderColor, mb: 1 }}
          >
            {memberDto.memberStatus} 사용자
          </Typography>

          {/* 사용자 정보 박스 */}
          {/* 사용자 정보 박스 */}
          <Box
            sx={{
              border: `5px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '10px 16px',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30px', // 높이를 명확히 지정
              lineHeight: '1', // 줄 간격 조정
            }}
          >
            <Typography variant="h5" sx={{ m: 0 }}>
              {memberDto.memberName}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            {memberDto.email}
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
                        onClick={() => navigate("/funding/order")}
                      >
                        구매 내역
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ height: 60, backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
                        onClick={() => navigate("/register/status")}
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
                        // onClick={() => navigate(`/funding/${funding.fundingId}`)}
                        onClick={() => navigate(`/funding/detail`)}
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