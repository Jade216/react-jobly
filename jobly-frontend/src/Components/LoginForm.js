import React, { useState } from "react";
import JoblyApi from "../api";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let token = await JoblyApi.login(formData);
      login(token, formData.username);  // Pass the username along with the token
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
