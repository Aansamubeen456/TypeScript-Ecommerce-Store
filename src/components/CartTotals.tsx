import { useAppSelector } from '@/hooks';
import { Card, CardTitle } from './ui/card';
import CartTotalRow from './CartTotalRow';

function CartTotals() {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className="p-8 bg-muted">
      <CartTotalRow label="SubTotal" amount={cartTotal} />
      <CartTotalRow label="Shipping" amount={shipping} />
      <CartTotalRow label="Tax" amount={tax} />

      <CardTitle className="mt-8">
        <CartTotalRow label="Order Total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

export default CartTotals;
