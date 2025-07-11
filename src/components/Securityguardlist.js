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

const SecurityList = () => {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://worker-management-system-backend-production.up.railway.app/api/securityguardone"
      )
      .then((response) => {
        const res1 = response.data;
        axios
          .get(
            "https://worker-management-system-backend-production.up.railway.app/api/securityguardtwo"
          )
          .then((response) => {
            setGuards((prev) => [...res1, ...response.data]);
          })
          .catch((err) => {
            setError("Failed to fetch security data");
            setLoading(false);
            console.error(err);
          });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch security data");
        setLoading(false);
        console.error(err);
      });
  }, []);

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
        Security Guard Booking List
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
          {guards.map((guard) => (
            <TableRow key={guard.userId} hover>
              <TableCell>{guard.userId}</TableCell>
              <TableCell>{guard.fullName}</TableCell>
              <TableCell>{guard.emailAddress}</TableCell>
              <TableCell>{guard.mobileNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SecurityList;
