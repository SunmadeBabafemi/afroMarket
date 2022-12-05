exports.getPaginatedRecords = async (
    model,
    { limit: specifiedLimit = 10, page, data = {}, selectedFields, exclusions }
  ) => {
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
      let result
      const count = await model.findAll({
        where: { ...data, deleted: false },
        order: [
          ["created_at", "DESC"],
        ],
      })
      const modelData =  count.length
      if(Number(modelData) > 0){
        result = await model.findAndCountAll({
          limit,
          offset,
          where: { ...data, deleted: false },
          order: [
            ["created_at", "DESC"],
          ],
          attributes:  selectedFields?selectedFields:{exclude: exclusions},
        })
      }      
      const altNoResult = {
        count: 0,
        rows: []
      }
      return {
        data: (Number(modelData)> 0)?result:altNoResult,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
};
  

exports.paginateSearchResultNoFilter = async (
    model,
    { limit: specifiedLimit = 10, page, data = {}, selectedFields }
  ) => {
    try {
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
 
      const result = await model.findAndCountAll({
        limit,
        offset,
        where: { ...data, deleted: false },
       order: [
          ['ratings', 'ASC']
        ],
        attributes: selectedFields? selectedFields: [],
      })
      const count = await model.findAll({
        where: { ...data, deleted: false },
        order: [
          ['ratings', 'ASC']
        ]
      })
      const modelData =  count.length
      return {
        data: result,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
};


exports.paginateSearchResultWithFilter = async (
    model,
    { limit: specifiedLimit = 10, page, data = {}, selectedFields, exclusions }
  ) => {
    try {
      let result
      const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
      const offset = 0 + (page - 1) * limit;
      const count = await model.findAll({
        where: { ...data, deleted: false },
         order: [
          ["created_at", "DESC"],
        ],
      })
      if(Number(count.length) > 0){
        result = await model.findAndCountAll({
          limit,
          offset,
          where: { ...data, deleted: false },
          order: [
            ["created_at", "DESC"],
          ],
          // attributes: selectedFields,
          attributes: selectedFields?selectedFields:{exclude: exclusions},
          raw: true
        })
      }
      const altNoResult = {
        count: 0,
        rows: []
      }
      const modelData =  count.length
      return {
        data: (Number(modelData)> 0)?result:altNoResult,
        total: modelData,
        currentPage: page,
        hasNext: page * limit < modelData,
        hasPrevious: page > 1,
        perPage: limit,
        totalPages: Math.ceil(modelData / limit),
      };
    } catch (err) {
      console.log(err);
    }
};


exports.paginateRaw = async function paginate(array, {limit: specifiedLimit=10, page}) {
  const pageNum = Number(page)
  const limit = Math.min(specifiedLimit, 100); // restrict limit to 100
  const result = array.slice((pageNum - 1) * limit, pageNum * limit);

  let prev_page ;
  let next_page;
  let h_p_p = null;
  let h_n_p = null;
  let page_count = Math.ceil((array.length / limit));

  if (pageNum >1 && pageNum == page_count ){  // 2 3 
    prev_page = pageNum - 1
    h_p_p = true
    h_n_p = false;
  }else if(pageNum > 1 && pageNum < page_count ){
    next_page = pageNum + 1;
    prev_page = pageNum - 1
    h_n_p = true;
    h_p_p = true
  }else if(pageNum ==1 && pageNum < page_count){
    next_page = pageNum + 1;
    h_n_p = true;
    h_p_p = false
  } 
  
      
  return {
    data: result,
    totalDocs: array.length,
    perPage: limit,
    pageCount: page_count,
    currentPage: pageNum,
    hasPrevPage: h_p_p,
    hasNextPage: h_n_p,
    prev: prev_page,
    next: next_page
  }
}