import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client = this.client
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) {
        // call login function for this user
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("appwrite Error :: createAccount :", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession(
        email,
        password,
      );  // createEmailPasswordSession me object nhi dete ye eak function hai to sidhe hi parameter pass karte hai
      if (!user) {
        console.log("failed to login user");
      }
      return user;
    } catch (error) {
      console.error("appwrite Error :: login :", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("appwrite Error :: logout :", error);
      return null
    }
  }

  async getCurrentUser() {
    try {
      console.log("enter in getCurrent user funciton")
      const user = await this.account.get();
      console.log("user",user)
      return user;
    } catch (error) {
      console.error("appwrite Error :: getCurrentUser :", error);
      throw error;
    }
  }
}

const authService = new AuthServices();

export default authService;
