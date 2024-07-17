import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { ProductsResponse } from '@/utils';
import { Button } from './ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { Separator } from './ui/separator';

function ProdcutsContainer() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const { meta } = useLoaderData() as ProductsResponse;
  const totalProducts = meta.pagination.total;

  return (
    <>
      {/* header */}
      <section>
        <div className="flex justify-between mt-8 items-center">
          <h4 className="font-medium text-md">
            {totalProducts} Product{totalProducts > 1 && 's'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => {
                setLayout('grid');
                // console.log('grid layout');
              }}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => {
                setLayout('list');
                // console.log('list layout');
              }}
            >
              <List />
            </Button>
          </div>
        </div>
        <Separator className="mt-8" />
      </section>

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, No product matches with your search
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
}

export default ProdcutsContainer;
