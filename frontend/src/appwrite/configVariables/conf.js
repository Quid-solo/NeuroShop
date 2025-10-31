const conf = {
    appwriteEndpoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUserTableId : String(import.meta.env.VITE_APPWRITE_USER_TABLE_ID),
    appwriteProductTableId : String(import.meta.env.VITE_APPWRITE_PRODUCT_TABLE_ID),
    backendUrl : String(import.meta.env.VITE_BACKEND_URL),
};

export default conf;