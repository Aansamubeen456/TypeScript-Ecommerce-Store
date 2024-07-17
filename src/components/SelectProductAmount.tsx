import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (vlaue: number) => void;
};

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

function SelectProductAmount({
  mode,
  amount,
  setAmount,
}: SelectProductAmountProps | SelectCartItemAmountProps) {
  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className="font-medium mb-2">Amount: </h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger className={cartItem ? 'w-[75px]' : 'w-[150px]'}>
          <SelectValue placeholder={amount} />
          <SelectContent>
            {Array.from({ length: cartItem ? amount + 10 : 10 }).map(
              (_, index) => {
                const selectValue = (index + 1).toString();
                return (
                  <SelectItem key={index} value={selectValue}>
                    {selectValue}
                  </SelectItem>
                );
              }
            )}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </>
  );
}

export default SelectProductAmount;
