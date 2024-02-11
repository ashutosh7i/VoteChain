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
#include <ArduinoJson.h>

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

int Led1_Pin = 12;
int Led2_Pin = 13;
int Led3_Pin = 14;

// wifi credentials
const char* ssid = "Ash_Windows_Hotspot";
const char* password = "12345678910";
String serverName = "http://192.168.50.243:3000/";

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

   // initialize leds
  pinMode(Led1_Pin, OUTPUT);
  pinMode(Led2_Pin, OUTPUT);
  pinMode(Led3_Pin, OUTPUT);
  
}

// Utility Functions-
//
//void readRFID() {
//  if (!rfid.PICC_IsNewCardPresent())
//    return;
//
//  if (!rfid.PICC_ReadCardSerial())
//    return;
//
//  for (byte i = 0; i < 4; i++) {
//    nuidPICC[i] = rfid.uid.uidByte[i];
//  }
//
//  // Print scanned ID and current RTC time
//  display.clearDisplay();
//  display.setCursor(0, 0);
//  display.print("Scanned ID: ");
//  printDecToDisplay(rfid.uid.uidByte, rfid.uid.size); // Print ID to display
//  display.setCursor(0, 10);
//  display.print("RTC Time: ");
//  printRTCDateTime();
//  display.display();
//
//  // Play buzzer sound
//  // player.play(3); 
//  digitalWrite(BUZZER_PIN, HIGH);
//  delay(500);
//  digitalWrite(BUZZER_PIN, LOW);
//delay(2000);
//  // Halt PICC
//  rfid.PICC_HaltA();
//  rfid.PCD_StopCrypto1();
//}

void printDecToDisplay(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    if (buffer[i] < 0x10) {
      display.print("0");
    }
    display.print(buffer[i], DEC);
  }
}

//void displayButtonsState() {
//  display.clearDisplay(); // Clear the display
//  display.setCursor(0, 0); // Reset the cursor position
//  display.print("Button 1: ");
//  display.println(button1.getState() == LOW ? "Pressed" : "Released");
//  display.print("Button 2: ");
//  display.println(button2.getState() == LOW ? "Pressed" : "Released");
//  display.print("Button 3: ");
//  display.println(button3.getState() == LOW ? "Pressed" : "Released");
//  display.display(); // Update the display
//}


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


String readRFID() {
  if (!rfid.PICC_IsNewCardPresent())
    return "";

  if (!rfid.PICC_ReadCardSerial())
    return "";

  String voterId = "";
  for (byte i = 0; i < 4; i++) {
    voterId += String(rfid.uid.uidByte[i], DEC);
  }
// Print scanned ID and current RTC time
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Scanned ID: ");
  printDecToDisplay(rfid.uid.uidByte, rfid.uid.size); // Print ID to display
  display.setCursor(0, 10);
  display.print("RTC Time: ");
  printRTCDateTime();
  display.display();

  // Play buzzer sound
  // player.play(3); 
  digitalWrite(BUZZER_PIN, HIGH);
  delay(500);
  digitalWrite(BUZZER_PIN, LOW);
delay(2000);
  // Halt PICC
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  return voterId;
}





void loop() {

  // Button config
  button1.loop();
  button2.loop();
  button3.loop();

  // RFID card reading
  String voterId = readRFID();

  if (voterId != "") {
    // Call API to check if voter is eligible
    String checkVoteEligiblePath = "checkvoteeligible";
    String checkVoteEligibleBody = "{ \"voterid\": \"" + voterId + "\" }";
    int checkVoteEligibleResponseCode = postToServer(checkVoteEligiblePath, checkVoteEligibleBody);

    if (checkVoteEligibleResponseCode == 200) {
      // Show on display "cast your vote" and play a 200ms buzzer
      //player.play(3);
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("Cast your vote");
      display.display();
      digitalWrite(BUZZER_PIN, HIGH);
      delay(200);
      digitalWrite(BUZZER_PIN, LOW);

      // Check what button user clicks
     String votedTo = "";
  while (votedTo == "") {
    button1.loop();
    button2.loop();
    button3.loop();
    if (button1.isPressed()) {
      votedTo = "candidate1";
      digitalWrite(Led1_Pin, HIGH);
    } else if (button2.isPressed()) {
      votedTo = "candidate2";
      digitalWrite(Led2_Pin, HIGH);
    } else if (button3.isPressed()) {
      votedTo = "candidate3";
      digitalWrite(Led3_Pin, HIGH);
    }
  }
      

      if (votedTo != "") {
        // POST on api localhost:3000/addnewvote with data
        String addNewVotePath = "addnewvote";
        String timestamp = rtc.now().timestamp(DateTime::TIMESTAMP_FULL);
        String addNewVoteBody = "{ \"voter_id\": \"" + voterId + "\", \"voted_to\": \"" + votedTo + "\", \"timestamp\": \"" + timestamp + "\", \"mobile_no\": \"918717941241\" }";
        int addNewVoteResponseCode = postToServer(addNewVotePath, addNewVoteBody);

        if (addNewVoteResponseCode == 200) {
          // On display show "your vote is casted" and play audio4
          display.clearDisplay();
          display.setCursor(0, 0);
          display.println("Your vote is casted");
          display.display();
          //player.play(4);
          digitalWrite(BUZZER_PIN, HIGH);
      delay(100);
      digitalWrite(BUZZER_PIN, LOW);
        }
      }
    }
    else{
  display.clearDisplay();
      display.setCursor(0, 0);
      display.println("Not Allowed");
      display.display();
      digitalWrite(BUZZER_PIN, HIGH);
      delay(500);
      digitalWrite(BUZZER_PIN, LOW);
       digitalWrite(BUZZER_PIN, HIGH);
      delay(500);
      digitalWrite(BUZZER_PIN, LOW);
      //player.play(6);
    }
  }

  // ...
}

int postToServer(String path, String body) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName + path);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(body);
    http.end();
    return httpResponseCode;
  } else {
    Serial.println("WiFi Disconnected");
    return -1;
  }
}



//
//
////
////
////
////void loop() {
//
//  // Button config
//  button1.loop();
//  button2.loop();
//  button3.loop();
//
//  // If button1 is pressed, set Led1 to HIGH
//  if(button1.isPressed())
//    digitalWrite(Led1_Pin, HIGH);
//  else
//    digitalWrite(Led1_Pin, LOW);
//
//  // If button2 is pressed, set Led2 to HIGH
//  if(button2.isPressed())
//    digitalWrite(Led2_Pin, HIGH);
//  else
//    digitalWrite(Led2_Pin, LOW);
//
//  // If button3 is pressed, set Led3 to HIGH
//  if(button3.isPressed())
//    digitalWrite(Led3_Pin, HIGH);
//  else
//    digitalWrite(Led3_Pin, LOW);
//
//  
//  // RFID card reading
//  readRFID();
//
//  // Display button state
//  displayButtonsState();
//
//  // Update OLED display
//  display.display();
//}