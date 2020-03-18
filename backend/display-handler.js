const i2c = require("i2c-bus");
const oled = require("oled-i2c-bus");
const pngtolcd = require("png-to-lcd");
const font = require("oled-font-5x7");

class DisplayHandler {
  constructor() {
    this.A = this.init(4);
    this.B = this.init(3);
  }

  init(i2cBus) {
    const bus = i2c.openSync(i2cBus);
    const nastavitve = { width: 128, height: 32, address: 0x3c };
    const display = new oled(bus, nastavitve);
    display.clearDisplay();
    display.invertDisplay(false);
    display.turnOnDisplay();
    return display;
  }

  homescreen() {
    this.B.clearDisplay();
    this.B.buffer = Buffer.from(require("./bitmaps/logo-bitmap"));
    this.B.update();
    this.A.clearDisplay();
    this.A.setCursor(1, 1);
    this.A.writeString(font, 4, "IGRA!", 1, true);
  }

  pokaziOdgovore() {
    this.A.clearDisplay();
    this.A.setCursor(1, 1);
    this.A.writeString(font, 2, "Pokazi odgovore", 1, true);
  }

  //izpise na lcd imena in tocke vseh skupin
  pokaziSkupine(ime, to) {
    //ime - imeSkupine, to - tockeSkupine
    this.B.clearDisplay();
    this.B.setCursor(1, 1);
    this.B.writeString(font, 1, `${ime.A} - ${to.A}`, 1, true);
    this.B.setCursor(1, 8);
    this.B.writeString(font, 1, `${ime.B} - ${to.B}`, 1, true);
    this.B.setCursor(1, 16);
    this.B.writeString(font, 1, `${ime.C} - ${to.C}`, 1, true);
    this.B.setCursor(1, 24);
    this.B.writeString(font, 1, `${ime.D} - ${to.D}`, 1, true);
  }

  praznoA() {
    this.A.clearDisplay();
  }

  praznoB() {
    this.B.clearDisplay();
  }

  cakamOdgovor() {
    this.A.clearDisplay();
    this.A.setCursor(1, 1);
    this.A.writeString(font, 2, "Cakam odgovor...", 1, true);
  }

  naslednjeVprasanje() {
    this.B.clearDisplay();
    this.B.setCursor(1, 1);
    this.B.writeString(font, 2, "Naslednje vprasanje", 1, true);
  }

  konec() {
    this.A.clearDisplay();
    this.A.setCursor(1, 1);
    //TODO-this.A.writeString(font, 2, "STATISTIKA", 1, true);
    this.A.writeString(font, 2, "DOMOV", 1, true);
    this.B.clearDisplay();
    this.B.setCursor(1, 1);
    this.B.writeString(font, 2, "DOMOV", 1, true);
  }

  izberiKategorijo() {
    this.A.clearDisplay();
    this.A.setCursor(1, 1);
    this.A.writeString(font, 4, "IGRA!", 1, true);
    this.B.clearDisplay();
    this.B.buffer = Buffer.from(require("./bitmaps/izberikat-bitmap"));
    this.B.update();
  }
}

module.exports = DisplayHandler;
