const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');



const base_url = 'https://node50104-bigkumatest.proen.app.ruk-com.cloud';


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));

app.get('/Doctors', async (req, res) => {
    try{
        const response = await axios.get(base_url + '/Doctor');
        const response2 = await axios.get(base_url + '/Hospital');
        res.render('Doctors', {  
            Doctors: response.data,
            Hospital: response2.data,
            
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Doctor/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor/' + req.params.ID);
        res.render('Doctor', { Doctor: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createDoctor", (req, res) => {
    res.render('createDoctor');
});

app.post("/createDoctor", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Department: req.body.Department,  HospitalID: req.body.HospitalID, Pic: req.body.Pic };
        await axios.post(base_url + '/Doctor', data);
        res.redirect("/Doctors"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updateDoctor/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Doctor/' + req.params.ID);
            res.render('updateDoctor', { Doctor: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updateDoctor/:ID", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Department: req.body.Department,  HospitalID: req.body.HospitalID, Pic: req.body.Pic };
        await axios.put(base_url + '/Doctor/' + req.params.ID, data);
        res.redirect("/Doctors");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/deleteDoctor/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Doctor/' + req.params.ID);
            res.redirect("/Doctors");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});







app.get('/Patients', async (req, res) => {
    try{
        const response = await axios.get(base_url + '/Patient');
        res.render('Patients', { Patients: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Patient/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Patient/' + req.params.ID);
        res.render('Patient', { Patient: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createPatient", (req, res) => {
    res.render('createPatient');
});

app.post("/createPatient", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Disease: req.body.Disease, Symptoms: req.body.Symptoms, Pic: req.body.Pic };
        await axios.post(base_url + '/Patient', data);
        res.redirect("/Patients"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updatePatient/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Patient/' + req.params.ID);
            res.render('updatePatient', { Patient: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updatePatient/:ID", async (req, res) => {
    try {
        const data = { Name: req.body.Name, Disease: req.body.Disease, Symptoms: req.body.Symptoms, Pic: req.body.Pic };
        await axios.put(base_url + '/Patient/' + req.params.ID, data);
        res.redirect("/Patients");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/deletePatient/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Patient/' + req.params.ID);
            res.redirect("/Patients");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});



app.get('/', async (req, res) => {
    try{
        const response1 = await axios.get(base_url + '/Treatment');
        const response2 = await axios.get(base_url + '/Doctor');
        const response3 = await axios.get(base_url + '/Patient');
        const response4 = await axios.get(base_url + '/Hospital');
        res.render('Treatments', {  
            Treatments: response1.data,
            Doctor: response2.data,
            Patient: response3.data,
            Hospital: response4.data
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Treatment/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Treatment/' + req.params.ID);
        res.render('Treatment', { Treatment: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createTreatment", (req, res) => {
    res.render('createTreatment');
});

app.post("/createTreatment", async (req, res) => {
    try {
        const data = {  DoctorID: req.body.DoctorID, PatientID: req.body.PatientID, HospitalID: req.body.HospitalID , Treatment: req.body.Treatment  };
        await axios.post(base_url + '/Treatment', data);
        res.redirect("/"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updateTreatment/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Treatment/' + req.params.ID);
            res.render('updateTreatment', { Treatment: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updateTreatment/:ID", async (req, res) => {
    try {
        const data = { DoctorID: req.body.DoctorID, PatientID: req.body.PatientID, HospitalID: req.body.HospitalID, Treatment: req.body.Treatment };
        await axios.put(base_url + '/Treatment/' + req.params.ID, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});


app.get("/deleteTreatment/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Treatment/' + req.params.ID);
            res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});


app.get('/Hospitals', async (req, res) => {
    try{
        const response = await axios.get(base_url + '/Hospital');
        res.render('Hospitals', { Hospitals: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send('err');
    }
});

app.get("/Hospital/:ID", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital/' + req.params.ID);
        res.render('Hospital', { Hospital: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/createHospital", (req, res) => {
    res.render('createHospital');
});

app.post("/createHospital", async (req, res) => {
    try {
        const data = { Name: req.body.Name, address: req.body.address, Pic: req.body.Pic };
        await axios.post(base_url + '/Hospital', data);
        res.redirect("/Hospitals"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/updateHospital/:ID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Hospital/' + req.params.ID);
            res.render('updateHospital', { Hospital: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updateHospital/:ID", async (req, res) => {
    try {
        const data = { Name: req.body.Name, address: req.body.address, Pic: req.body.Pic };
        await axios.put(base_url + '/Hospital/' + req.params.ID, data);
        res.redirect("/Hospitals");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.get("/deleteHospital/:ID", async (req, res) => {
    try {
        await axios.delete(base_url + '/Hospital/' + req.params.ID);
            res.redirect("/Hospitals");
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});







app.listen(8080, () => {
    console.log('Listening on port 8080');
});