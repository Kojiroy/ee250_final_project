/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-motion-sensor
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#define STASSID "iPhone"
#define STAPSK "kojirocks"

String serverName = "http://172.20.10.4:3000/api";

const char* ssid = STASSID;
const char* password = STAPSK;

// API POST request delay
unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

const int MOTION = 4;   // Motion Sensor digital pin
const int BUTTON = 14;  // Button digital pin
const int LIGHT = A0;   // Light sensor analog pin
int curMotion   = LOW; // current state of pin
int prevMotion  = LOW; // previous state of pin

const String sensors[3] = {"light", "motion", "button"}; // Names of sensors
int sensorVals[3] = {0, 0, 0}; // Initial values of sensors

void setup() {
  Serial.begin(9600);            // initialize serial
  Serial.println("In setup");

  pinMode(MOTION, INPUT);
  pinMode(BUTTON, INPUT);
  pinMode(LIGHT, INPUT);

  // Connecting to WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  // Finished Connecting to WiFi
}

void loop() {
  sensorVals[0] = analogRead(LIGHT);
  // Only updates if the value was 0. Makes button and motion values hold state until data is sent
  if (sensorVals[1] == 0) {
    prevMotion = curMotion; // store old state
    curMotion = digitalRead(MOTION);   // read new state
    if (prevMotion == LOW && curMotion == HIGH) {   // pin state change: LOW -> HIGH
      sensorVals[1] = 1;
      Serial.println("Motion detected!");
    }
    else
    if (prevMotion == HIGH && curMotion == LOW) {   // pin state change: HIGH -> LOW
      sensorVals[1] = 0;
      Serial.println("Motion stopped!");
    }
  }
  if (sensorVals[2] == 0) {
    sensorVals[2] = digitalRead(BUTTON);
  }
  Serial.print("Light Val: ");
  Serial.println(sensorVals[0]);
  Serial.print("Motion Val: ");
  Serial.println(sensorVals[1]);
  Serial.print("Button Val: ");
  Serial.println(sensorVals[2]);
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    for (int i = 0; i<3; i++) {
      if(WiFi.status()== WL_CONNECTED){
        WiFiClient client;
        HTTPClient http;
        String serverPath = serverName + "/addData/" + sensors[i] + "/ESP8266/" + sensorVals[i];
        sensorVals[i] = 0; // Reset all sensor values
        http.begin(client, serverPath.c_str());
        int httpResponseCode = http.GET();
        if (httpResponseCode>0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.print("Error code: ");
          Serial.println(httpResponseCode);
        }
        // Free resources
        http.end();
      }
      else {
        Serial.println("WiFi Disconnected");
      }
      lastTime = millis();
    }
  }
  delay(100);
}
