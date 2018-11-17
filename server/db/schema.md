TABLE Users (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(40),
username VARCHAR(30),
password VARCHAR(30),
email VARCHAR(50)
);

// Users create folders to store events that relate to each other

CREATE TABLE Folders (
id SERIAL PRIMARY KEY,
folder_name VARCHAR (50),
description VARCHAR(300),
user_id INT FOREIGN KEY REFERENCES Users(id)
)

// An event is an upload post

CREATE TABLE Events (
id SERIAL PRIMARY KEY,
upload_date DATE,
upload_time TIME,
event_date DATE,
event_time TIME,
user_id INT FOREIGN KEY REFERENCES Users(id)
folder_id INT FOREIGN KEY REFERENCES Folders(id)
)

// Image, Audio, Video Files

CREATE TABLE Media (
id SERIAL PRIMARY KEY,
file_name VARCHAR(500),
file_type VARCHAR(50),
file_orig TEXT,
file_transform TEXT,
upload_date DATE,
upload_time TIME,
event_id INT FOREIGN KEY REFERENCES (id),
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
