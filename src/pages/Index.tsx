import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FundingCard from "../components/FundingListCard";
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// 더미 데이터
const allFundingList = [
  { fundingId: 1, fundingCategoryCode: 901, progress: 75, productName: 'Product 1', currentFundingAmount: 50000, totalFundingAmount: 100000 },
  { fundingId: 2, fundingCategoryCode: 902, progress: 50, travelName: 'Travel 1', currentFundingAmount: 30000, totalFundingAmount: 60000 },
  { fundingId: 3, fundingCategoryCode: 903, progress: 25, productName: 'Product 2', currentFundingAmount: 10000, totalFundingAmount: 950000 },
  { fundingId: 4, fundingCategoryCode: 904, progress: 0, productName: 'Product 3', currentFundingAmount: 33300, totalFundingAmount: 100000 },
];

const fundingCategories = {
  901: "상품",
  902: "여행",
  903: "핑크",
  904: "실버"
};

export default function Index() {
  const [searchResults, setSearchResults] = useState(allFundingList);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 체크박스 변경 핸들러
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategories(prev =>
      event.target.checked ? [...prev, value] : prev.filter(category => category !== value)
    );
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (selectedCategories.length === 0) {
      setSearchResults(allFundingList); // 아무 옵션도 선택되지 않으면 전체 리스트를 보여줌
    } else {
      setSearchResults(
        allFundingList.filter(funding =>
          selectedCategories.includes(fundingCategories[funding.fundingCategoryCode])
        )
      );
    }
  };

  return (
    <Container maxWidth="lg">
      {/* 검색 섹션 */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={4} mb={4}>
        <TextField
          label="펀딩 검색"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 600, mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4949cc", "&:hover": { backgroundColor: "#3b3bb2" } }}
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          검색
        </Button>
      </Box>

      {/* 검색 옵션 */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          검색 옵션
        </Typography>
        <FormGroup row>
          {Object.entries(fundingCategories).map(([code, label]) => (
            <FormControlLabel
              key={code}
              control={
                <Checkbox
                  value={label}
                  checked={selectedCategories.includes(label)}
                  onChange={handleCategoryChange}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Box>

      {/* 펀딩 리스트 */}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          전체 펀딩
        </Typography>
        <Grid container spacing={2}>
          {searchResults.length > 0 ? (
            searchResults.map((funding) => (
              <FundingCard key={funding.fundingId} funding={funding} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              펀딩을 만들어 보세요!
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}