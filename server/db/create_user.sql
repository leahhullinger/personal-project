INSERT INTO UserAuth
(username, password, email)
VALUES
( $1, $2, $3)
RETURNING *