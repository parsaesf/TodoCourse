import React, { useState, useEffect } from "react";
import API from "../api";
import {
  Container, Typography, TextField, Button, Box,
  Card, CardContent, IconButton, Chip, Grid, MenuItem
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "medium",
    status: "pending",
  });

  const fetchTasks = async () => {
    let query = [];
    if (filters.status) query.push(`status=${filters.status}`);
    if (filters.priority) query.push(`priority=${filters.priority}`);
    if (filters.search) query.push(`search=${filters.search}`);
    const queryString = query.length ? `?${query.join("&")}` : "";

    const res = await API.get(`tasks/${queryString}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [filters]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post("tasks/", form);
    setForm({ title: "", description: "", due_date: "", priority: "medium", status: "pending" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`tasks/${id}/`);
    fetchTasks();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Tasks</Typography>

      {/* Filter Form */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          label="Search"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <Button variant="outlined" onClick={() => setFilters({ status: "", priority: "", search: "" })}>
          Reset
        </Button>
      </Box>

      {/* Task Form */}
      <Box component="form" onSubmit={createTask} sx={{ mb: 4, display: "flex", gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Due Date"
          name="due_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.due_date}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">Add</Button>
      </Box>

      {/* Task List */}
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" component={Link} to={`/tasks/${task.id}`} style={{ textDecoration: "none" }}>
                    {task.title}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={task.priority} size="small" color={
                      task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "success"
                    } sx={{ mr: 1 }} />
                    <Chip label={task.status} size="small" color={
                      task.status === "completed" ? "success" : "info"
                    } />
                  </Box>
                  {task.due_date && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Due: {task.due_date}
                    </Typography>
                  )}
                </Box>
                <IconButton color="error" onClick={() => deleteTask(task.id)}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Tasks;
