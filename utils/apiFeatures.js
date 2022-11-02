class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1. BUILD QUERY
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    /**
     * { difficulty: 'easy', duration: { 'gte': '5' } }
     * { difficulty: 'easy', duration: { '$gte': '5' } }
     */
    let queryStringify = JSON.stringify(queryObj);
    queryStringify = queryStringify.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    queryStringify = JSON.parse(queryStringify);
    this.query.find(queryStringify);
    return this;
  }

  sort() {
    // SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFeilds() {
    // LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // PAGINATION
    const currentPage = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (currentPage - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
