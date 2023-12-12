import { TProductName } from './productNameTypes';

export interface IForm {
  id: string;
  name: TProductName;
  label: string;
  placeholder: string;
  type: string;
}
