CREATE TABLE IF NOT EXISTS comics (
    comic_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comic_name VARCHAR(16) NOT NULL,
    comic_description VARCHAR(64),
    file_paths JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS archive (
    archive_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    archive_name VARCHAR(16) NOT NULL,
    archive_description VARCHAR(64),
    file_paths JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS wip (
    wip_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    wip_name VARCHAR(16) NOT NULL,
    wip_description VARCHAR(64),
    file_paths JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS updates (
    update_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    update_date datetime DEFAULT CURRENT_TIMESTAMP,
    update_name VARCHAR(16) NOT NULL,
    update_description VARCHAR(64)
);