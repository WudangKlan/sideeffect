import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type==="INPUT_BLUR"){
    return { value: state.value, isValid: state.value.includes('@') };
  }


};


const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length>6 };
  }

  if (action.type==="INPUT_BLUR"){
    return { value: state.value, isValid: state.value.trim().length>6 };
  }


};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

 // console.log(emailState)

 const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: "",
  isValid: null,
});

//console.log(passwordState)

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState();

  //useEffect run after component has run, useEffect run at last
  // useEffect(()=>{
  //   console.log('EFFECT RUNNING')
  // })

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEAN UP");
  //   };
  // }, []);

   const {isValid : emailIsValid}= emailState;
   const {isValid: passwordIsValid}=passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");

      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    //should return as function.
    //after dependency change . this function will read first before useEsffect
    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);
  //console.log(enteredEmail)

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

   // setFormIsValid(event.target.value.trim().includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value })
    //setEnteredPassword(event.target.value);
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    //console.log(formIsValid)
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR"})
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
