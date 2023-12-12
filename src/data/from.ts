import { IForm } from '../types/formInterface';

export const formData: IForm[] = [
  {
    id: 'title',
    name: 'title',
    label: 'Product Title',
    placeholder: 'Type Product Title',
    type: 'text',
  },
  {
    id: 'description',
    name: 'description',
    label: 'Product Description',
    placeholder: 'Type Product Description',
    type: 'text',
  },
  {
    id: 'image',
    name: 'imageUrl',
    label: 'Product Image Url',
    placeholder: 'Type Product Image Url',
    type: 'text',
  },
  {
    id: 'price',
    name: 'price',
    label: 'Product Price',
    placeholder: 'Type Product Price',
    type: 'string',
  },
];
