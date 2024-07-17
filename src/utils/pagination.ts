type ConstructUrlParams = {
  pageNumber: number;
  search: string;
  pathname: string;
};

export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams): string => {
  const serachparams = new URLSearchParams(search);
  serachparams.set('page', pageNumber.toString());

  return `${pathname}?${serachparams.toString()}`;
};

type constructPrevOrNextUrlParams = {
  currentPage: number;
  pageCount: number;
  search: string;
  pathname: string;
};

export const constructPrevOrNextUrl = ({
  search,
  pathname,
  pageCount,
  currentPage,
}: constructPrevOrNextUrlParams): { prevUrl: string; nextUrl: string } => {
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = pageCount;
  const prevUrl = constructUrl({ search, pathname, pageNumber: prevPage });

  let nextPage = currentPage + 1;
  if (nextPage > pageCount) nextPage = 1;
  const nextUrl = constructUrl({ search, pathname, pageNumber: nextPage });

  return { nextUrl, prevUrl };
};
