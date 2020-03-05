const mongoose = require("mongoose");

const vprasanjeSchema = new mongoose.Schema({
  vprasanje: {
    type: String,
    trim: true,
    required: "Vprasanje je obvezno!"
  },
  odgovori: {
    A: {
      odgovor: {
        type: String,
        trim: true,
        required: "Vprasanje A ni izpolnjeno"
      },
      pravilno: { type: Boolean, required: "Oznaci ali je A pravilen" }
    },
    B: {
      odgovor: {
        type: String,
        trim: true,
        required: "Vprasanje B ni izpolnjeno"
      },
      pravilno: { type: Boolean, required: "Oznaci ali je B pravilen" }
    },
    C: {
      odgovor: {
        type: String,
        trim: true,
        required: "Vprasanje C ni izpolnjeno"
      },
      pravilno: { type: Boolean, required: "Oznaci ali je C pravilen" }
    },
    D: {
      odgovor: {
        type: String,
        trim: true,
        required: "Vprasanje D ni izpolnjeno"
      },
      pravilno: { type: Boolean, required: "Oznaci ali je D pravilen" }
    }
  }
});

module.exports = mongoose.model("Vprasanje", vprasanjeSchema);
