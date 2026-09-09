class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    Object.keys(queryCopy).forEach((key) => {
      const match = key.match(/^(\w+)\[(gt|gte|lt|lte)\]$/);
      if (match) {
        const [, field, op] = match;
        if (!queryCopy[field] || typeof queryCopy[field] !== "object") {
          queryCopy[field] = {};
        }
        queryCopy[field][op] = queryCopy[key];
        delete queryCopy[key];
      }
    });

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const filters = JSON.parse(queryStr);

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.keys(value).forEach((op) => {
          if (value[op] !== "" && !Number.isNaN(Number(value[op]))) {
            value[op] = Number(value[op]);
          }
        });
      }
    });

    this.query = this.query.find(filters);
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
