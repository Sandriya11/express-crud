

/**
 * Calculates limit and offset for pagination
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {object} { limit, offset }
 */
const getPagination = (page, limit) => {
  const limitNum = parseInt(limit) || 5;
  const pageNum = parseInt(page) || 1;
  const offset = (pageNum - 1) * limitNum;
  return { limit: limitNum, offset, currentPage: pageNum };
};

/**
 * Formats paginated response
 * @param {array} data - Fetched rows
 * @param {number} count - Total item count
 * @param {number} limit - Items per page
 * @param {number} currentPage - Page number
 * @returns {object}
 */
const formatPagination = (data, count, limit, currentPage) => ({
  users: data,
  currentPage,
  totalPages: Math.ceil(count / limit),
  totalUsers: count
});

module.exports = {
  getPagination,
  formatPagination
};
