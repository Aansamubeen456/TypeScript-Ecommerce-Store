import { SelectProductAmount, SelectProductColor } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CartItem,
  customFetch,
  formatDollars,
  SingleProductResponse,
} from '@/utils';
import { useState } from 'react';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import { Mode } from '@/components/SelectProductAmount';
import { useAppDispatch } from '@/hooks';
import { addItem } from '@/features/cart/cartSlice';

export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  // console.log(params);
  const { id } = params;
  const response = await customFetch<SingleProductResponse>(`/products/${id}`);

  return { ...response.data };
};

function SingleProduct() {
  const { data: product } = useLoaderData() as SingleProductResponse;

  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const cartProduct: CartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    price,
    title,
    productColor,
    amount,
    company,
  };

  const dispatch = useAppDispatch();

  const addtoCart = () => {
    dispatch(addItem(cartProduct));
  };

  return (
    <section>
      <div className="flex gap-x-2 h-6 items-center">
        <Button asChild variant="link" size="sm">
          <Link to="/">Home</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button asChild variant="link" size="sm">
          <Link to="/products">Products</Link>
        </Button>
      </div>

      {/*  PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 rounded-lg object-cover lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted rounded-md p-2 inline-block">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <SelectProductColor
            colors={colors}
            productColor={productColor}
            setProductColor={setProductColor}
          />
          {/* AMOUNT */}
          <SelectProductAmount
            amount={amount}
            setAmount={setAmount}
            mode={Mode.SingleProduct}
          />
          {/* ADD TO BAG */}
          <Button
            size="lg"
            variant="default"
            className="mt-10"
            onClick={addtoCart}
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
