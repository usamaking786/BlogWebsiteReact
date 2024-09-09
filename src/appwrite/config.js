import {Client, Account, ID} from 'appwrite'
import conf from '../conf/conf.js';

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client)
    }

    async createAccount({name,email,password}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            )
            if(userAccount)
            {
                return this.login({email, password});
            }
        } catch (error) {
            console.log("Appwrite Create Account Error", error);
        }
    }
    async login({email,password})
    {
        try {
           return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite Login Function Error: ", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService= new AuthService();

export default authService;
