UPDATE Folders
SET folder_name = $1
WHERE id = $2 AND user_id = $3
RETURNING *