import React from 'react';
type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  // it is type for usestate hook
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

function SelectProductColor({
  colors,
  productColor,
  setProductColor,
}: SelectProductColorProps) {
  return (
    <div className="mt-6">
      <h4 className="text-mf font-medium tracking-wider capitalize">colors</h4>
      {colors.map((color) => {
        return (
          <button
            type="button"
            key={color}
            className={`rounded-full mr-2 w-6 h-6 border-2 ${
              color === productColor && 'border-primary'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setProductColor(color)}
          ></button>
        );
      })}
    </div>
  );
}

export default SelectProductColor;
