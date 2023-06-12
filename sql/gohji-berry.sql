CREATE TABLE IF NOT EXISTS comics (
    comic_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comic_name VARCHAR(16) NOT NULL,
    comic_description VARCHAR(64),
    file_paths JSON NOT NULL,
    file_id JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS archive (
    work_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    work_name VARCHAR(16) NOT NULL,
    work_description VARCHAR(64),
    file_paths JSON NOT NULL,
    file_id JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS updates (
    update_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    update_date datetime DEFAULT CURRENT_TIMESTAMP,
    update_name VARCHAR(16) NOT NULL,
    update_description VARCHAR(64)
);