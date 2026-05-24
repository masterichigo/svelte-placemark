import axios from "axios";
import type { places, Session, User } from "$lib/types/poi-types";



export const apiService = {
  baseUrl: "https://full-stack-1-tj6f.onrender.com",
  //  baseUrl: "https://donation-web-api-ts.glitch.me",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      console.log("Login response:", response.data);
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getPlaces(token: string, loggedInUser: Session): Promise<places[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories/" + loggedInUser._id + "/pois");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
