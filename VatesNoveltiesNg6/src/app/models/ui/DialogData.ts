export interface IPromtDialogData {
  title: string;
  message: string;
  comments?: string;
  inputPlaceholder?: string;
}

export interface DialogMessageData {
  title: string;
  message: string;
  btnButton: string;
}

export interface IDialogNovely {
  id: number;
  comments?: string;
}
