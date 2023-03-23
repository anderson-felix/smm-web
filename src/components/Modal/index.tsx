import React from 'react';
import { Modal as AntModal } from 'antd';
import { IModalProps } from './interfaces';

export const Modal: React.FC<IModalProps> = ({
  show,
  title,
  onConfirm,
  onCancel,
  loading = false,
  children,
  width,
  style,
}) => {
  return (
    <AntModal
      title={title}
      open={show}
      onOk={onConfirm}
      confirmLoading={loading}
      onCancel={onCancel}
      width={width}
      style={style}
    >
      {children}
    </AntModal>
  );
};
