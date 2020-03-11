#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

//----------NASTAVITVE----------//
String skupina = "A";
String url = "http://192.168.4.1:3000/action";
const char* ssid = "KvizMain";
const char* password = "matura123";
//#define DEBUG 1
//^^odkomentiraj za debugging^^^//
//------------------------------//

#define tipkaA 5
#define tipkaB 14
#define tipkaC 12
#define tipkaD 13
#define led 2

ESP8266WiFiMulti WiFiMulti;

String reqParam = "";
boolean stanjePosiljanje = false;

void httpReq() {
  if ((WiFiMulti.run() == WL_CONNECTED)) {
    WiFiClient client;
    HTTPClient http;
    String _reqString = url + "?skupina=" + skupina + "&" + reqParam;
    if (http.begin(client, _reqString)) {
      #ifdef DEBUG
      Serial.print("[HTTP] Posiljam... ");
      #endif
      int httpCode = http.GET();
      if (httpCode > 0) {
        #ifdef DEBUG
        if (httpCode == HTTP_CODE_OK) {
          String payload = http.getString();
          Serial.println(payload);
        }
        #endif
      } else {
        #ifdef DEBUG
        Serial.printf("[HTTP] GET request error: %s\n", http.errorToString(httpCode).c_str());
        #endif
      }
      http.end();
    } else {
      #ifdef DEBUG
      Serial.printf("[HTTP] Napaka pri povezovanju!\n");
      #endif
    }
    delay(1);
  }
}

ICACHE_RAM_ATTR void reqA(){
  reqParam="tipka=A";
  stanjePosiljanje=true;
}

ICACHE_RAM_ATTR void reqB(){
  reqParam="tipka=B";
  stanjePosiljanje=true;
}

ICACHE_RAM_ATTR void reqC(){
  reqParam="tipka=C";
  stanjePosiljanje=true;
}

ICACHE_RAM_ATTR void reqD(){
  reqParam="tipka=D";
  stanjePosiljanje=true;
}

void setup() {
  #ifdef DEBUG
  Serial.begin(115200);
  #endif

  pinMode(tipkaA, INPUT);
  pinMode(tipkaB, INPUT);
  pinMode(tipkaC, INPUT);
  pinMode(tipkaD, INPUT);
  pinMode(led, OUTPUT);

  attachInterrupt(digitalPinToInterrupt(tipkaA), reqA, RISING);
  attachInterrupt(digitalPinToInterrupt(tipkaB), reqB, RISING);
  attachInterrupt(digitalPinToInterrupt(tipkaC), reqC, RISING);
  attachInterrupt(digitalPinToInterrupt(tipkaD), reqD, RISING);

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  digitalWrite(led, HIGH);

  #ifdef DEBUG
  Serial.print("\n\nPovezovanje");
  #endif

  while(WiFiMulti.run() != WL_CONNECTED){
    delay(500);
    #ifdef DEBUG
    Serial.print(".");
    #endif
  }
  digitalWrite(led, LOW);
  #ifdef DEBUG
  Serial.println("OK");
  #endif
  reqParam="status=OK";
  httpReq();
  delay(100);
}

void loop() {
  if(stanjePosiljanje){
    httpReq();
    stanjePosiljanje=false;
  }
  delay(1);
}
