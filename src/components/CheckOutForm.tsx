import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { ReduxStore } from '@/store';
import { toast } from './ui/use-toast';
import { CheckOut, customFetch, formatDollars } from '@/utils';
import { clearCart } from '@/features/cart/cartSlice';

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const address = formData.get('name') as string;

    if (!name || !address) {
      toast({ description: 'Please provide all the fields!' });
      return null;
    }

    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please Login to place an order' });
      return redirect('/login');
    }

    const { cartItems, numItemsInCart, orderTotal } =
      store.getState().cartState;

    const info: CheckOut = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatDollars(orderTotal),
      numItemsInCart,
      cartItems,
    };

    try {
      await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      store.dispatch(clearCart());
      toast({ description: 'order Placed' });
      return redirect('/orders');
    } catch (error) {
      toast({ description: 'Order Failed' });
      return null;
    }
  };

function CheckOutForm() {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
      <FormInput name="name" type="text" label="first name" />
      <FormInput name="address" type="address" label="address" />
      <div className="mt-4">
        <SubmitBtn className="w-full mt-4" text="Place Your Order" />
      </div>
    </Form>
  );
}

export default CheckOutForm;
