import { OrdersList, SectionTitle } from '@/components';
import ComplexPaginationContainer from '@/components/ComplexPaginationContainer';
import { toast } from '@/components/ui/use-toast';
import { ReduxStore } from '@/store';
import { customFetch, OrdersResponse } from '@/utils';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'please login to continue' });
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      return { ...response.data };
    } catch (error) {
      toast({ description: 'Failed to fetch Orders' });
      return null;
    }
  };

function Orders() {
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}

export default Orders;
