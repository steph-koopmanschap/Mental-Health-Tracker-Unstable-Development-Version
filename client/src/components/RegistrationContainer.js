import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'; // Library for sending HTTP Requests
import * as yup from 'yup' // Library for custom form validation

// Create the validation schema for form validation.
const formSchema = yup.object().shape({
    nameInput: yup.string()
                    .min(3)
                    .max(35)
                    .required(),
    userNameInput: yup.string()
                    .min(3)
                    .max(25)
                    .required(),
    emailInput: yup.string()
                    .email()
                    .min(6)
                    .max(50)
                    .required(),
    passwordInput: yup.string()
                    .min(3)
                    .max(16)
                    .required(),
    ageInput: yup.number()
                    .positive()
                    .integer()
                    .min(6)
                    .max(125)
                    .required(),
});

export default function RegistrationContainer() {

    //Used for navigating to different routes in the client without buttons
    const navigate = useNavigate();

    //Values of all the input boxes
    const [registrationState, setRegistrationState] = useState({
        nameInput: "",
        userNameInput: "",
        emailInput: "",
        passwordInput: "",
        ageInput: 1
    });

    // State for all the form errors
    const [formErrors, setFormErrors] = useState({
        nameInput: false,
        userNameInput: false,
        emailInput: false,
        passwordInput: false,
        ageInput: false,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setRegistrationState({
            ...registrationState,
            [e.target.name]: value
        });
    };

    //Registration action (OnSubmit form)
    const register = async (e) => {
        //prevent page from refreshing
        e.preventDefault();

        // Validate the input data. (Check if schema of the form is valid.)
        // abortEarly prevents aborting validation after first error
        const isFormValid = await formSchema.isValid(registrationState, { abortEarly: false });
        let userData = {};
        // If the form is valid
        if(isFormValid) {
            //Transform the user inputs to the user data
            //Extra user data is generated on server
            userData = {
                name: registrationState.nameInput,
                username: registrationState.userNameInput,
                email: registrationState.emailInput,
                password: registrationState.passwordInput,
                age: registrationState.ageInput
            };
        // If the form is not valid
        } else {
            alert("Form is not valid.")
        }

        //Registration code (send info to Back-end database)
        try {
            //Ask the server to add a new user to the database.
            await axios.post(`http://localhost:3001/api/user/signup`, 
                {userData: userData});
            
            alert("successfully registered.");
            //Send user back to the landing page after registration submit
            navigate("/")
        } catch (error) {
            console.log(error);
            alert("Something went wrong while creating your account.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <h1 className="my-2">Create a new account</h1>
            <h3 className="my-2">Already registered? <Link className="my-4 hover:text-cyan-500" to="/">Login here</Link></h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={register}>
            <div className="mb-4">
                <label htmlFor="nameInput">Name</label>
                <input 
                    type="text"
                    id="nameInput"
                    placeholder="Name"
                    name="nameInput"
                    value={registrationState.nameInput}
                    onChange={handleChange}
                    required 
                    minLength="3"
                    maxLength="35"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="userNameInput">Username</label>
                <input 
                    type="text"
                    id="userNameInput"
                    placeholder="Username"
                    name="userNameInput"
                    value={registrationState.userNameInput}
                    onChange={handleChange}
                    required 
                    minLength="3"
                    maxLength="25"
                    pattern="[a-zA-Z0-9]+"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="emailInput">Email</label>
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    name="emailInput"
                    value={registrationState.emailInput}
                    onChange={handleChange}
                    required 
                    minLength="6"
                    maxLength="50"
                />
             </div>  
             <div className="mb-6">
                <label htmlFor="passwordInput">Password</label>
                <input 
                    type="password"
                    id="passwordInput"
                    placeholder="Password"
                    name="passwordInput"
                    value={registrationState.passwordInput}
                    onChange={handleChange}
                    required 
                    minLength="3"
                    maxLength="16"
                /> 
                  </div>  
                  <div className="mb-6">
                <label htmlFor="ageInput">Age</label>
                <input 
                    type="number"
                    id="ageInput"
                    placeholder="Age"
                    name="ageInput"
                    value={registrationState.ageInput}
                    onChange={handleChange}
                    required 
                    min="6" 
                    max="125"
                /> 
               </div>
               <div className="flex flex-col items-center justify-between">
                
                <input className="formButton"
                    type="submit" 
                    value="Sign up" 
                />
                </div>
            </form>
            <div className="my-4 hover:text-cyan-500"><Link to="/">Go back</Link></div>
        </div>
    );
}

