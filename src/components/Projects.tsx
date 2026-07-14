import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Play, FileCode, LayoutGrid, Cpu, Eye, Download, Wallet, Link as LinkIcon, Image as ImageIcon, Github, ExternalLink } from "lucide-react";
import schematicImg from "@/assets/door-lock-schematic.png";


const arduinoCode = `#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include <Servo.h>

// --- Configuration ---
#define PASSWORD_LENGTH 4
char masterPassword[PASSWORD_LENGTH + 1] = "1234"; 
char data[PASSWORD_LENGTH + 1]; 
byte data_count = 0; 

// --- Pin Definitions ---
const int servoPin = 11;
const int buzzerPin = 12;

// --- Components Setup ---
Servo myServo;
// IMPORTANT: IF SCREEN IS BLANK, CHANGE 0x27 TO 0x20 or 0x3F
LiquidCrystal_I2C lcd(0x27, 16, 2); 

// --- Keypad Setup ---
const byte ROWS = 4; 
const byte COLS = 4; 
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6}; 
byte colPins[COLS] = {5, 4, 3, 2}; 

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS); 

void setup() {
  myServo.attach(servoPin);
  myServo.write(0);
  
  pinMode(buzzerPin, OUTPUT);
  lcd.init(); 
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("  Door Locked   ");
  delay(2000);
  lcd.clear();
}

void loop() {
  lcd.setCursor(0, 0);
  lcd.print("Enter Password:");

  char customKey = keypad.getKey();

  if (customKey) {
    digitalWrite(buzzerPin, HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);

    data[data_count] = customKey; 
    lcd.setCursor(data_count, 1); 
    lcd.print("*");
    data_count++; 
  }

  if (data_count == PASSWORD_LENGTH) {
    lcd.clear();
    delay(500);

    if (!strcmp(data, masterPassword)) {
      lcd.print(" Access Granted");
      myServo.write(90);
      digitalWrite(buzzerPin, HIGH);
      delay(300);
      digitalWrite(buzzerPin, LOW);
      delay(5000);
      myServo.write(0);
      data_count = 0;
    } 
    else {
      lcd.print(" Access Denied");
      digitalWrite(buzzerPin, HIGH);
      delay(1000);
      digitalWrite(buzzerPin, LOW);
      delay(1000);
      data_count = 0;
    }
    lcd.clear();
  }
}`;

const doorTabs = [
  { id: "overview", label: "Overview", icon: <Eye size={16} /> },
  { id: "schematic", label: "Schematic", icon: <Cpu size={16} /> },
  { id: "block", label: "Block Diagram", icon: <LayoutGrid size={16} /> },
  { id: "code", label: "Code", icon: <FileCode size={16} /> },
  { id: "video", label: "Video", icon: <Play size={16} /> },
];

const DoorLockModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [tab, setTab] = useState("overview");

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden mx-2"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Lock size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Door Lock System</h3>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
            {doorTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  tab === t.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 overflow-y-auto max-h-[55vh]">
            {tab === "overview" && (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Arduino-based security system with keypad authentication, buzzer feedback, LCD display, and servo-controlled locking mechanism.
                  Features a 4x4 matrix keypad for password input, a 16x2 I2C LCD for user feedback, a piezo buzzer for audio cues, and a servo motor for physical lock actuation.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Arduino Uno", "4x4 Keypad", "Servo Motor (SG90)", "LCD I2C 16x2", "Piezo Buzzer", "Jumper Wires"].map((c) => (
                    <div key={c} className="bg-muted rounded-lg p-3 text-sm text-foreground">{c}</div>
                  ))}
                </div>
              </div>
            )}
            {tab === "schematic" && (
              <div className="space-y-4">
                <img src={schematicImg} alt="Door Lock System Schematic" className="w-full rounded-xl border border-border" />
                <a href="/docs/door-lock-schematic.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <Download size={14} />
                  Download full schematic (PDF)
                </a>
              </div>
            )}
            {tab === "block" && (
              <div className="space-y-4">
                <iframe src="/docs/door-lock-block-diagram.pdf" className="w-full h-[50vh] rounded-xl border border-border" title="Block Diagram PDF" />
                <a href="/docs/door-lock-block-diagram.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <Download size={14} />
                  Download Block Diagram (PDF)
                </a>
              </div>
            )}
            {tab === "code" && (
              <div className="bg-muted rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm text-foreground font-mono leading-relaxed whitespace-pre">{arduinoCode}</pre>
              </div>
            )}
            {tab === "video" && (
              <div className="space-y-4">
                <iframe
                  src="https://drive.google.com/file/d/14UpA7xfl5MHjXD_YkxeZ-w9MB2h1CHnx/preview"
                  className="w-full aspect-video rounded-xl border border-border"
                  allow="autoplay"
                  allowFullScreen
                />
                <a href="https://drive.google.com/file/d/14UpA7xfl5MHjXD_YkxeZ-w9MB2h1CHnx/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <Play size={14} />
                  Open video in Google Drive
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const expenseTabs = [
  { id: "overview", label: "Overview", icon: <Eye size={16} /> },
  { id: "links", label: "Links", icon: <LinkIcon size={16} /> },
  { id: "photos", label: "Photos", icon: <ImageIcon size={16} /> },
];

const ExpenseModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [tab, setTab] = useState("overview");

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden mx-2"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Wallet size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Monthly Expense Tracker</h3>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
            {expenseTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  tab === t.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 overflow-y-auto max-h-[55vh]">
            {tab === "overview" && (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A native Android app to log, track, and export daily, weekly, and monthly expenses with
                  smart auto-categorization and a full editable calendar history. Built with Kotlin, Jetpack
                  Compose, and Room Database. Developed using Google AI Studio and Android Studio.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Kotlin", "Jetpack Compose", "Room Database", "Android Studio", "Google AI Studio", "Material 3"].map((c) => (
                    <div key={c} className="bg-muted rounded-lg p-3 text-sm text-foreground">{c}</div>
                  ))}
                </div>
              </div>
            )}
            {tab === "links" && (
              <div className="space-y-3">
                <a
                  href="https://github.com/vijayakumar-14/Expense-Tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-muted hover:bg-muted/70 border border-border rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Github size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">GitHub Repository</div>
                      <div className="text-xs text-muted-foreground break-all">vijayakumar-14/Expense-Tracker</div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground shrink-0" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1Zw8OQ5ZQx8Zw8OQ5ZQx8Zw8OQ5ZQx8Z/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-muted hover:bg-muted/70 border border-border rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-green/10 text-neon-green">
                      <Download size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">App Download (APK)</div>
                      <div className="text-xs text-muted-foreground break-all">Expense Tracker.apk — Google Drive</div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground shrink-0" />
                </a>
              </div>
            )}
            {tab === "photos" && (
              <div className="text-center py-10 text-muted-foreground text-sm">
                Photos will be added soon.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gradient-purple-blue text-center mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setDoorOpen(true)}
            className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer card-hover group"
          >
            <img src={schematicImg} alt="Door Lock System" className="w-full h-40 object-cover border-b border-border" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={18} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Door Lock System
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Arduino-based security system with keypad authentication and servo-controlled locking.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {["Arduino", "C++", "Hardware"].map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setExpenseOpen(true)}
            className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer card-hover group"
          >
            <div className="w-full h-40 flex items-center justify-center border-b border-border bg-gradient-to-br from-muted/50 to-muted">
              <span className="text-2xl font-normal text-foreground tracking-wide">Expense Tracker</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={18} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Monthly Expense Tracker
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Native Android app to log, track, and export expenses with smart auto-categorization and calendar history.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {["Kotlin", "Jetpack Compose", "Room DB", "Android Studio", "Google AI Studio"].map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DoorLockModal open={doorOpen} onClose={() => setDoorOpen(false)} />
      <ExpenseModal open={expenseOpen} onClose={() => setExpenseOpen(false)} />
    </section>
  );
};

export default Projects;
