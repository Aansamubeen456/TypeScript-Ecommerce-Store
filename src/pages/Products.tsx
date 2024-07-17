import { Filters, PaginationContainer, ProductsContainer } from '@/components';
import {
  customFetch,
  ProductsResponse,
  ProductsResponseWithParams,
} from '@/utils';
import { LoaderFunction } from 'react-router-dom';

const url = '/products';

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch<ProductsResponse>(url, { params });
  // console.log(params);
  // console.log(response.data);

  return { ...response.data, params };
};

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;
