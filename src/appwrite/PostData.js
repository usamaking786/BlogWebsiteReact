import {Client, ID, Query, Databases, Storage} from 'appwrite'
import conf from '../conf/conf'

class PostData {
client = new Client();

database; 
bucket;

constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectID);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);

}

// Create Post
async createPost ({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId}){

        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
    
            )
        } catch (error) {
            console.log("Appwrite service :: Create Post", error);
        }

}

async getPosts(queries = [Query.equal("status","active")]){
    try {
        return await this.database.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
        )
        
    } catch (error) {
        console.log("Appwrite getting all the documents" , error);
    }
}

// Get Single Post
async getPost(slug){
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
       ) 
        // One task is here. Please console the values and check it.
    
    } catch (error) {
        console.log("Appwrite Get one Post in Database", error)
    }
}

// Delete Single Post

async deletePost(slug) {
    try {
        await this.database.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug
        )
        return true;
    } catch (error) {
        console.log("Appwrite deletePost", error)
    }
}

// Update Post will be here
async updatePost(slug, {title, content, featuredImage, status}) {
try {
   return await this.database.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    )
} catch (error) {
    console.log("Appwrite update Post Error", error)
}

}

// Upload File

async uploadFile(file) {
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite Upload File", error);       
    }
}

// Get file Perview
getFilePreview(fileId) {
    try {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId,
        )
    } catch (error) {
        console.log("Appwrite File Perview", error);
    }
}

// upload file ended

// Delete the File
async deleteFile(fileID)
{
    try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileID
        )
    } catch (error) {
        console.log("Appwrite Delete File", error);
    }
}

}

const postServices = new PostData();

export default postServices;
