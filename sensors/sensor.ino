#include <Ultrasonic.h>
#define TRIG 5
#define ECHO 6

Ultrasonic ultrasonic(TRIG, ECHO);

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(ultrasonic.distanceRead());
  delay(100);
}