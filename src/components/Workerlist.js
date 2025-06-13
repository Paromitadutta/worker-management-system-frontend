import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://worker-management-system-backend-production.up.railway.app/api/workerone"
      )
      .then((response) => {
        setWorkers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch worker data");
        setLoading(false);
        console.error(err);
      });

    axios
      .get(
        "https://worker-management-system-backend-production.up.railway.app/api/workertwo"
      )
      .then((response) => {
        setWorkers((prev) => [...prev, ...response.data]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch worker data");
        setLoading(false);
        console.error(err);
      });
  }, [setWorkers]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1000, margin: "auto", marginTop: 4 }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        align="center"
        sx={{ paddingTop: 2 }}
      >
        Workers Booking List
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>User ID</TableCell>
            <TableCell sx={{ color: "white" }}>Full Name</TableCell>
            <TableCell sx={{ color: "white" }}>Email Address</TableCell>
            <TableCell sx={{ color: "white" }}>Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => (
            <TableRow key={worker.userId} hover>
              <TableCell>{worker.userId}</TableCell>
              <TableCell>{worker.fullName}</TableCell>
              <TableCell>{worker.emailAddress}</TableCell>
              <TableCell>{worker.mobileNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkerList;
