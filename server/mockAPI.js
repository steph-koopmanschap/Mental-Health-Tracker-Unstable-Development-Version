//Import mockData 
var USERS = require("./mockData"); //This can not be a const or else there will be an error with delete requests.

// THESE ARE JUST MOCK API FUNCTIONS FOR TESTING AND SHOULD BE REPLACED BY REAL ONES

// API FUNCTIONS

// =============USER FUNCTIONS==================

// Get all USERS
// Be careful with the function as it returns All USERS data without checking for passwords
// This function should only be used for testing. Its not included in the APIrouter.js
function getAllUSERS() {
    return USERS;
}

// Get a single user by username
function getUser(username) {
    const foundUser = USERS.find((user) => 
        user.username === username
        );
    if (foundUser !== undefined) {
        return foundUser;
    }
    return `Error: User with username ${username} not found`;
}

// Get a single user by id
function getUserById(id) {
    const foundUser = USERS.find((user) => 
        user.id === id
        );
    if (foundUser !== undefined) {
        return foundUser;
    }
    return `Error: User with id ${id} not found`;
}

// Get a single user by username AND password
// Only returns userdata if both username and password match
function getUserByPasswd(username, password) {
    const foundUser = USERS.find((user) => 
        user.username === username
        );
    //User not found
    if (foundUser === undefined) {
        //We won't tell specifically if the username was found or not, or if the password was incorrect.
        //This leaves an ambiguous error message for someone trying to hack an account.
        return `Error: User with username ${username} not found or password incorrect`;
    }
    //Check if password matches
    if (foundUser.password === password) {
        return foundUser;
    }
    return `Error: User with username ${username} not found or password incorrect`;
}

// Change the value of key of user with 'username'
function updateUser(username, prop, value) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        //Check if the user has the property that needs to be updated
        if(userToBeUpdated.hasOwnProperty(prop)) {
            userToBeUpdated[prop] = value;
                return userToBeUpdated
        } else {
            return `Error: Update failed, User does not have the property ${prop}`;
        }
    }
}

// Create a new user
// newUserData is an object
function createUser(username, newUserData) {
    //First check if user with that usuername already exists
    const foundUser = USERS.find((user) => 
        user.username === username
        );
    if (foundUser !== undefined) {
        return `Error: This user with username ${username} already exists`
    //Add the user
    } else {
        USERS.push(newUserData);
        return newUserData;
    }
}

// Delete a user by username
function deleteUser(username) {
    USERS = USERS.filter((user) => 
        user.username !== username
    );
}

// =============ENTRY FUNCTIONS==================

// Get all entries from a user by username
function getAllEntries(username) {
    //Find the user
    let user = getUser(username);
    //First check getUser does NOT return an error
    if (!(user instanceof String)) {
        return user.entries;
    } else {
        return `Error: User with username ${username} does not exist`;
    }
}

// Get entry from a user by username and entryID
function getEntry(username, entryID) {
    //Find the user
    let user = getUser(username);
    //First check getUser does NOT return an error
    if (!(user instanceof String)) {
        //Find the entry
        const entry = user.entries.find((entry) =>
            entry.entryId === entryID
        );
        return entry;
    } else {
        return `Error: User with username ${username} does not exist`;
    }
}

// Add entry to a user
function addEntry(username, entry) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        userToBeUpdated['entries'].push(entry);
        return entry;
    }
}

// Edit an entry by looking for EntryID and username
function updateEntry(username, entryID, prop, value) {
    //Find the user
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        //Find the entry
        const entryToBeUpdated = userToBeUpdated.entries.find((entry) =>
            entry.entryId === entryID
        );
        //Check if the property in the entry exists
        if(entryToBeUpdated.hasOwnProperty(prop)) {
            //update the property
            entryToBeUpdated[prop] = value;
            return entryToBeUpdated
        } else {
            return `Error: Update failed, Entry does not have the property ${prop}`;
        }
    } else {
        return `Error: Update failed, User with username ${username} does not exist`;
    }
}

// Delete entry from a user
function deleteEntry(username, entryID) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        userToBeUpdated.entries = userToBeUpdated.entries.filter((entry) => 
            entry.entryId !== entryID
        );
    } else {
        return `Error: User with username ${username} does not exist`;
    }
}

//Export all the functions
module.exports = 
    {
    getAllUSERS: getAllUSERS,
    getUser: getUser,
    getUserById: getUserById,
    getUserByPasswd: getUserByPasswd,
    updateUser: updateUser,
    createUser: createUser,
    deleteUser: deleteUser,
    getAllEntries: getAllEntries,
    getEntry, getEntry,
    addEntry: addEntry,
    updateEntry: updateEntry,
    deleteEntry: deleteEntry
    };
