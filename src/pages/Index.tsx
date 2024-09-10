import Container from "@mui/material/Container/Container";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import FundingCard from "../components/FundingListCard";
import GroupCard from "../components/GroupListCard";

export default function Index(){
    // Dummy data for demonstration
const allFundingList = [
    { fundingId: 1, fundingCategoryCode: 901, progress: 75, productName: 'Product 1', currentFundingAmount: 50000, totalFundingAmount: 100000 },
    { fundingId: 2, fundingCategoryCode: 902, progress: 50, travelName: 'Travel 1', currentFundingAmount: 30000, totalFundingAmount: 60000 },
    { fundingId: 2, fundingCategoryCode: 903, progress: 25, travelName: 'Product 2', currentFundingAmount: 10000, totalFundingAmount: 950000 },
    { fundingId: 2, fundingCategoryCode: 904, progress: 0, travelName: 'Product 3', currentFundingAmount: 33300, totalFundingAmount: 100000 },
    // Add more items here
  ];
  
  const allGroupList = [
    { groupId: 1, groupName: 'Group 1', groupMemberCount: 5 },
    { groupId: 2, groupName: 'Group 2', groupMemberCount: 10 },
    // Add more items here
  ];

    return (
        <>
        <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          전체 펀딩
        </Typography>
        <Grid container spacing={2}>
          {allFundingList.length > 0 ? (
            allFundingList.map((funding) => (
              <FundingCard key={funding.fundingId} funding={funding} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              펀딩을 만들어 보세요!
            </Typography>
          )}
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          그룹
        </Typography>
        <Grid container spacing={2}>
          {allGroupList.length > 0 ? (
            allGroupList.map((group) => (
              <GroupCard key={group.groupId} group={group} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              그룹을 만들어 보세요!
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
        </>
    )
};
