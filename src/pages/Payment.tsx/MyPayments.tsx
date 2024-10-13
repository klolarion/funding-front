import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { PaymentDto } from '../../types/types';
import { getMyPayments } from '../../services/FundingApi';

const MyPayments: React.FC = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [payment, setPayment] = useState<PaymentDto[] | null>(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyPayments(); // API 호출

        setPayment(response.data);

      } catch (error) {
        console.error('Failed to fetch payment data:', error);
      }
    };

    fetchData();
  }, []);



  // 버튼 클릭 시 호출되는 함수, 결제 ID를 설정합니다.
  const handlePaymentClick = (paymentId: number) => {
    setSelectedPaymentId(paymentId);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom align='center'>
          내 결제 목록
        </Typography>
        <form method="post" action="/index">
          <Grid container spacing={2}>
            {payment?.map((payment) => (
              <Grid item xs={12} key={payment.paymentId}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textAlign: 'left', padding: 2 }}
                  onClick={() => handlePaymentClick(payment.paymentId)}
                >
                  {`내 결제수단: ${payment.paymentMethodName}, 내 계좌: ${payment.paymentAccount}, 대상 계좌: ${payment.targetAccount}, 결제금액: ${payment.amount.toLocaleString()}, 결제 전 잔고: ${payment.balanceBefore.toLocaleString()}, 결제 후 잔고: ${payment.balanceAfter.toLocaleString()}, 결제일시: ${payment.createDate}`}
                </Button>
              </Grid>
            ))}
          </Grid>
          <input type="hidden" id="paymentId" name="paymentId" value={selectedPaymentId || ''} />
        </form>
      </Box>
    </Container>
  );
};

export default MyPayments;