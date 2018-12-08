INSERT INTO TABLE Folders (
id SERIAL PRIMARY KEY,
folder_name,
description,
user_id)
VALUES($1,$2,$3,$4)