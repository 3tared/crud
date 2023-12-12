/**
 * Validates a product object
 *
 * @param product The product object to validate
 * @returns An object containing validation errors
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}): {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
} => {
  const errors: {
    title: string;
    description: string;
    imageUrl: string;
    price: string;
  } = {
    title: '',
    description: '',
    imageUrl: '',
    price: '',
  };

  const validUrl = /^(ftp|http|https):\/\/[^ *]+$/.test(product.imageUrl);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = 'Product Title Must Be Between 10 & 80 Characters!';
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 500
  ) {
    errors.description =
      'Product Description Must Be Between 10 & 500 Characters!';
  }
  if (!product.imageUrl.trim() || !validUrl) {
    errors.imageUrl = 'Invalid Product Image Url!';
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = 'Invalid Product Price';
  }

  return errors;
};
