

import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FundingCard from "../components/FundingListCard";
import { TextField, Button, FormControlLabel, FormControl, RadioGroup, Radio } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { FundingDto } from "../types/types";
import { index, searchFunding } from "../services/FundingApi";

const fundingCategories: Record<number, string> = {
  901: "상품",
  902: "여행",
  903: "핑크",
  904: "실버"
};


export default function Index() {

  const [searchParam, setSearchParam] = useState<string>('');
  const [fundingCategoryCode, setFundingCategoryCode] = useState<string>(''); // 숫자형 상태
  const [searchResults, setSearchResults] = useState<FundingDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 숫자형 상태
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // 로그인 상태 관리 (임시로 true 설정)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await index();
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch funding data:", error);
      }
    };

    fetchData();

    // 로그인 상태 확인 로직 추가 (예: API 호출로 로그인 상태 확인)
    const checkLoginStatus = async () => {
      // 예시로 임의로 true 설정
      setIsLoggedIn(true); // 실제 로그인 체크 로직을 적용
    };

    checkLoginStatus();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    setSelectedCategory(value);
    setFundingCategoryCode(value);
  };

  const handleSearch = async () => {
    if(searchParam == null){
      alert('검색어를 입력하세요')
    }
    try{
      const data = await searchFunding(searchParam, fundingCategoryCode);
      setSearchResults(data);
    }catch(error){
      console.log(error);
    }

  };

  return (
    <>
    <Container maxWidth="lg">
    {isLoggedIn && (
        <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4} mb={4}>
        <TextField
          label="펀딩 검색"
          variant="outlined"
          fullWidth
          value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
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

      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          검색 옵션
        </Typography>
        <FormControl component="fieldset">
              <RadioGroup
               row
               name="fundingCategory"
               value={selectedCategory !== null ? selectedCategory.toString() : ''}
               onChange={handleCategoryChange}
              >
                {Object.entries(fundingCategories).map(([code, label]) => (
                  <FormControlLabel
                    key={code}
                    value={code}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
      </Box>
      </>
      )}
      {/* 펀딩 리스트 */}
      <Box my={4}>
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
        </>)
};
