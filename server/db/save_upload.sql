INSERT INTO Uploads(filename, filetype, s3_url, post_id, user_id)
VALUES($1, $2, $3, $4, $5)
RETURNING *