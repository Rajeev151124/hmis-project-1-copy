const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/hmis');

const VisitSchema = new mongoose.Schema({
    patientId: String,
    doctor: String,
    date: String
});

const Visit = mongoose.model('Visit', VisitSchema);

app.post('/visits', async (req, res) => {
    const visit = new Visit(req.body);
    await visit.save();
    res.send(visit);
});

app.get('/visits', async (req, res) => {
    const visits = await Visit.find();
    res.send(visits);
});

app.listen(3001, () => console.log('Visit Service running'));
