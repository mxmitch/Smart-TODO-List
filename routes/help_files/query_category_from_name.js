const queryCategoryFromName = function(db, name) {
  const queryString = `
    SELECT id
      FROM categories
      WHERE category_name = $1;
  `;
  const queryParams = [name];


  return (
    db.query(queryString, queryParams)
      .then((res) => {
        console.log("done query", res.rows[0].id)
        return res.rows[0]})
  );
};

module.exports = {
  queryCategoryFromName,
}
