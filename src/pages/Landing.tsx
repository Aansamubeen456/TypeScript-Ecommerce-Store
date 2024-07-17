import { FeaturedProducts, Hero } from '@/components';
import { customFetch } from '@/utils/customFetch';
import { ProductsResponse } from '@/utils/types';
import { LoaderFunction } from 'react-router-dom';

const url = '/products?featured=true';
export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  return { ...response.data };
};

function Landing() {
  // const result = useLoaderData() as ProductsResponse;
  // console.log(result);

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default Landing;
