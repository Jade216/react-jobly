import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    console.log("Token being used:", JoblyApi.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      console.log("API Response:", response);
      return response.data;

    } catch (err) {
      console.error("API Error:", err.response);
      throw new Error(err.response?.data?.error?.message || "API request failed");
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", data.username);
    JoblyApi.token = res.token;
    return res.token;
  }

  static async getCurrentUser(username) {
    console.log("getCurrentUser called with username:", username);
    console.log("Using Token:", JoblyApi.token);
    if (!JoblyApi.token) {
      throw new Error("No token set!");
    }
    try {
      let res = await this.request(`users/${username}`);
      console.log("Successfully fetched user:", res);
      return res.user;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw new Error("Failed to fetch user information");
    }
  }
  

  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    JoblyApi.token = res.token;
    return res.token;
  }

  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
