import React, { useState } from 'react';
import { Container, Box, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

// 그룹 생성 데이터 타입 정의
interface GroupData {
  groupName: string;
  groupCategory: string;
}

const GroupCreate: React.FC = () => {
  const [groupData, setGroupData] = useState<GroupData>({
    groupName: '',
    groupCategory: '상품', // 기본값 설정
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 그룹 생성 로직 (예: API 호출)
    alert(`그룹 이름: ${groupData.groupName}, 그룹 카테고리: ${groupData.groupCategory}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          그룹 생성하기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="groupName"
            label="그룹 이름을 입력하세요."
            variant="outlined"
            fullWidth
            value={groupData.groupName}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">그룹 카테고리</FormLabel>
            <RadioGroup
              name="groupCategory"
              value={groupData.groupCategory}
              onChange={handleChange}
            >
              <FormControlLabel value="상품" control={<Radio required />} label="상품" />
              <FormControlLabel value="여행" control={<Radio />} label="여행" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            생성하기
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default GroupCreate;