import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { addToMyPaymentMethod, myPaymentMethod, removeFromMyPaymentMethod, setMainPaymentMethod } from '../../services/FundingApi';
import { PaymentMethod, PaymentMethodDto } from '../../types/types';




// 샘플 데이터
// const mainPaymentMethod: PaymentMethod | null = {
//   paymentMethodId: '1',
//   paymentName: 'NH 어쩌구 저쩌구',
//   accountNumber: '123-123456-123',
//   availableAmount: '123456',
// };

// const myPaymentList: PaymentMethod[] = [
//   { paymentMethodId: '2', paymentName: 'KB 국민은행', accountNumber: '111-111111-111', availableAmount: '100000' },
//   { paymentMethodId: '3', paymentName: '신한은행', accountNumber: '222-222222-222', availableAmount: '200000' },
// ];


// const paymentMethodList: PaymentMethod[] = [
//   { paymentMethodId: '4', paymentName: '우리은행' },
//   { paymentMethodId: '5', paymentName: '하나은행' },
// ];




  
const PaymentMethodManagementPage: React.FC = () => {
  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myPaymentMethod(); // API 호출


        const my = response.data.paymentMethodLists;
        const all = response.data.paymentMethods;
        const main = response.data.mainPaymentMethod;

        let filtered = all.filter(
            all => !my.some(
              my => my.paymentMethodId === all.paymentMethodId
          ) &&
          main.paymentMethodId !== all.paymentMethodId
        );



        setAllPaymentMethodList(filtered); //모든 결제수단(내 결제수단에 등록된 요소 삭제)
        
      
        setMainMethod(response.data.mainPaymentMethod); //메인 결제수단
        setMyPaymentMethodList(response.data.paymentMethodLists); //내 결제수단

      } catch (error) {
        console.error('Failed to fetch payment method data:', error);
      }
    };

    fetchData();
  }, []);


  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number>(0);
  const [mainMethod, setMainMethod] = useState<PaymentMethod | null>(null);
  const [myPaymentMethodList, setMyPaymentMethodList] = useState<PaymentMethod[]>([]);
  const [allPaymentMethodList, setAllPaymentMethodList] = useState<PaymentMethodDto[]>([]);
  

  const handleSelectPaymentMethod = (paymentMethodId: number) => {
    setSelectedPaymentMethodId(paymentMethodId);
  };

  //내 결제수단목록중 하나를 주 결제수단으로 설정
  const handleSetMainPaymentMethod = async (paymentMethodListId: number) => {
    try{
      const response = await setMainPaymentMethod(paymentMethodListId);
      if(response.status === 200){
        window.location.reload();
      }else{
        console.log(response.status)
      }
    }catch (error){
      console.error("Failed to fetch data:", error);
    }
  };

  //내 결제수단목록에서 제거(주 결제수단이 아니어야함)
  const handleDeletePaymentMethod = async (paymentMethodListId: number) => {

    try{
      const response = await removeFromMyPaymentMethod(paymentMethodListId);
      if(response.status === 200){
        window.location.reload();
      }else{
        console.log(response.status)
      }
    }catch (error){
      console.error("Failed to fetch data:", error);
    }
  };

  //결제수단을 내 결제수단목록에 추가
  const handleAddPaymentMethod = async (paymentMethodId: number) => {
    try{
      const response = await addToMyPaymentMethod(paymentMethodId);
      if(response.status === 200){
        window.location.reload();
      }else{
        console.log(response.status)
      }
    }catch (error){
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          결제 수단 관리
        </Typography>

        {/* 대표 결제 수단 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            대표 결제 수단
          </Typography>
          {mainMethod ? (
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, border: '2px solid #4949cc', backgroundColor: '#f0f4ff' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, marginRight: 2 }}
                image="https://via.placeholder.com/100" // 대표 계좌 아이콘 이미지
                alt="대표 계좌"
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {mainMethod.paymentMethodName}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                  계좌번호: {mainMethod.paymentMethodAccountNumber}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333' }}>
                  잔액: {Number(mainMethod.availableAmount).toLocaleString()}원
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1" color="textSecondary">
              대표 결제 수단이 없습니다.
            </Typography>
          )}
        </Box>

        {/* 내 결제 수단 리스트 */}
        <Typography variant="h5" gutterBottom>
          내 결제 수단 리스트
        </Typography>
        <Grid container spacing={2}>
          {myPaymentMethodList.map((method) => (
            <Grid item xs={12} md={6} key={method.paymentMethodId}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6">{method.paymentMethodName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    계좌번호: {method.paymentMethodAccountNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    잔액: {Number(method.availableAmount).toLocaleString()}원
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="space-between" p={2}>
                  <Button variant="contained" color="primary" onClick={() => handleSetMainPaymentMethod(method.paymentMethodListId)}>
                    대표 설정
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeletePaymentMethod(method.paymentMethodListId)}>
                    삭제
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 결제 수단 등록 */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            결제 수단 등록하기
          </Typography>
          <Grid container spacing={2}>
            {allPaymentMethodList.map((method) => (
              <Grid item xs={6} md={4} key={method.paymentMethodId}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: 2,
                    border: selectedPaymentMethodId === method.paymentMethodId ? '2px solid #4949cc' : '1px solid #ddd',
                  }}
                  onClick={() => handleSelectPaymentMethod(method.paymentMethodId)}
                >
                  <Typography variant="body1">{method.paymentName}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => handleAddPaymentMethod(selectedPaymentMethodId)}
            disabled={!selectedPaymentMethodId}
          >
            내 결제 수단으로 등록하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentMethodManagementPage;