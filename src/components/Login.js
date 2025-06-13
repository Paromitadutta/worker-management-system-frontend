import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://worker-management-system-backend-production.up.railway.app/api/login/add",
        formData
      );
      console.log("Login saved:", response.data);
      setSuccess("Login data saved to database!");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
