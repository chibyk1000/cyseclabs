import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { RiUploadCloudFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#333",
  borderRadius: "1em",
  boxShadow: 24,
  p: 4,
};
const Labs = () => {
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [data, setData] = React.useState([]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/users/getlabs", {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleDelete = async (labId) => {
    try {
      const resp = await axios.post(
        "/manage/delete-lab",
        { labId },
        {
          headers: {
            authorization: JSON.parse(sessionStorage.getItem("token"))?.token,
          },
        }
      );
      if (resp.status === 200) {
        toast.success("lab deleted");
      } else {
        toast.error(resp.response.data.message);
      }
    } catch (error) {}
  };
  const categories = [
    { id: 1, name: "web" },
    { id: 2, name: "linux" },
    { id: 3, name: "forensics" },
    { id: 4, name: "windows" },
    { id: 5, name: "cryptography" },
    { id: 6, name: "osint" },
  ];

  const teams = [
    { id: 1, name: "redteam" },
    { id: 2, name: "blueteam" },
  ];
  const onSubmit = () => {};
  return (
    <div className="box create-labs">
      <h5>Labs</h5>

      <div>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>

                        <TableCell>
                          <Link
                            to={`/dashboard/edit-lab/${row.id}`}
                            className="edit-btn"
                          >
                            <FaEdit size={20} />
                          </Link>
                          <button
                            className="del-btn"
                            onClick={() => handleDelete(row.id)}
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

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        </Box>
      </Modal> */}
    </div>
  );
};

export default Labs;
