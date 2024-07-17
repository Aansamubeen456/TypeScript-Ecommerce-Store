import { useState } from 'react';
import { Label } from './ui/label';
import { formatDollars } from '@/utils';
import { Slider } from './ui/slider';

type FormRangeProps = {
  name: string;
  defaultValue?: string;
  label?: string;
};

function FormRange({ name, defaultValue, label }: FormRangeProps) {
  const step = 1000;
  const maxPrice = 100000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;

  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize flex justify-between">
        {label || name}
        <span>{formatDollars(selectedPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className="mt-4"
      />
    </div>
  );
}

export default FormRange;
