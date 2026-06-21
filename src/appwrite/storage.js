// file upload service class
// file delete service class
// file preview service class

import config from "../config/config.js";
import { Client, Storage, ID } from "appwrite";

export class StorageServices {
  client = new Client();
  storage;

  constructor() {
    this.client = this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async fileUpload(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.error("appwrite Error :: fileUpload :", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("appwrite Error :: deleteFile :", error);
      return false;
    }
  }

  filePreview(fileId) {
    try {
      const result = this.storage.getFileView(config.appwriteBucketId, fileId);
      console.log("restul in filePrevei" ,result)
      return result
    } catch (error) {
      console.error("appwrite Error :: getFilePreview :", error);
      throw error;
    }
  }
}

const storageServices = new StorageServices();

export default storageServices;
