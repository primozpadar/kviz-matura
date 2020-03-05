#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define led 2
#define tipka 5

//wifi nastavitve
const char* ssid = "Ni_Interneta";
const char* password = "canon6ddvatri";

//host - ip glavnega kontrolerja
const char* host_A = "http://192.168.1.15:3000/action?skupina=A&tipka=A";

void setup() {
  Serial.begin(115200);

  pinMode(led, OUTPUT);
  pinMode(tipka, INPUT_PULLUP);
  
  digitalWrite(2, HIGH);

  Serial.printf("\n\nPovezovanje... %s ", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" povezano");
  digitalWrite(2, LOW);
}

void loop() {
  //Serial.println("Still looping...");
  if(!digitalRead(tipka)){
    if (WiFi.status() == WL_CONNECTED){
      HTTPClient http;
      http.begin(host_A);
      int httpCode = http.GET();
      if(httpCode > 0){
        String payload = http.getString();
        Serial.println(payload);
      }
      http.end();
    }
    delay(1000);
  }
  delay(1);
}
