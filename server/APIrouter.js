const express = require('express');
//import all the functions from mockAPI.js
const { getUser,
        getUserById,
        getUserByPasswd,
        updateUser,
        createUser,
        deleteUser,
        addEntry,
        updateEntry,
        deleteEntry } = require('./mockAPI');

// Create the api router.
// The base URL for this router is URL:PORT/api/
const APIrouter = express.Router();

// =============USER FUNCTIONS==================

APIrouter.get('/getUser/:username', (req, res, next) => {
    res.status(200).send(getUser(req.params.username));
});

APIrouter.get('/getUserById/:id', (req, res, next) => {
    res.status(200).send(getUserById(req.params.id));
});

//We are using a PUT request instead of a GET request so that the user can
//send the password in the request body for secure (HTTPS) encyrption instead of through the URL.
//This way the password is not exposed in plain text.
APIrouter.put('/getUserByPasswd/:username', (req, res, next) => {
    const foundUser = getUserByPasswd(req.params.username, req.body.password);
    res.send(foundUser);
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the age of a user to 5, the request body becomes:
{"property": "age",
 "value": 5}
*/
APIrouter.put('/updateUser/:username', (req, res, next) => {
    const updatedUser = updateUser(req.params.username, req.body.property, req.body.value);
    res.send(updatedUser);
});

//JSON Request Body Input:
//{"user:" {your_user_data_here}}
APIrouter.post('/createUser/:username', (req, res, next) => {
    const createdUser = createUser(req.params.username, req.body.user);
    res.status(201).send(createdUser);
});

APIrouter.delete('/deleteUser/:username', (req, res, next) => {
    deleteUser(req.params.username);
    res.status(204).send();
});

// =============ENTRY FUNCTIONS==================

//JSON Request Body Input:
//{"entry:" {your_entry_data_here}}
APIrouter.post('/addEntry/:username', (req, res, next) => {
    const createdEntry = addEntry(req.params.username, req.body.entry);
    res.status(201).send(createdEntry);
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the level of an entry to 6, the request body becomes:
{"property": "level",
 "value": 6}
*/
APIrouter.put('/updateEntry/:username/:entryID', (req, res, next) => {
    updateEntry(req.params.username, req.params.entryID, req.body.property, req.body.value);
    res.status(204).send();
});

APIrouter.delete('/deleteEntry/:username/:entryID', (req, res, next) => {
    deleteEntry(req.params.username, req.params.entryID);
    res.status(204).send();
});

module.exports = APIrouter;

