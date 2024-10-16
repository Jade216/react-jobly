import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar';
import JoblyApi from "./api";
import CompanyList from './routes/CompanyList';
import JobList from './routes/JobList';
import CompanyDetail from './routes/CompanyDetail';
import LoginForm from './Components/LoginForm';
import ProfileForm from "./Components/ProfileForm";
import HomePage from './Components/HomePage';
import SignupForm from "./Components/SignupForm";

function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);

  // Set the token and username if they exist in localStorage
  useEffect(() => {
    console.log("Current Token from State:", token);
    if (token && username) {
      JoblyApi.token = token;
      fetchUser(username);
    }
  }, [token, username]);

  // Fetch current user after setting token
  async function fetchUser(username) {
    try {
      const user = await JoblyApi.getCurrentUser(username);
      setCurrentUser(user);
    } catch (err) {
      console.error("Fetch user error:", err);
    }
  }

  // Update the login function to save the token and username to localStorage
  async function login(token, username) {
    setToken(token);  // Set the token state
    setUsername(username);  // Set the username state
    localStorage.setItem("token", token);  // Store token in local storage
    localStorage.setItem("username", username);  // Store username in local storage
    JoblyApi.token = token;  // Set JoblyApi token
    await fetchUser(username);  // Fetch the current user with the proper username
  }

  function logout() {
    setToken(null);
    setUsername(null);
    setCurrentUser(null);
    JoblyApi.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  async function handleSignup(signupData) {
    let token = await JoblyApi.signup(signupData);
    login(token, signupData.username);
  }

  useEffect(() => {
    async function getCompanies() {
      try {
        let companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    getCompanies();
  }, []);

  useEffect(() => {
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm signup={handleSignup} />} />
        <Route path="/login" element={<LoginForm login={(token, username) => login(token, username)} />} />
        <Route path="/companies" element={token ? <CompanyList companies={companies} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={<ProfileForm user={currentUser} updateUser={setCurrentUser} />} />
        <Route path="/jobs" element={<JobList jobs={jobs} />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
