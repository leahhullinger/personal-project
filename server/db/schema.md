TABLE Users (
id VARCHAR PRIMARY KEY,
user_name VARCHAR(40),
email VARCHAR(50)
);

// Users create folders to store events that relate to each other

CREATE TABLE Folders (
id SERIAL PRIMARY KEY,
folder_name VARCHAR (50),
user_id VARCHAR REFERENCES Users(id)
)

// An event is an upload post

CREATE TABLE Files (
id SERIAL PRIMARY KEY,
date DATE,
notes TEXT,
user_id VARCHAR REFERENCES Users(id),
folder_id INT REFERENCES Folders(id)
)

// Image, Audio, Video Files

CREATE TABLE Media (
id SERIAL PRIMARY KEY,
name VARCHAR(500),
type VARCHAR(50),
url VARCHAR(500),
user_id VARCHAR REFERENCES Users(id),
file_id INT REFERENCES Files(id)
)

CREATE TABLE Notes (
id SERIAL PRIMARY KEY,
note TEXT,
media_id INT REFERENCES Media(id),
user_id INT FOREIGN KEY REFERENCES Users(id),
event_id INT FOREIGN KEY REFERENCES Events(id)
)

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
