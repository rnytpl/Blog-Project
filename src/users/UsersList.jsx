import React from "react";
import { styled } from "@mui/material/styles";
import { useGetUsersQuery } from "./usersSlice";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.fontColor.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersList = () => {
  const { data: users, isLoading } = useGetUsersQuery("getUsers");

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>USERS LIST</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.ids.map((id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  <Typography
                    component={Link}
                    to={`/users/${id}`}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {users.entities[id].name}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersList;
