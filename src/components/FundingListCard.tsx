import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import theme from '../styles/theme';
import { FundingDto } from '../types/types';

interface FundingCardProps {
  funding: FundingDto;
}

const FundingCard: React.FC<FundingCardProps> = ({ funding }) => {
  const {
    fundingId,
    fundingCategoryCode,
    progress,
    productName,
    currentFundingAmount,
    totalFundingAmount,
    groupName,
    nickName,
    status
  } = funding;

  // Category color logic
  const getCategoryColor = () => {
    switch (fundingCategoryCode) {
      case 901:
        return theme.normal;
      case 902:
        return theme.travel;
      case 903:
        return theme.pink;
      case 904:
        return theme.silver;
      default:
        return '#344e41';
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardActionArea component={Link} to={`funding/detail/${fundingId}`}>
        <Card sx={{ borderColor: getCategoryColor(), borderWidth: 4, borderStyle: 'solid' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: getCategoryColor() }}>
              {progress}%
            </Typography>
            {productName && <Typography variant="body1">{productName}</Typography>}
            <Typography variant="body2" color="textSecondary">
              {currentFundingAmount.toLocaleString()}원 / {totalFundingAmount.toLocaleString()}원
            </Typography>
            {/* 추가적으로 그룹명과 회원명을 표시하고 싶다면 */}
            <Typography variant="body2" color="textSecondary">
              주최: {groupName || nickName}
            </Typography>
            {/* 상태 표시 */}
            <Typography variant="body2" color="textSecondary">
              상태: {status}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FundingCard;