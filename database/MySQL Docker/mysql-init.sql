CREATE USER 'encrypted_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'encrypted_user'@'%';

-- INSTALL PLUGIN keyring_file SONAME 'keyring_file.so';

SET GLOBAL default_table_encryption=ON;
CREATE SCHEMA sensor_db DEFAULT ENCRYPTION = 'Y';
USE sensor_db;
CREATE TABLE light_data (SensorName varchar(255), LightValue int, Date DATETIME);
CREATE TABLE button_data (SensorName varchar(255), Count int, Date DATETIME);
CREATE TABLE motion_data (SensorName varchar(255), MotionValue int, Date DATETIME);