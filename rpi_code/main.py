import datetime
import grovepi
import base64
import requests
from dateutil import parser
import grove_rgb_lcd as lcd
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes

LCD_LINE_LEN = 16
lcd_colors = [[255,0,0], [0,255,0], [0,0,255], [255,255,255]]

# Connect the Grove Buzzer to digital port D8
# SIG,NC,VCC,GND
buzzer = 4
grovepi.pinMode(buzzer,"OUTPUT")

SENSORS = ["light", "motion", "button"]
SENSOR_VALS = ["LightValue", "MotionValue", "Count"]
prevData = [-1] * 3
curData = []

alarmState = 0 # 1 for on and 0 for off
alarmStart = 0 # How many seconds the alarm has been on for
curTime = 0


def decrypt(encrypted_message):
    global private_key
    bin_enc_data = base64.b64decode(encrypted_message)
    b_message = private_key.decrypt(
        bin_enc_data,
        padding.PKCS1v15()
    )
    return b_message.decode()

def soundBuzzer():
    global prevData, curData
    buzzer = False
    
    apiRequests = [requests.get(f"http://172.20.10.4:3000/api/getEncryptedData/{sensor}") for sensor in SENSORS]
    
    sentData = [int(decrypt(apiRequests[i].json()["body"][SENSOR_VALS[i]])) for i in range(len(apiRequests))]
    curDataTime = [parser.parse(apiRequests[i].json()["body"]["Date"]) for i in range(len(apiRequests))]
    curData = [(sentData[i] / curDataTime[i].second if curDataTime[i].second != 0 else sentData[i]) for i in range (len(sentData))]
    if abs(prevData[0]-curData[0]) > 100:
        lcd.setRGB(lcd_colors[0][0], lcd_colors[0][1], lcd_colors[0][2])
        lcd.setText_norefresh("Light Change    \nDetected!       ")
        print("Light Change Detected!")
        print(curData[0])
        buzzer=True
    if curData[1] > 0:
        lcd.setRGB(lcd_colors[1][0], lcd_colors[1][1], lcd_colors[1][2])
        lcd.setText_norefresh("Motion Detected!")
        print("Motion Detected!")
        buzzer=True
    if curData[2] > 0:
        lcd.setRGB(lcd_colors[2][0], lcd_colors[2][1], lcd_colors[2][2])
        lcd.setText_norefresh("Button Pressed! ")
        print("Button Pressed!")
        buzzer= True

    prevData = curData
    return buzzer



if __name__ == "__main__":
    # Read Private Key from File
    with open("private_key.pem", "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )
    # print(private_key)
    while True:
        curTime = datetime.datetime.now()
        if alarmState:
            delta = curTime-alarmStart
            if (delta.total_seconds() > 5):
                print("Alarm Stopped")
                alarmState = 0                 # Changes state
            elif (delta.total_seconds() > 1):
                grovepi.digitalWrite(buzzer,0) # Turns off alarm
        else: # Else show the time
            lcd.setRGB(lcd_colors[3][0], lcd_colors[3][1], lcd_colors[3][2])
            lcd.setText_norefresh(f"Time:{' '*11}{curTime.strftime('[%a] %I:%M:%S%p')}")
        if soundBuzzer():
            try:
                # Buzz for 1 second
                grovepi.digitalWrite(buzzer,1)
                alarmStart = datetime.datetime.now()
                alarmState = 1
                print ('Alarm Started')

            except KeyboardInterrupt:
                grovepi.digitalWrite(buzzer,0)
                lcd.setText('Alarms Off!')
                lcd.setRGB(0, 0, 0)
                break
            except IOError:
                print ("Error")