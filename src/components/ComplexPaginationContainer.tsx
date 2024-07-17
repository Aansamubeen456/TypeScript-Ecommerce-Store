import {
  constructPrevOrNextUrl,
  constructUrl,
  ProductsResponseWithParams,
} from '@/utils';
import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

function ComplexPaginationContainer() {
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();

  if (pageCount < 2) return null;

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }): React.ReactNode => {
    const url = constructUrl({ pageNumber, pathname, search });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink href={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPagination = () => {
    let pages: React.ReactNode[] = [];

    // FIRST PAGE
    pages.push(constructButton({ isActive: page === 1, pageNumber: 1 }));

    // ELLIPSIS
    if (page > 2) {
      pages.push(constructEllipsis('dots-1'));
    }

    // ACTIVE PAGE
    if (page !== 1 && page !== pageCount) {
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    }

    // ELLIPSIS
    if (page < pageCount - 1) {
      pages.push(constructEllipsis('dots-2'));
    }

    // Last PAGE
    pages.push(
      constructButton({ isActive: page === pageCount, pageNumber: pageCount })
    );

    // console.log(pages);
    return pages;
  };
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevUrl} />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext href={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ComplexPaginationContainer;
