export const Pagination = (data, total, paginationQuery) => {
  const { page, limit } = paginationQuery;
  const cantPages = Math.ceil(total / limit);
  return {
    totalItems: total,
    itemCount: data.length,
    itemsPerPage: limit,
    totalPages: cantPages,
    currentPage: page,
    data: data,
  };
};
