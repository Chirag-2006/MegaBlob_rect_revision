const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceKey: String(import.meta.env.VITE_TINYMCE_KEY),
};

if (
  !config.appwriteUrl ||
  !config.appwriteProjectId ||
  !config.appwriteDatabaseId ||
  !config.appwriteCollectionId ||
  !config.appwriteBucketId ||
  !config.tinymceKey
) {
  throw new Error(
    "Appwrite configuration is missing. Please check your environment variables.",
  );
}

export default config;
