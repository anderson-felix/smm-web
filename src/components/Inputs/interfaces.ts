export interface InputProps {
  value: string;
  onInputChange: (value: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
  style?: React.CSSProperties;
}

export type SelectOption = { value: string; label: string };
export type CustomTagProps = SelectOption & {
  closable: boolean;
  onClose: () => void;
};
export interface ISelectInputParams {
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
  isMulti?: boolean;
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  tagRender?: (props: CustomTagProps) => React.ReactElement;
}
