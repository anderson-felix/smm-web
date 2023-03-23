import React, { useState } from 'react';
import { Badge, Button, Card, Space } from 'antd';

import { CommentInputArea, Container, TimeLabel } from './styles';
import { IUser } from '../../interfaces/user';
import { IOrder, IOrderComment } from '../../interfaces/order';
import { formatTime } from '../../utils/formatTime';
import { ISubmitCommentParams } from '../../interfaces/comment';
import { TextInput } from '../Inputs';

export interface ICommentListProps {
  user: IUser;
  order: IOrder;
  comments: IOrderComment[];
  onSubmitComment: (params: ISubmitCommentParams) => void;
}

export const CommentList: React.FC<ICommentListProps> = ({
  user,
  comments,
  order,
  onSubmitComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!newComment) {
      setError('Campo vazio');
      return;
    }

    onSubmitComment({ order_id: order.id, text: newComment });
    setError('');
    setNewComment('');
  };

  return (
    <Container>
      <CommentInputArea>
        <TextInput
          value={newComment}
          onInputChange={setNewComment}
          placeholder="Escreva um comentário"
          error={error}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <Button onClick={handleSubmit}>Enviar</Button>
      </CommentInputArea>
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
