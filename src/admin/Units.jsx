import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const Units = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = () => {};

  React.useEffect(() => {
    axios
      .get("/manage/getunits", {
        headers: {
          authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });
  }, []);

  return (
    <div className="box create-labs">
      <h5>Units</h5>
      <Paper sx={{ width: "100%", overflow: "hidden", background: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Id
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Lab Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.heading}</TableCell>

                      <TableCell>
                        <Link
                          to={`/dashboard/tasks/${row._id}`}
                          className="edit-btn"
                        >
                          <FaEdit size={20} />
                        </Link>
                        <button
                          className="del-btn"
                          onClick={() => handleDelete(row._id)}
                        >
                          <MdDeleteForever size={20} />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          sx={{ color: "white", fontSize: "1em" }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Units;
