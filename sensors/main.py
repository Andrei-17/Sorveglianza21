
import requests
import time
import cv2
import os

ENDPOINT = os.environ.get("SENSOR_ENDPOINT")
ROOM = os.environ.get("ROOM")

captureImage = lambda: cv2.imencode('.jpg', camera.read()[1])[1].tobytes()

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
    try:
        image = captureImage()
    except:
        image = None
    post(image)

if __name__ == "__main__":
    main()