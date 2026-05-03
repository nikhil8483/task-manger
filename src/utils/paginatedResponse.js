 const paginatedResponse = ({ data, total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    page,
    limit,
    total,
    totalPages,
    data
  };
};

export {paginatedResponse}