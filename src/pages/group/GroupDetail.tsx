import React from 'react';
import { Container, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

// 그룹 상세 및 멤버, 펀딩 데이터 타입 정의
interface Member {
  memberName: string;
}

interface Funding {
  fundingId: string;
  productName: string;
}

interface GroupDetail {
  groupId: string;
  groupName: string;
}

const groupDetail: GroupDetail = {
  groupId: '1',
  groupName: '내 그룹 이름',
};

const groupMembers: Member[] = [
  { memberName: '멤버 1' },
  { memberName: '멤버 2' },
  { memberName: '멤버 3' },
];

const fundingList: Funding[] = [
  { fundingId: '1', productName: '펀딩 1' },
  { fundingId: '2', productName: '펀딩 2' },
];

const GroupDetail: React.FC = () => {
  const handleJoinGroup = () => {
    // 그룹 참여 신청 로직 구현 (예: API 호출)
    alert('그룹 참여 신청이 완료되었습니다.');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          {groupDetail.groupName}
        </Typography>

        {/* 그룹 멤버 리스트 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            그룹 멤버
          </Typography>
          {groupMembers.length > 0 ? (
            <List>
              {groupMembers.map((member, index) => (
                <ListItem key={index}>
                  <ListItemText primary={member.memberName} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              그룹 멤버가 없습니다.
            </Typography>
          )}
        </Box>

        {/* 그룹 참여하기 */}
        <Box mb={4} id="create-group">
          <Typography variant="h5" gutterBottom>
            그룹 참여하기
          </Typography>
          <Button variant="contained" color="primary" onClick={handleJoinGroup}>
            신청
          </Button>
        </Box>

        {/* 그룹이 참여하고 있는 펀딩 리스트 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            그룹이 참여하고 있는 펀딩
          </Typography>
          {fundingList.length > 0 ? (
            <List>
              {fundingList.map((funding) => (
                <ListItem key={funding.fundingId}>
                  <Button
                    component="a"
                    href={`/detail/${funding.fundingId}`}
                    sx={{ textTransform: 'none' }}
                    variant="outlined"
                    color="primary"
                  >
                    {funding.productName}
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              그룹이 참여하고 있는 펀딩이 없습니다.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default GroupDetail;