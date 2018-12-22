UPDATE Uploads 
SET title = $2 AND date = $3 AND notes = $4 AND transcript = $5
WHERE id = $1 AND user_id = $6