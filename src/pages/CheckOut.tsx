import { CartTotals, CheckOutForm, SectionTitle } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/hooks';
import { ReduxStore } from '@/store';
import { LoaderFunction, redirect } from 'react-router-dom';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'please Login to continue' });
      return redirect('/login');
    }
    return null;
  };

function CheckOut() {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your Cart is Empty!" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckOutForm />
        <CartTotals />
      </div>
    </>
  );
}

export default CheckOut;
