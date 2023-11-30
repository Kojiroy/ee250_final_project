docker run -d --name=mysql-sensor-db -p 3307:3306 -v sensor_db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=your_password mysql_sensor
# docker run -d --name=mysql-sensor-db -p 3307:3306 -e MYSQL_ROOT_PASSWORD=your_password mysql_sensor
