import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import {
  Container, Typography, TextField, Button, Box,
  Card, MenuItem
} from "@mui/material";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    const res = await API.get(`tasks/${id}/`);
    setTask(res.data);
  };

  const updateTask = async () => {
    await API.put(`tasks/${id}/`, task);
    alert("Task updated!");
  };

  const deleteTask = async () => {
    await API.delete(`tasks/${id}/`);
    navigate("/tasks");
  };

  useEffect(() => {
    fetchTask();
    // eslint-disable-next-line
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Edit Task</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <TextField
            select
            label="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            select
            label="Priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={task.due_date || ""}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={updateTask}>Save</Button>
            <Button variant="outlined" color="error" onClick={deleteTask}>Delete</Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default TaskDetail;
