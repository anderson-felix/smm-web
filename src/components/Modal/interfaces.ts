export interface IModalProps {
  show: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  width?: string;
  style?: React.CSSProperties;
}
