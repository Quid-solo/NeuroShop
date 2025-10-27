import conf from "./configVariables/conf";
import { Client, TablesDB, Query, ID } from "appwrite";

export class Service{
    client = new Client();
    database;
    constructor(){
        this.client
                .setEndpoint(conf.appwriteEndpoint)
                .setProject(conf.appwriteProjectId);
        this.database = new TablesDB(this.client);
    }

    async addProduct({mrp, platform}){
        try {
            return await this.database.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteProductTableId,
                rowId: ID.unique(),
                data: {
                    mrp,
                    platform,
                }
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || ADDPRODUCT ERR: ", error);
        }
    }

    async updateProduct(){
        try {
            
        } catch (error) {
            console.log("APPWRITE SERVICE || UPDATEPRODUCT ERR: ", error);
        }
    }

    async removeProduct(rowId){
        try {
            return await this.database.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteProductTableId,
                rowId,
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || REMOVEPRODUCT ERR: ", error);
        }
    }

    async getProduct(rowId){
        try {
            return await this.database.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteProductTableId,
                rowId,
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || GETPRODUCT ERR: ", error);
        }
    }

    async getProducts(){
        try {
            return await this.database.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteProductTableId,
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || GETPRODUCTS ERR: ", error);
        }
    }
}

const service = new Service();
export default service;