import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography, Card } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/tasks");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8, p: 4, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
