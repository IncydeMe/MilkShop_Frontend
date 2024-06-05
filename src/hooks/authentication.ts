import { useState, useEffect } from "react";
import axios from "axios";
import type { Account } from "../types/account";

//Login, Logout & Register Account

//Post login account
export const useLogin = async (email: string, password: string) => {
    const loginData = {
        email: email,
        password: password
    };
    
    try {
        const response = await axios.post("/authentication", loginData);
        console.log("Result: "+ JSON.stringify(response, null, 2));
    } catch (error : any) {
        throw new Error(error.message);
    }
};

//Register account
export const useRegister = async (account: Account) => {
    try {
        const result = await axios.post("/accounts", account);
        console.log(result);
    } catch (error : any) {
        throw new Error(error.message);
    }
};
