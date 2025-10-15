import conf from "../configVariables/conf";

import { Client, Account, ID } from "appwrite";

class AuthSevice{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createUser({email, password, name}){
        try {
            const user = await this.account.create({
                userId : ID.unique(),
                email,
                password,
                name,
            })
            if(user){
                this.logout();
                return await this.login({email,password});

            } else return null;

        } catch (error) {
            console.log("Appwrite || CreateUser || error", error);
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            console.log("Appwrite || login || error", error);
        }
    }

    async logout () {
        try {
            await this.account.deleteSession({sessionId: 'current'});
        } catch (error) {
            console.log("Appwrite || logout || error", error);
        }
    }

    async getCurrentUser () {
        try {
            return this.account.get();
        } catch (error) {
            console.log("Appwrite || getCurrentUser || error", error);
        }
    }
}

const authService = new AuthSevice();

export default authService;