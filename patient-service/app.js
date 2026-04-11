const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/hmis');

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String
});

const Patient = mongoose.model('Patient', PatientSchema);

app.post('/patients', async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.send(patient);
});

app.get('/patients', async (req, res) => {
    const patients = await Patient.find();
    res.send(patients);
});

app.listen(3000, () => console.log('Patient Service running'));
