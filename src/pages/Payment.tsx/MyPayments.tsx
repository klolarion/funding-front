import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

// 결제 항목 타입 정의
interface Payment {
  paymentId: string;
  paymentAccount: string;
  targetAccount: string;
  amount: string;
  balanceBefore: string;
  balanceAfter: string;
  createdDate: string;
}

// 샘플 결제 데이터
const samplePayments: Payment[] = [
  {
    paymentId: '1',
    paymentAccount: '계좌1',
    targetAccount: '대상계좌1',
    amount: '10000',
    balanceBefore: '50000',
    balanceAfter: '40000',
    createdDate: '2023-09-01 10:00:00',
  },
  {
    paymentId: '2',
    paymentAccount: '계좌2',
    targetAccount: '대상계좌2',
    amount: '20000',
    balanceBefore: '70000',
    balanceAfter: '50000',
    createdDate: '2023-09-02 11:00:00',
  },
  // 추가 샘플 데이터...
];

const MyPayments: React.FC = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // 버튼 클릭 시 호출되는 함수, 결제 ID를 설정합니다.
  const handlePaymentClick = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          내 결제 목록
        </Typography>
        <form method="post" action="/index">
          <Grid container spacing={2}>
            {samplePayments.map((payment) => (
              <Grid item xs={12} key={payment.paymentId}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ textAlign: 'left', padding: 2 }}
                  onClick={() => handlePaymentClick(payment.paymentId)}
                >
                  {`내 계좌: ${payment.paymentAccount}, 대상 계좌: ${payment.targetAccount}, 결제금액: ${payment.amount}, 결제 전 잔고: ${payment.balanceBefore}, 결제 후 잔고: ${payment.balanceAfter}, 결제일시: ${payment.createdDate}`}
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