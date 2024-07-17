import { formatDollars } from '@/utils';
import { Separator } from './ui/separator';

type CartTotalRowProps = {
  label: string;
  amount: number;
  lastRow?: boolean;
};

function CartTotalRow({ label, amount, lastRow }: CartTotalRowProps) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotalRow;
