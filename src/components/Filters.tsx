import { Form, Link, useLoaderData } from 'react-router-dom';
import { Button } from './ui/button';
import { ProductsResponseWithParams } from '@/utils';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

function Filters() {
  const { params, meta } = useLoaderData() as ProductsResponseWithParams;

  const { search, company, category, price, order, shipping } = params;
  // console.log(search);

  return (
    <Form className="border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        name="search"
        type="search"
        label="search product"
        defaultValue={search}
      />

      {/* CATEGORY */}
      <FormSelect
        name="category"
        options={meta.categories}
        label="select category"
        defaultValue={category}
      />

      {/* COMPANY */}
      <FormSelect
        name="company"
        options={meta.companies}
        label="select company"
        defaultValue={company}
      />

      {/* ORDER */}
      <FormSelect
        name="order"
        options={['a-z', 'z-a', 'high', 'low']}
        label="order by"
        defaultValue={order}
      />

      {/* PRICE RANGE */}
      <FormRange name="price" defaultValue={price} label="price" />

      {/* CHECKbox */}
      <FormCheckbox
        name="shipping"
        defaultValue={shipping}
        label="free shipping"
      />

      <Button type="submit" size="sm" className="mb-2 self-end">
        search
      </Button>
      <Button
        asChild
        type="button"
        variant="outline"
        size="sm"
        className="mb-2 self-end"
      >
        <Link to="/products">reset</Link>
      </Button>
    </Form>
  );
}

export default Filters;
