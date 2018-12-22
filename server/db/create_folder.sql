INSERT INTO Folders (folder_name, user_id)
VALUES($1, $2)
RETURNING * 