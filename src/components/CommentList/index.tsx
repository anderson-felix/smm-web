import React from 'react';
import { Badge, Card, Space } from 'antd';
import moment from 'moment';
import { Container, TimeLabel } from './styles';
import { IUser } from '../../interfaces/user';
import { IOrderComment } from '../../interfaces/order';
import { formatTime } from '../../utils/formatTime';

export interface ICommentListProps {
  user: IUser;
  comments: IOrderComment[];
}

export const CommentList: React.FC<ICommentListProps> = ({
  user,
  comments,
}) => {
  return (
    <Container>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {comments.map(comment => (
          <Badge.Ribbon
            key={comment.comment_id}
            placement={comment.sender.id === user.id ? 'end' : 'start'}
            text={<TimeLabel>{formatTime(comment.created_at)}</TimeLabel>}
            color={comment.sender.id === user.id ? '#1660DC' : '#99999999'}
          >
            <Card title={comment.sender.name} size="small">
              {comment.text}
            </Card>
          </Badge.Ribbon>
        ))}
      </Space>
    </Container>
  );
};
