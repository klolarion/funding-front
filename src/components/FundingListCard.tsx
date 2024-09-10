import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';

interface Funding {
  fundingId: number;
  fundingCategoryCode: number;
  progress: number;
  productName?: string;
  travelName?: string;
  currentFundingAmount: number;
  totalFundingAmount: number;
}

interface FundingCardProps {
  funding: Funding;
}

const FundingCard: React.FC<FundingCardProps> = ({ funding }) => {
  const { fundingId, fundingCategoryCode, progress, productName, travelName, currentFundingAmount, totalFundingAmount } = funding;

  // Category color logic
  const getCategoryColor = () => {
    switch (fundingCategoryCode) {
      case 901:
        return '#bc3908';
      case 902:
        return '#072ac8';
      case 903:
        return '#ffafcc';
      case 904:
        return '#e9ecef';
      default:
        return '#344e41';
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardActionArea href={`/detail/${fundingId}`}>
        <Card style={{ borderColor: getCategoryColor(), borderWidth: 4, borderStyle: 'solid' }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              {progress}%
            </Typography>
            {productName && <Typography variant="body1">{productName}</Typography>}
            {travelName && <Typography variant="body1">{travelName}</Typography>}
            <Typography variant="body2" color="textSecondary">
              {currentFundingAmount}원 / {totalFundingAmount}원
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FundingCard;