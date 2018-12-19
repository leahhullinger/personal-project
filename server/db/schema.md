TABLE Users (
id VARCHAR PRIMARY KEY,
user_name VARCHAR(40),
email VARCHAR(50)
);

CREATE TABLE Folders (
id SERIAL PRIMARY KEY,
folder_name VARCHAR (50),
user_id VARCHAR REFERENCES Users(id)
)

CREATE TABLE Posts (
id SERIAL PRIMARY KEY,
timestamp TIMESTAMP NOT NULL,
title VARCHAR(100),
date DATE,
notes TEXT,
user_id INT REFERENCES Users(id),
folder_id INT REFERENCES Folders(id)
)

CREATE TABLE Uploads (
id SERIAL PRIMARY KEY,
timestamp TIMESTAMP NOT NULL,
filename VARCHAR(500),
filetype VARCHAR(50),
s3_url VARCHAR(500),
user_id INT REFERENCES Users(id),
post_id INT REFERENCES Posts(id)
)

CREATE TABLE Transcripts (
id SERIAL PRIMARY KEY,
timestamp TIMESTAMP NOT NULL,
title VARCHAR(100),
orig_result TEXT,
transcript TEXT,
upload_id INT REFERENCES Uploads(id),
user_id INT REFERENCES Users(id)
)

// JOIN STATEMENT RETURNING FOLDER, FILES WITHIN THOSE FOLDERS, AND INDIVIDUAL FILES THAT AREN'T IN A FOLDER

=====================
PHASE 2

CREATE TABLE Contacts (
id SERIAL PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
email VARCHAR(50),
phone1 VARCHAR(20),
phone2 VARCHAR(20),

)
