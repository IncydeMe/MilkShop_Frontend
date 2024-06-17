import React from "react";
import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { useSingleAccount } from "../account/useAccount";

export const useLogin = () => {
    const [href, setHref] = React.useState<string>('');//Set the href to redirect after login

    const login = async (email: string, password: string) => {
        try{
            //Call the Login API
            const res = await axios.post('/login', null, { params: {email, password} })
            //Get the status and its data
            const { status, data } = res.data;

            //Check success-fail status
            //Status = 1: Success
            if(status === 1) {
                //If success do 2 things

                //1. Set the token to cookies
                cookies().set('token', data.token);//Set the token to cookies
                //2. Get the account info and set it to cookies
                const { account } = await useSingleAccount(data.id); // Await the result of useSingleAccount
                cookies().set('account', JSON.stringify(account));//Set the account info to cookies

                //3. Return the URL to redirect
                switch(account?.role) {
                    //ENum switch case
                    case 'ADMIN':
                        setHref('/admin');//Return Admin page
                        break;
                    case 'MANAGER':
                        setHref('/manager');//Return Manager page
                        break;
                    case 'STAFF':
                        setHref('/staff');//Return Manager page
                        break;
                    default:
                        setHref('/');//Return Manager page
                        break;
                }
            }
            else {
                window.alert('Login failed');//Alert for debugging
            }
        }
        catch(error: any) {
            window.alert('Login failed' + error);//Alert for debugging
            return false;
        }

        //Return the URL to redirect
        return href;
    }
}