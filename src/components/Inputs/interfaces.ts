export interface InputProps {
  value: string;
  onInputChange: (value: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
}
