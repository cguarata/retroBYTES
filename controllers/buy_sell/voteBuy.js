SELECT products.id, products.name, products.date, products.user_id, AVG(IFNULL(products_votes.vote, 0)) AS votes
FROM products
LEFT JOIN products_votes ON (products.id = products_votes.product_id)
WHERE products.place LIKE ? OR products.description LIKE ? 
GROUP BY products.id
ORDER BY ${orderBy} ${orderDirection}
ç

AVG(IFNULL(products_votes.vote, 0)) AS votes