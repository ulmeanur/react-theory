// =============================== 
// we use props to read the properties added on the component

// =============================== 

//Whenever we call a State Setting Function
//the component function re-executes / the components are rerendered
// ===============================

//State Management in React
// is used to update the state with every keystroke (onChange)
// and save what the user enters in such a state variable.

import React, {useEffect, useState} from 'react';

// =============================== 
// create a React component

import React, {useState} from 'react';
import './AddUser.css'
 
const AddUser = (props) => {
    console.log("add user");
    

    const [enteredUsername, setEnteredUsername] = useState('');
    // also useState can save data as an object {} where we use prev State to update the current one

	const addUserHandler = (event) => {
		event.preventDefault(); //to prevent reloading the page
		console.log('submit form');
	};

	const usernameChangeHandler  = (event) => {
		console.log("username=",event.target.value);
    
        setEnteredUsername(event.target.value);
	};

    return (
        <div>
            <form onSubmit={addUserHandler}>
				<label htmlFor="username" onChange={usernameChangeHandler}>
					Username
				</label>
				<input id="username" type="text" />

                <button type="submit">Add User</button>
            </form>
        </div>
    )
}

export default AddUser;


// =============================== 

//In order to have classes that apply only on the component 
//and not globally to avoid messing around other components
// we should use module.css provided by React or install styled-components

import classes from './Card.module.css'

<div className={classes["card"]}>{props.children}</div>

// =============================== 

//create a re-usable Card component
//that should output what's passed between the opening and closing tags off card
// using props.children
// As it is a custom component in order to know about the classes added on it
// we need to use template literals {`${props.className}`} to inject dinamically the classes
// we use props to read the properties added on the component


import React from 'react';
import classes from './Card.module.css'
 
const Card = (props) => {
    return (
        <div className={`${classes["card"]} ${props.className}`}>{props.children}</div>
    )
}

export default Card;

// =============================== 

//create a re-usable Button component

import React from 'react';
import classes from './Button.module.css'
 
const Button = (props) => {
    return (
        <button
			className={`${classes.button} ${props.className ? props.className : ''}`}
			type={props.type || 'button'}
            onClick={props.onClick}
		>
			{props.children}
		</button>
    )
}

export default Button;

// in a separate file call the component
<Button type="submit">Add User</Button>


// =============================== 

//when you need to update the previous state with the current one 
//we need to add a function to the setter and use prev...

  const [usersList, setUsersList] = useState([]);

  const addUsersHandler = (uName, uAge) => {
    
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {username: uName, age: uAge, id:  Math.random().toString()}
      ];
    });
  };

// // =============================== 
// go through each element of the array using map and an anonymous func as param
// add key as React needs to identify each elem added dinamically

<ul>
    {props.users.map((user) => (
        <li key={user.id}>
            {user.username}, {user.age} years old
        </li>
    ))}
</ul>

// =============================== 

// Add conditional html

const UsersList = (props) => {
	const error = true;
	return (
		<div>
			{(props.users.length > 0) &&
				(<Card>
                        ...
				</Card>)
			}
		</div>
	);
};


//=========================

// Beacuse of React/JSX requirements to wrap the content returned in an HTML element
// we might end up with a bunch of unnecessary divs or elements
// so called React div soup

//to avoid this behaviour we have more solutions:
//  1. Create a React Wrapper component and use it instead of the div

import React from 'react';
 
const Wrapper = (props) => {
    return props.children;
}

export default Wrapper;

// 2. Use React.Fragments (it's an empty React component) instead of the div
// it needs to be imported from React

<React.Fragment>
    [...html code]
</React.Fragment>

//=========================
// Refs - import {useRef} from "react"

// Refs are an alternative for using useState 
//esspecially when we want just to READ the value and we do not plan to change anything
// It is not recommended to manipulate the DOM using Refs, only Reacts does that!
// The only exception would be when we reset the value of the input 

import React, { useRef } from 'react';

const AddUser = (props) => {
	const nameInputRef = useRef();

	const addUserHandler = (event) => {
		event.preventDefault(); //to prevent reloading the page

		const enteredUser = nameInputRef.current.value;1
        
        if (enteredUser.trim().length === 0) {
			console.log('Failed to submit form');
			return;
		}

		nameInputRef.current.value = '';
		console.log('Success - form was submitted');

	};

	return (
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						ref={nameInputRef}
					/>
					<button type="submit">Add User</button>
				</form>
	);
};

export default AddUser;


//=========================
// Portals
// Portals are a method (ReactDom.createPortal()) that need to be called from "react-dom"
// Portals are useful when we want to render a component in another place 
// than the one we initialize it

// For e.g. load the Modal backdrop and the Modal overlay exacly after Body tag
// by creating root divs (root-backdrop, root-overlay) exacly after Body tag.
// The modal code will be added in the root-divs when it is called from the component that is triggering the modal

import ReactDOM from 'react-dom';

// <Backdrop/> and <ModalOverlay/> are components that will load in another place
// their target are 'root-backdrop' and 'root-overlay'

<React.Fragment>
    {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('root-backdrop')
    )}
    {ReactDOM.createPortal(
        <ModalOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
        />,
        document.getElementById('root-overlay')
    )}
</React.Fragment>


//=========================
// useEffect

// useEffect - runs after every component render cycle/re-render if no dependencies added
// A component is re-render each time the State changes!

//Whenever we call a State Setting Function
//the component function re-executes

//useEffect hook helps you deal with code that should be executed in response to some other action.
//useEffect handles side effects (e.g. http requests 

// or  if we listen to every keystroke and save/validate that entered data 
// like checking and updating the form validity,in response to a keystroke 
// in the email or a password field)

// useEffect can receive two arguments--->  useEffect( ()=>{}, [] )

//The first argument is a function.
//For example here an anonymous arrow function ()=>{} .
//This function is executed by React after every component re-evaluation/is rerendered and only if the dependencies have changed!!!
//The second argument is an array of dependencies [] .

// if we use useEffect withouth dependencies and no array the func will executes each time the component is rerendered/re-evaluated
// if we use useEffect with an empty array [] and no dependencies the func will executes only once when the app starts
// if we use useEffect with dependencies [a,b,c] the func will executes when dependencies change

//in useEffect() dependencies:

//You DON'T need to add state updating functions: 
//React guarantees that those functions never change, 
//hence you don't need to add them as dependencies (you could though)

// You also DON'T need to add "built-in" APIs or functions like fetch(), 
//localStorage etc (functions and features built-into the browser and 
//hence available globally): These browser APIs / global functions are not 
//related to the React component render cycle and they also never change

// You also DON'T need to add variables or functions you might've defined 
// OUTSIDE of your components (e.g. if you create a new helper function in 
// a separate file): Such functions or variables also are not created inside 
// of a component function and hence changing them won't affect your components 
// (components won't be re-evaluated if such variables or functions change and vice-versa)

//Where to use useEffect() : E.g. the Login scenario where the app restarts
//because the user left the page and comes back
//or simply because we reload the page and we want to show 
//logged in state if user has logged in previously



useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
    //we set the value inside the useEffect() to avoid an infinite loop
      setIsLoggedIn(true);
      
    }
  }, []);


// !! useEffect() cleanup function

// Add " return () => {} " inside useEffect() in order to run the cleanup function
// The cleanup function will run as a cleanup process 
// before useEffect executes this function the next time.
// So to make it more clear this cleanup runs whenever this useEffect function runs,
// before it runs, except for the very first time when it runs.

this cleanup function will run.

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);


//=========================