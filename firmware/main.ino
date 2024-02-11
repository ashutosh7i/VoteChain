#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <MFRC522.h>
#include "DFRobotDFPlayerMini.h"
#include <ezButton.h>
#include <RTClib.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Define pins for the RFID reader
#define SS_PIN 5
#define RST_PIN 15

// Define pins for the DFPlayer Mini
static const uint8_t PIN_MP3_TX = 26;
static const uint8_t PIN_MP3_RX = 27;

// Define buzzer pin
#define BUZZER_PIN 25

// Define button pins
#define BUTTON1_PIN 32
#define BUTTON2_PIN 33
#define BUTTON3_PIN 34
//#define BUTTON4_PIN 35

// wifi credentials
const char* ssid = "Ash_Windows_Hotspot";
const char* password = "12345678910v";

String serverName = "http://192.168.250.243:3000/";

unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;



// Parameters
const int ipaddress[4] = {103, 97, 67, 25};

// Variables
byte nuidPICC[4] = {0, 0, 0, 0};
MFRC522::MIFARE_Key key;
MFRC522 rfid = MFRC522(SS_PIN, RST_PIN);
DFRobotDFPlayerMini player;
RTC_DS1307 rtc;

// OLED Display Constants
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Button objects
ezButton button1(BUTTON1_PIN);
ezButton button2(BUTTON2_PIN);
ezButton button3(BUTTON3_PIN);
//ezButton button4(BUTTON4_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();

  // Initialize WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
  // Initialize RFID reader
  rfid.PCD_Init();
  Serial.print(F("RFID Reader: "));
  rfid.PCD_DumpVersionToSerial();

  // Initialize DFPlayer Mini
  Serial1.begin(9600, SERIAL_8N1, PIN_MP3_RX, PIN_MP3_TX);
  if (player.begin(Serial1)) {
    Serial.println("DFPlayer Mini initialized");
    player.volume(30); // Set volume to maximum
    player.play(1); // Play welcome audio
  } else {
    Serial.println("Connecting to DFPlayer Mini failed!");
  }

  // Initialize display
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  display.setRotation(90);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("Welcome to Votechain");
  display.display();

  // Initialize buzzer pin
  pinMode(BUZZER_PIN, OUTPUT);

  // Initialize buttons
  button1.setDebounceTime(50);
  button2.setDebounceTime(50);
  button3.setDebounceTime(50);
  //button4.setDebounceTime(50);

  // Initialize RTC module
  if (!rtc.begin()) {
    Serial.println("RTC module is NOT found");
    Serial.flush();
    while (1);
  }
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__))); // Set RTC to compile time
   player.play(2); 
}

void loop() {



  if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "?temperature=24.37";
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());
      
      // If you need Node-RED/server authentication, insert user and password below
      //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
      
      // Send HTTP GET request
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

  // Button handling
  button1.loop();
  button2.loop();
  button3.loop();
  //button4.loop();

  
  // RFID card reading
  readRFID();

  // Display button state
  displayButtonsState();

  // Update OLED display
  display.display();
}

void readRFID() {
  if (!rfid.PICC_IsNewCardPresent())
    return;

  if (!rfid.PICC_ReadCardSerial())
    return;

  for (byte i = 0; i < 4; i++) {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }

  // Print scanned ID and current RTC time
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Scanned ID: ");
  printDec(rfid.uid.uidByte, rfid.uid.size);
  display.setCursor(0, 10);
  display.print("RTC Time: ");
  printRTCDateTime();
  display.display();

  // Play buzzer sound
   player.play(3); 
  digitalWrite(BUZZER_PIN, HIGH);
  delay(500);
  digitalWrite(BUZZER_PIN, LOW);



  // Halt PICC
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

void displayButtonsState() {
  display.setCursor(0, 10);
  display.print("Button 1: ");
  display.println(button1.getState() == LOW ? "Pressed" : "Released");
  display.print("Button 2: ");
  display.println(button2.getState() == LOW ? "Pressed" : "Released");
  display.print("Button 3: ");
  display.println(button3.getState() == LOW ? "Pressed" : "Released");
 
}

void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? "0" : "");
    Serial.print(buffer[i], DEC);
  }
}

void printRTCDateTime() {
  DateTime now = rtc.now();
  char daysOfWeek[7][12] = {
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  };
  Serial.print(now.year(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.day(), DEC);
  Serial.print(" (");
  Serial.print(daysOfWeek[now.dayOfTheWeek()]);
  Serial.print(") ");
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.println(now.second(), DEC);
}