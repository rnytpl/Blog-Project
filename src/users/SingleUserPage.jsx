import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useGetPostsByUserQuery } from "posts/postsSlice";
import React from "react";
import { useParams } from "react-router-dom";
import { parseISO } from "date-fns/esm";
import { format } from "date-fns";

const SingleUserPage = () => {
  const { userId } = useParams();
  const {
    data: posts,
    isLoading,
    isSuccess: isUsersSuccess,
  } = useGetPostsByUserQuery(userId);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>USERS LIST</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts &&
              posts.ids.map((id) => {
                const date = parseISO(posts.entities[id].date);
                return (
                  <StyledTableRow key={id}>
                    <StyledTableCell component="th" scope="row">
                      <Typography
                        component={Link}
                        to={`/posts/${id}`}
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        {posts?.entities[id].title}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      {format(date, "mm/dd/yyyy")}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SingleUserPage;
