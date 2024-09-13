import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const RegisterMemberStatus: React.FC = () => {
  const [code, setCode] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 입력값과 선택값을 상태로 관리
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  // 신청 버튼 클릭 시 호출되는 함수
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 여기서 폼 제출 로직을 처리합니다 (예: API 호출)
    console.log('Submitted:', { code, selectedOption });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          핑크/실버 신청
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* 코드 입력창 */}
          <TextField
            label="코드를 입력하세요"
            variant="outlined"
            fullWidth
            value={code}
            onChange={handleCodeChange}
            sx={{ mb: 3 }}
          />

          {/* 라디오 버튼 그룹 */}
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">옵션 선택</FormLabel>
            <RadioGroup
              row
              name="pinkSilverOption"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel value="핑크" control={<Radio />} label="핑크" />
              <FormControlLabel value="실버" control={<Radio />} label="실버" />
            </RadioGroup>
          </FormControl>

          {/* 신청 버튼 */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            신청하기
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterMemberStatus;