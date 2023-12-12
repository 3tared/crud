import { Img } from '.';
import { IProdcut } from '../types/ProductInterface';
import { txtSlicer, numberWithCommas } from '../utils/functions';
import CircleColors from './CircleColors';
import Button from './ui/Button';

interface Iprops {
  product: IProdcut;
  setProductEdit: (product: IProdcut) => void;
  openEditModal: () => void;
  setProductEditIndex: (value: number) => void;
  index: number;
  openConfirmModal: () => void;
}

function ProductCard({
  product,
  setProductEdit,
  openEditModal,
  setProductEditIndex,
  index,
  openConfirmModal,
}: Iprops) {
  const { title, description, imageUrl, category, colors, price } = product;
  const { image, name } = category;

  const renderProductColors = colors.map((color) => (
    <CircleColors color={color} key={color} />
  ));

  const onEdit = () => {
    setProductEdit(product);
    openEditModal();
    setProductEditIndex(index);
  };

  const onRemove = () => {
    setProductEdit(product);
    openConfirmModal();
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border p-2 rounded-lg flex flex-col shadow-md md:justify-between">
      <Img src={imageUrl} alt={title} className="rounded-lg mb-4" />
      <h3 className="text-[19px] font-semibold text-gray-700">{title}</h3>
      <p className="my-4 font-[13px] capitalize ">
        {txtSlicer(description, 100)}
      </p>
      <div className="flex items-center space-x-3">
        <div className="flex items-center flex-wrap space-x-1">
          {!colors.length ? (
            <p className="min-h-[20px]">Not available colors!</p>
          ) : (
            renderProductColors
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <span className="font-semibold text-[20px] text-indigo-700">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{name}</span>
          <Img
            src={image}
            alt={name}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-5">
        <Button className="bg-indigo-700 text-white" onClick={onEdit}>
          Edit
        </Button>
        <Button
          className="bg-red-700 text-white"
          width="w-full"
          onClick={onRemove}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
