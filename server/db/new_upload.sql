INSERT INTO Uploads (title, date, notes, filename, filetype, s3_url, transcript, folder_id, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *