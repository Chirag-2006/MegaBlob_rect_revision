// create post service class
// update post service class
// delete post service class
// get post by id service class
// get all posts service class with active status

import config from "../config/config.js";
import { Client, TablesDB, ID, Query } from "appwrite";

export class DbServices {
  client = new Client();
  databases;

  constructor() {
    this.client = this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new TablesDB(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId, status }) {
    try {
      const post = await this.databases.createRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          featuredImage,
          userId,
          status,
        },
      );
      return post;
    } catch (error) {
      console.error("appwrite Error :: createPost :", error);
      throw error;
    }
  }

  async updatePost(postId, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.error("appwrite Error :: updatePost :", error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
    await this.databases.deleteRow(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId,
      );
      return true;
    } catch (error) {
      console.error("appwrite Error :: deletePost :", error);
      return false;
    //   throw error;
    }
  }

  async getPostById(postId) {
    try {
    return await this.databases.getRow(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      postId,
    );
    } catch (error) {
      console.error("appwrite Error :: getPostById :", error);
      throw error;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listRows(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        query,
      );
    } catch (error) {
      console.error("appwrite Error :: getPosts :", error);
      throw error;
    }
  }
}

const dbServices = new DbServices();

export default dbServices;
