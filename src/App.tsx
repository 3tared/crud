import { ChangeEvent, FormEvent, useState } from 'react'; // Import the useState hook

// Import the ProductCard component
import { ProductCard } from './components';

// Import the Modal component
import Modal from './components/ui/Modal';

// Import the productList data
import { productList } from './data/product';

// Import the Button component
import Button from './components/ui/Button';

// Import the formData data
import { formData } from './data/from';

// Import the Input component
import Input from './components/ui/Input';
import { IProdcut } from './types/ProductInterface';
import { productValidation } from './validation/productValidation';
import ErrorsMessage from './components/ErrorsMessage';
import { colors } from './data/colors';
import CircleColors from './components/CircleColors';
import { v4 as uuidv4 } from 'uuid';
import Select from './components/ui/Select';
import { categories } from './data/categories';
import { TProductName } from './types/productNameTypes';

import toast, { Toaster } from 'react-hot-toast';

function App() {
  const defaultProductObj = {
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    colors: [],
    category: {
      name: '',
      image: '',
    },
  };

  const defaultErrorsObj = {
    title: '',
    description: '',
    imageUrl: '',
    price: '',
  };

  const [isOpen, setIsOpen] = useState(false); // Declare a state variable to track the modal's open/closed state
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [tempColorError, setTempColorError] = useState('');
  const [products, setProducts] = useState<IProdcut[]>(productList);
  const [product, setProduct] = useState<IProdcut>(defaultProductObj);
  const [productEdit, setProductEdit] = useState<IProdcut>(defaultProductObj);
  const [productEditIndex, setProductEditIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [errors, setErrors] = useState(defaultErrorsObj);

  function closeModal() {
    setIsOpen(false); // Function to close the modal by setting the isOpen state to false
  }

  function openModal() {
    setIsOpen(true); // Function to open the modal by setting the isOpen state to true
  }

  function closeEditModal() {
    setIsOpenEdit(false); // Function to close the Edit modal by setting the isOpen state to false
  }

  function openEditModal() {
    setIsOpenEdit(true); // Function to open the Edit modal by setting the isOpen state to true
  }

  function closeConfirmModal() {
    setIsOpenConfirm(false); // Function to close the Edit modal by setting the isOpen state to false
  }

  function openConfirmModal() {
    setIsOpenConfirm(true); // Function to open the Edit modal by setting the isOpen state to true
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  }

  function onChangeEditHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProductEdit({
      ...productEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  }

  function onCancel() {
    setProduct(defaultProductObj);
    closeModal();
  }

  function onEditCancel() {
    setProductEdit(defaultProductObj);
    closeEditModal();
  }

  function submitHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { title, description, imageUrl, price } = product;
    const errors = productValidation({
      title,
      description,
      imageUrl,
      price,
    });

    const detectErrMsg =
      Object.values(errors).some((value) => value === '') &&
      Object.values(errors).every((value) => value === '');

    if (!detectErrMsg) {
      setErrors(errors);
      return;
    }

    if (!tempColor[0]) {
      setTempColorError('You Must Have At Least One Color');
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuidv4(),
        colors: tempColor,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColor([]);
    setTempColorError('');
    closeModal();
    toast.success('Product Has Been Added!', {
      style: {
        border: '1px solid #008000',
        padding: '16px',
        color: '#000000',
      },
      iconTheme: {
        primary: '#008000',
        secondary: '#FFFAEE',
      },
    });
  }
  function submitEditHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { title, description, imageUrl, price } = productEdit;
    const errors = productValidation({
      title,
      description,
      imageUrl,
      price,
    });

    const detectErrMsg =
      Object.values(errors).some((value) => value === '') &&
      Object.values(errors).every((value) => value === '');

    if (!detectErrMsg) {
      setErrors(errors);
      return;
    }

    // if (!tempColor[0]) {
    //   setTempColorError('You Must Have At Least One Color');
    //   return;
    // }

    const updatedProducts = [...products];
    updatedProducts[productEditIndex] = {
      ...productEdit,
      colors: tempColor.concat(productEdit.colors),
    };
    setProducts(updatedProducts);

    setProductEdit(defaultProductObj);
    setTempColor([]);
    setTempColorError('');
    closeEditModal();
    toast.success('Product Has Been Edited!', {
      style: {
        border: '1px solid #008000',
        padding: '16px',
        color: '#000000',
      },
      iconTheme: {
        primary: '#008000',
        secondary: '#FFFAEE',
      },
    });
  }

  // Function to render the form inputs using the formData
  const renderFromData = formData.map((input) => (
    <div className="flex flex-col space-x-2" key={input.id}>
      {/* Create a label for the input */}
      <label
        htmlFor={input.id}
        className="mb-2 text-sm text-gray-700 font-medium"
      >
        {input.label}
      </label>

      {/* Render the Input component */}
      <Input
        type={input.type} // Set the input type based on the input data
        placeholder={input.placeholder} // Set the input placeholder based on the input data
        name={input.name} // Set the input name based on the input data
        id={input.id} // Set the input ID based on the input data
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorsMessage message={errors[input.name]} />
    </div>
  ));

  // Function to render the product list using the productList
  const renderProductList = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductEdit={setProductEdit}
      openEditModal={openEditModal}
      index={index}
      setProductEditIndex={setProductEditIndex}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColors
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductToEditInputs = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col space-x-2">
        {/* Create a label for the input */}
        <label htmlFor={id} className="mb-2 text-sm text-gray-700 font-medium">
          {label}
        </label>

        {/* Render the Input component */}
        <Input
          type={'text'} // Set the input type based on the input data
          name={name} // Set the input name based on the input data
          id={id} // Set the input ID based on the input data
          value={productEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorsMessage message={errors[name]} />
      </div>
    );
  };

  const removeProductHandler = () => {
    const filterd = products.filter((product) => product.id !== productEdit.id);
    setProducts(filterd);
    closeConfirmModal();
    toast.success('Product Has Been Deleted!', {
      style: {
        border: '1px solid #008000',
        padding: '16px',
        color: '#000000',
      },
      iconTheme: {
        primary: '#008000',
        secondary: '#FFFAEE',
      },
    });
  };

  const url = 'https://github.com/3tared/crud';

  // Alternatively, directly define the URL within the onClick handler
  const buttonClickHandler = () => {
    window.open(url, '_blank');
  };

  return (
    <main className="container">
      <div className="flex items-center justify-between mt-5 mb-40">
        <div className="font-bold w-16 h-16 bg-slate-950 flex items-center justify-center rounded-full">
          <span className="text-green-700 text-[20px]">C</span>{' '}
          <span className="text-orange-700 text-[20px]">R</span>
          <span className="text-cyan-700 text-[20px]">U</span>{' '}
          <span className="text-red-700 text-[20px]">D</span>
        </div>
        <Button
          className="bg-black text-white "
          width="w-fit"
          onClick={buttonClickHandler}
        >
          My Github!
        </Button>
      </div>

      {/* Button to open the modal */}
      <div className="flex items-center justify-between mt-5">
        <h1 className="font-bold text-[28px] md:text-[35px] lg:text-[45px] ">
          <span className="text-indigo-700">Latest</span>Products
        </h1>
        <Button
          className="bg-indigo-700 text-white"
          width="w-fit"
          onClick={openModal}
        >
          Add New Product
        </Button>
      </div>

      {/* Display the product list */}
      <div className="grid grid-cols-1 gap-3 md:gap-5 p-5 md:grid-cols-3 lg:grid-cols-4 ">
        {renderProductList}
      </div>

      {/* Render the Modal component */}
      <Modal
        isOpen={isOpen} // Control the modal's visibility using the isOpen state
        closeModal={closeModal} // Pass the closeModal function to handle closing the modal
        title="Create A New Product" // Set the modal title
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {/* Render the form inputs inside the modal */}
          {renderFromData}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center space-x-1 flex-wrap ">
            {renderProductColors}
            {!tempColor[0] ? <ErrorsMessage message={tempColorError} /> : null}
          </div>
          <div className="flex items-center space-x-1 flex-wrap ">
            {tempColor.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="mr-1 p-1 mb-1 text-xs rounded-md text-white"
              >
                {color}
              </span>
            ))}
          </div>
          {/* Container for submit and cancel buttons */}
          <div className="flex items-center space-x-3 mt-5">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 text-white"
              width="w-full"
            >
              Submit
            </Button>

            {/* Cancel button to close the modal */}
            <Button
              type="button"
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Render the Edit Modal component */}
      <Modal
        isOpen={isOpenEdit} // Control the modal's visibility using the isOpen state
        closeModal={closeEditModal} // Pass the closeModal function to handle closing the modal
        title="Edit This Product" // Set the modal title
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductToEditInputs('title', 'Product Title', 'title')}
          {renderProductToEditInputs(
            'description',
            'Product Description',
            'description'
          )}
          {renderProductToEditInputs('imageUrl', 'Product Image', 'imageUrl')}
          {renderProductToEditInputs('price', 'Product Price', 'price')}
          <Select
            selected={productEdit.category}
            setSelected={(value) =>
              setProductEdit({ ...productEdit, category: value })
            }
          />
          <div className="flex items-center space-x-1 flex-wrap ">
            {renderProductColors}
            {!tempColor[0] ? <ErrorsMessage message={tempColorError} /> : null}
          </div>
          <div className="flex items-center space-x-1 flex-wrap ">
            {tempColor.concat(productEdit.colors).map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="mr-1 p-1 mb-1 text-xs rounded-md text-white"
              >
                {color}
              </span>
            ))}
          </div>
          {/* Container for submit and cancel buttons */}
          <div className="flex items-center space-x-3 mt-5">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 text-white"
              width="w-full"
            >
              Submit
            </Button>

            {/* Cancel button to close the modal */}
            <Button
              className="bg-red-700 hover:bg-red-800 text-white"
              width="w-full"
              onClick={onEditCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenConfirm} // Control the modal's visibility using the isOpen state
        closeModal={closeEditModal} // Pass the closeModal function to handle closing the modal
        title="Are you sure you want to remove this Product from your Store?" // Set the modal title
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-[#f5f5fa] hover:bg-gray-300 text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
