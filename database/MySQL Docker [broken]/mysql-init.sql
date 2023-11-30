CREATE USER 'encrypted_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'encrypted_user'@'%';


CREATE TABLE encrypted_table (
    id INT PRIMARY KEY,
    name VARCHAR(255)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8 ENCRYPTION='Y';