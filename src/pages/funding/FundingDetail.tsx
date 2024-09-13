import React, { useEffect, useState, useCallback } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material'; // Correct import for error icon
import { fundingDetail, joinFunding } from '../../services/FundingApi';
import { FundingDto, JoinFundingDto } from '../../types/types';
import { useParams } from 'react-router-dom';

const FundingDetail: React.FC = () => {
  const { fundingId } = useParams<{ fundingId: string }>(); // Extract fundingId from URL params
  const [funding, setFunding] = useState<FundingDto | null>(null); // State for funding details
  const [amount, setAmount] = useState<number | null>(null); // State for the amount input
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null); // State for notifications
  const [isGoalReached, setIsGoalReached] = useState<boolean>(false); // State for checking if goal is reached

  // Function to fetch funding details
  const fetchData = useCallback(async () => {
    try {
      if (fundingId) {
        const data = await fundingDetail(fundingId); // Fetch funding details from API
        setFunding(data); // Set fetched data to state
        setIsGoalReached(data.progress >= 100); // Check if funding goal is reached
      }
    } catch (error) {
      console.error('Failed to fetch data:');
    }
  }, [fundingId]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle form submission for joining funding
  const handleJoinFunding = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!fundingId || amount === null) {
      console.error('Funding ID and amount are required.');
      setNotification({ type: 'error', message: '펀딩 ID와 참여 금액이 필요합니다.' });
      return;
    }

    const joinFundingDto: JoinFundingDto = {
      fundingId: Number(fundingId), // Convert fundingId to number
      amount,
      memberId: funding?.memberId || null,
      groupId: funding?.groupId || null,
      paymentMethodListId: funding?.paymentMethodListId || null,
    };

    try {
      await joinFunding(joinFundingDto); // Send POST request to join funding
      setNotification({ type: 'success', message: '펀딩이 성공적으로 완료되었습니다!' });

      // Refetch the data after successful participation
      fetchData();

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: '펀딩 참여에 실패하였습니다.' });

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (!funding) {
    return <div>Loading...</div>; // Show loading state if data is not yet fetched
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', position: 'relative' }}>
        {/* Notification Display */}
        {notification && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: notification.type === 'success' ? 'green' : 'red',
              color: 'white',
              padding: 1,
              borderRadius: 1,
            }}
          >
            {notification.type === 'success' ? <CheckCircle /> : <Error />}
            <Typography variant="body2">{notification.message}</Typography>
          </Box>
        )}

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

        {/* Conditional Rendering of Participation Form */}
        {!isGoalReached && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              참여 금액
            </Typography>
            <form onSubmit={handleJoinFunding}>
              <TextField
                type="number"
                placeholder="참여하고 싶은 금액을 입력하세요."
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                value={amount ?? ''}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                펀딩 참여하기
              </Button>
            </form>
          </>
        )}

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