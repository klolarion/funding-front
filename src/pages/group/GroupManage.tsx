import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 그룹 정보 타입 정의
interface Group {
  groupId: string;
  groupName: string;
  createdDate: string;
}

// 샘플 그룹 데이터
const myGroups: Group[] = [
  { groupId: '1', groupName: '내가 만든 그룹 1', createdDate: '2023-08-01' },
  { groupId: '2', groupName: '내가 만든 그룹 2', createdDate: '2023-08-10' },
];

const joinedGroups: Group[] = [
  { groupId: '3', groupName: '가입한 그룹 1', createdDate: '2023-07-15' },
  { groupId: '4', groupName: '가입한 그룹 2', createdDate: '2023-07-20' },
];

const GroupManagementPage: React.FC = () => {
  const [myGroupList, setMyGroupList] = useState<Group[]>(myGroups);
  const [joinedGroupList, setJoinedGroupList] = useState<Group[]>(joinedGroups);
  const navigate = useNavigate();

  // 그룹 클릭 시 상세 페이지로 이동하는 함수
  const handleGroupClick = (groupId: string) => {
    // navigate('/mypage')}
    navigate(`/groups/${groupId}`);
  };
  

  return (
    
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          그룹 관리
        </Typography>
        
        {/* 그룹 생성하기 버튼 */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/group/create')} 
          sx={{ mb: 4, backgroundColor: '#4949cc', '&:hover': { backgroundColor: '#3b3bb2' } }}
        >
          그룹 생성하기
        </Button>

        {/* 내가 만든 그룹 리스트 */}
        <Typography variant="h5" gutterBottom>
          내가 만든 그룹
        </Typography>
        <Grid container spacing={2}>
          {myGroupList.map((group) => (
            <Grid item xs={12} md={6} key={group.groupId}>
              <Card
                sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => navigate('/group/detail')} 
                // onClick={() => handleGroupClick(group.groupId)} // 그룹 클릭 시 상세 페이지로 이동
              >
                <CardContent>
                  <Typography variant="h6">{group.groupName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    생성일: {group.createdDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 내가 가입한 그룹 리스트 */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          내가 가입한 그룹
        </Typography>
        <Grid container spacing={2}>
          {joinedGroupList.map((group) => (
            <Grid item xs={12} md={6} key={group.groupId}>
              <Card
                sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => navigate('/group/detail')}
                // onClick={() => handleGroupClick(group.groupId)} // 그룹 클릭 시 상세 페이지로 이동
              >
                <CardContent>
                  <Typography variant="h6">{group.groupName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    가입일: {group.createdDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GroupManagementPage;