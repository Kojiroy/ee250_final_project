# EE250 Final Project

Members: Kojiro William Yamada

Email: kojiroy@usc.edu

---

##### Important Folders

* MySQL Docker

  * Contains Dockerfile and important code for running the MySQL docker container
* ee250

  * Contains the next.js project
* esp_arduino

  * Contains the code for the ESP8266
* rpi_code

  * Contains main.py for the Raspberry Pi 4 with the GrovePi shield

---

##### List of External Libraries

###### MySQL

* keyring_file.so Plugin

###### Next.js

* JSEncrypt
* mysql2
* next-superjson
* superjson

###### ESP8266

* ESP8266WiFi
* ESP8266HTTPClient
* WiFiClient

###### Raspberry Pi 4

* grovepi
* grove_rgb_lcd
* requests
* datetime
* dateutil
* base64
* cryptography

##### How to Compile and Run

###### MySQL Docker Container

1. Go into the project directory through the terminal
2. Run

   ```bash
   sudo chmod +x *
   ```

   to give executable permissions to all files
3. Run

   ```bash
   ./rebuild_docker.sh
   ```

   to build the docker file. It will be called mysql_sensor and will output logs as it runs to help with possible errors.
4. Run

   ```bash
   docker volume create sensor_db
   ```

   to create the docker volume for persistent data storage.
5. Run

   ```bash
   ./run.sh
   ```

   to run the MySQL Docker container.
6. Run

   ```bash
   ./exec_mysql.sh
   ```

   to get into the mysql container.
7. Run

   ```sql
   SHOW DATABASES;
   ```

   to ensure that sensor_db is there.
8. If it isn't there, then do the follow commands

   ```sql
   SET GLOBAL default_table_encryption=ON;
   CREATE SCHEMA sensor_db DEFAULT ENCRYPTION = 'Y';
   USE sensor_db;
   CREATE TABLE light_data (SensorName varchar(255), LightValue int, Date DATETIME);
   CREATE TABLE button_data (SensorName varchar(255), Count int, Date DATETIME);
   CREATE TABLE motion_data (SensorName varchar(255), MotionValue int, Date DATETIME);
   ```
9. Finally, run

   ```sql
   exit
   ```

   to get out of mysql and the docker container.

###### Run Next.js App

1. First, go to the ~/ee250 folder of the GitHub Repo and install all of the npm packages by running

   ```bash
   npm install
   ```
2. Once all of the packages are installed, you should be able to run the development environment of the app by running

   ```bash
   npm run dev
   ```
3. If there are no errors, you can go to your URL and type localhost:3000 to visit the website.

###### Compile and Upload ESP8266 Code

1. First, install the Arduino IDE from the official Arduino [website](https://www.arduino.cc/en/software)
2. Open the App and from the settings, add the following to the Additional boards manager URLs to be able to install the esp8266 library and board.

   ```
   https://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. Go to Tool->Board->Board Manager and install the esp8266 board by Espressif
4. Finally, select your version of ESP8266 board from the list of boards in Tool->Board->ESP8266. Mine was the NodeMCU 1.0 Board.
5. Change the WiFi information and IP address of the Next.js app to meet your needs.
6. Now, you should be able to upload the code to the ESP 8266 by selecting the correct PORT and hitting the upload button on the top left. Once the ESP8266 is running, you can view the serial port to see when it connects to WiFi and what data it sends to the Next.js app.

###### Run Code on Raspberry Pi 4

1. Change line 47 to have the correct URL of the website. **ONLY** change the line up to the port number.
2. Assuming all libraries have been installed, from within the Raspberry Pi, run the code from the directory of main.py file

   ```bash
   python3 main.py 
   ```

   Now, your Raspberry Pi should update in real time according to the sensor information sent from the ESP8266.

##### Demo Videos (Already Demoed In-Person)

Video Demo Link #1: [https://drive.google.com/file/d/1vYB9CGdMPJvBB61H5f40eCEapmOfxLsA/view?usp=sharing](https://drive.google.com/file/d/1vYB9CGdMPJvBB61H5f40eCEapmOfxLsA/view?usp=sharing)

Video Demo Link #2: [https://drive.google.com/file/d/1FjzdnrbH6VpSwjz012tLWAUfyM7Y5LhQ/view?usp=sharing](https://drive.google.com/file/d/1FjzdnrbH6VpSwjz012tLWAUfyM7Y5LhQ/view?usp=sharing)

Note:

* I already demoed this in-person and got full credit, but I wasn't satisfied with how it turned out so I continued working on it throughout the week. The end result is fairly similar, although a bit cleaner in the UI and encryption.
* In the video, I make a few mistakes because I was tired but I didn’t record it again because I felt that it was comprehensive enough. The few mistakes that caught my attention were when I said APT instead of API requests. I also didn’t mention the MySQL database that was hosted on a docker container nor the data-at-rest encryption of the data.
