import requests
import serial
import time
import cv2
import os

ENDPOINT = os.environ.get("SENSOR_ENDPOINT")
ROOM = os.environ.get("ROOM")
PORT = os.environ.get("PORT")

camera = cv2.VideoCapture(0)
ser = serial.Serial(PORT, 9600, timeout=1)
ser.flush()

captureImage = lambda: cv2.imencode('.jpg', camera.read()[1])[1].tobytes()
getDistance = lambda: int(ser.readline().decode('utf-8').rstrip())

def post(image=None):
    if image:
        files = {'media': image}
    else:
        files = None
    
    return requests.post(
        url = ENDPOINT,
        params = {"room": ROOM},
        files = files
    )

def main():
    counter = 0
    lastDistance = getDistance()
    while True:
        if ser.in_waiting > 0:
            distance = getDistance()
            if counter < 100:
                if counter == 99:
                    print("Sensore avviato.")
                counter += 1
                lastDistance = distance
                continue
            if abs(lastDistance - distance) > 30:
                try:
                    image = captureImage()
                except:
                    image = None
                print("Intrusione rilevata!")
                post(image)
                time.sleep(30)
            lastDistance = distance

if __name__ == "__main__":
    main()