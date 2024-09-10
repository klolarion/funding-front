import React, { useState } from 'react';
import { Container, Box, Typography, TextField, List, ListItem, ListItemText, Button, Grid } from '@mui/material';

// 데이터 타입 정의
interface Friend {
  memberId: string;
  memberName: string;
}

interface Request {
  requesterId: string;
  requesterName: string;
}

// 샘플 데이터
const myFriends: Friend[] = [
  { memberId: '1', memberName: '친구 1' },
  { memberId: '2', memberName: '친구 2' },
];

const myRequests: Request[] = [
  { requesterId: '3', requesterName: '요청자 1' },
  { requesterId: '4', requesterName: '요청자 2' },
];

const FriendMain: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(myFriends);
  const [requests, setRequests] = useState<Request[]>(myRequests);
  const [searchName, setSearchName] = useState('');
  const [newFriendId, setNewFriendId] = useState('');

  // 친구 차단 핸들러
  const handleBlockFriend = (memberId: string) => {
    setFriends(friends.filter(friend => friend.memberId !== memberId));
    alert('친구가 차단되었습니다.');
  };

  // 친구 요청 수락 핸들러
  const handleAcceptRequest = (requesterId: string) => {
    const acceptedRequest = requests.find(request => request.requesterId === requesterId);
    if (acceptedRequest) {
      setFriends([...friends, { memberId: acceptedRequest.requesterId, memberName: acceptedRequest.requesterName }]);
      setRequests(requests.filter(request => request.requesterId !== requesterId));
      alert('친구 요청을 수락했습니다.');
    }
  };

  // 친구 요청 거부 핸들러
  const handleRejectRequest = (requesterId: string) => {
    setRequests(requests.filter(request => request.requesterId !== requesterId));
    alert('친구 요청을 거부했습니다.');
  };

  // 친구 추가 핸들러
  const handleAddFriend = () => {
    if (newFriendId) {
      alert(`친구 ID ${newFriendId}를 추가합니다.`);
      setNewFriendId('');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom>
          친구 관리
        </Typography>

        {/* 친구 리스트 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            친구 리스트
          </Typography>
          {friends.length > 0 ? (
            <List>
              {friends.map(friend => (
                <ListItem key={friend.memberId} secondaryAction={
                  <Button variant="outlined" color="error" onClick={() => handleBlockFriend(friend.memberId)}>
                    차단
                  </Button>
                }>
                  <ListItemText primary={friend.memberName} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              친구를 만들어 보세요.
            </Typography>
          )}
        </Box>

        {/* 친구 검색 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            친구 검색
          </Typography>
          <TextField
            fullWidth
            placeholder="검색할 친구의 이름을 입력하세요."
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Box>

        {/* 받은 요청 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            받은 요청
          </Typography>
          {requests.length > 0 ? (
            <List>
              {requests.map(request => (
                <ListItem key={request.requesterId} secondaryAction={
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAcceptRequest(request.requesterId)}
                      sx={{ mr: 1 }}
                    >
                      수락
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRejectRequest(request.requesterId)}
                    >
                      거부
                    </Button>
                  </Box>
                }>
                  <ListItemText primary={request.requesterName} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              요청이 없습니다.
            </Typography>
          )}
        </Box>

        {/* 친구 추가 */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            친구 추가
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                placeholder="추가할 친구의 ID를 입력하세요."
                variant="outlined"
                value={newFriendId}
                onChange={(e) => setNewFriendId(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleAddFriend}
                disabled={!newFriendId}
              >
                추가
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default FriendMain;