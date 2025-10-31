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

    async addUser(userid){
        try {
            return await this.database.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteUserTableId,
                rowId: userid,
                data: {
                    myproducts: "[]",
                    orders: "[]",
                    wishlist: "[]",
                    cart: "[]",
                    addresses: "[]",
                }
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || ADDING USER ERR: ", error)
        }
    }

    async addOtherData({userid, userdata}){
        try {
            await this.database.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteUserTableId,
                rowId: userid,
                data: {...userdata}
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || ADDING OTHER DATA ERR: ", error)
        }
    }

    async getOtherData(rowId){
        try {
            return await this.database.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteUserTableId,
                rowId,
            })
        } catch (error) {
            console.log("APPWRITE SERVICE || GETING OTHER DATA ERR: ", error)
        }
    }
}

const service = new Service();
export default service;