import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea } from '@mui/material';

interface Group {
  groupId: number;
  groupName: string;
  groupMemberCount: number;
}

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const { groupId, groupName, groupMemberCount } = group;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardActionArea href={`/group/info/${groupId}`}>
        <Card style={{ borderColor: '#344e41', borderWidth: 2, borderStyle: 'solid' }}>
          <CardContent>
            <Typography variant="h6">{groupName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {groupMemberCount}명
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default GroupCard;