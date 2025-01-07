import conf from "../conf/conf";
import { appwriteDB, account } from "../utills/appwriteConfig.js";
import { ID } from 'appwrite';
import Cookies from 'js-cookie';

const AuthService = {
  saveUserIdToCookie: (userId) => {
    if (userId) {
      Cookies.set('userId', userId, { expires: 7, secure: true, sameSite: 'strict' });
    } else {
      console.error('Error saving user ID to cookie: User ID is empty');
    }
  },

  getUserIdFromCookie: () => {
    return Cookies.get('userId');
  },

  clearUserIdCookie: () => {
    Cookies.remove('userId');
  },

  createUser: async (name, email, password, role = "student") => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      const profile = await appwriteDB.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        ID.unique(),
        {
          name,
          email,
          role,
          userId: user.$id,
        }
      );
      return { user, profile };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      // Save user ID to cookies for persistence
      AuthService.saveUserIdToCookie(user.$id);

      return { session, user };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
      AuthService.clearUserIdCookie();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
};

export default AuthService;