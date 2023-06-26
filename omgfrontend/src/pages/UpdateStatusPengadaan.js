import React, {useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideBar from "../components/SideBar";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import TopBar from "../components/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import AuthService from "../Services/auth.services.js";
import Swal from "sweetalert";
import MaterialReactTable from "material-react-table";

const StatusData = {
  Purchaser: ["Menunggu Persetujuan Purchaser", "Diproses", "Ditolak"],

  Warehouse: ["Diproses", "Selesai"],

  Admin: ["Menunggu Persetujuan Purchaser", "Diproses", "Ditolak", "Selesai"],
};

const user = AuthService.getCurrentUser();

const UpdateStatusPengadaan = () => {
  const { id_pengadaan } = useParams();
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [requester, setRequester] = useState();
  const [purchaser, setPurchaser] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/pengadaan/" + id_pengadaan, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((json) =>
            setData(
                {
                  id_pengadaan: json.id_pengadaan,
                  namaProyek: json.namaProyek,
                  permintaan: json.permintaan,
                  tanggal_permintaan: json.tanggal_permintaan,
                  tanggal_perkiraan: json.tanggal_perkiraan,
                  status: json.status,
                  alasan_penolakan: json.alasan_penolakan,
                },
                setSelectedValue(json.status)
            )
        )
        .catch(() => {
          console.log("Error");
        });
  }, []);

  useEffect(() => {
    fetch(
        "http://localhost:8000/api/v1/pengadaan/" + id_pengadaan + "/list-jumlah",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
    )
        .then((response) => response.json())
        .then((json) => {
          setRows(json);
        });
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/pengadaan/' + id_pengadaan + '/manajer', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json())
        .then((json) => setRequester(json.nama))
        .catch(() => {
          console.log("Error");
        });
  }, []);

  useEffect(() => {
    fetch(
        "http://localhost:8000/api/v1/pengadaan/" + id_pengadaan + "/purchaser",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
    )
        .then((response) => response.json())
        .then((json) => setPurchaser(json.nama))
        .catch(() => {
          console.log("Error");
        });
  }, []);

  useEffect(() => {
    fetch(
        "http://localhost:8000/api/v1/pengadaan/" + id_pengadaan + "/list-jumlah",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
    )
        .then((response) => response.json())
        .then((json) => {
          setRows(json);
        });
  }, []);

  useEffect(() => {
    fetch(
        "http://localhost:8000/api/v1/pengadaan/" + id_pengadaan + "/list-user",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
    )
        .then((response) => response.json())
        .then((json) => {
          setUsers(json);
        });
  }, []);

  const handleUpdate = () => {
    data["listUser"] = users;
    fetch("http://localhost:8000/api/v1/pengadaan/ubah-status/" + id_pengadaan, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Pengadaan Updated");
      console.log(data);
      setData(data);
      Swal({
        title: "Update Status Pengadaan",
        text: "Berhasil Update Status Pengadaan",
        icon: "success",
        button: "OK",
      });
      navigate("/pengadaan/detail/" + id_pengadaan);
    });
  };

  const handleSelesai = () => {
    fetch(
        "http://localhost:8000/api/v1/pengadaan/" +
        id_pengadaan +
        "/list-jumlah/edit",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rows),
        }
    ).then(() => {
      console.log("Stock Updated");
      console.log(data);
      setData(rows);
      Swal({
        title: "Update Status Pengadaan",
        text: "Berhasil Update Status Pengadaan",
        icon: "success",
        button: "OK",
      });
      navigate("/pengadaan/detail/" + id_pengadaan);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (name == "status") {
      setSelectedValue(value);
    }
  };

  const theme = createTheme({
    palette: {
      error: {
        main: "#ff5f5f",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#60626e",
        contrastText: "#ffffff",
      },
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    document.title = "Update Status Pengadaan";
  }, []);

  const dateStyle = {
    border: "1px solid #ccc",
    width: "auto",
    display: "inline-block",
  };

  const columns = useMemo(() => [
    {
      accessorKey: "material.id_material",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false,
      enableSorting: true,
      size: 60,
    },
    {
      accessorKey: "material.nama",
      header: "Nama",
      enableColumnOrdering: false,
      size: 100,
    },
    {
      accessorKey: "material.tipe",
      header: "Tipe",
      enableColumnOrdering: false,
      size: 100,
    },
    {
      accessorKey: "material.kategori",
      header: "Kategori",
      enableColumnOrdering: false,
      size: 150,
    },
    {
      accessorKey: "material.merk",
      header: "Merek",
      enableColumnOrdering: false,
      size: 100,
    },
    {
      accessorKey: "jumlah",
      header: "Diminta",
      enableColumnOrdering: false,
      size: 100,
    },
  ]);

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar></TopBar>
        <SideBar></SideBar>
        <ThemeProvider theme={theme}>
          <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Box
                sx={{
                  border: 1,
                  p: 5,
                  borderRadius: "8px",
                  borderColor: "#DFE0EB",
                }}
            >
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Id Pengadaan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>{id_pengadaan}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Tanggal Permintaan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>{data.tanggal_permintaan}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Id Permintaan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      {data.permintaan == null
                          ? "-"
                          : data.permintaan.id_permintaan}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Perkiraan Penerimaan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {data.status === "Menunggu Persetujuan Purchaser" ||
                    (data.status === "Diproses" &&
                        (user.role === "Purchaser" || user.role === "Admin")) ? (
                        <>
                          <input
                              type="datetime-local"
                              name="tanggal_perkiraan"
                              value={data.tanggal_perkiraan}
                              onChange={handleInputChange}
                              style={dateStyle}
                          />
                        </>
                    ) : (
                        <Typography>
                          {data.tanggal_perkiraan == null
                              ? "-"
                              : data.tanggal_perkiraan}
                        </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Nama proyek
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography> {data.namaProyek == "" ? "-" :data.namaProyek}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>Requester</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>{requester}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {data.status === "Menunggu Konfirmasi Purchaser" &&
                    (user.role === "Purchaser" || user.role === "Admin") ? (
                        <Typography>{data.status}</Typography>
                    ) : (
                        <Select
                            required
                            fullWidth
                            id="status"
                            name="status"
                            value={selectedValue}
                            onChange={handleInputChange}
                        >
                          {StatusData[user.role].map((s) => (
                              <MenuItem value={s}>{s}</MenuItem>
                          ))}
                        </Select>
                    )}
                  </Grid>
                  {data.status === "Ditolak" ? (
                      <>
                        <Grid item xs={12} sm={2}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            Alasan Penolakan
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                              required
                              fullWidth
                              id="alasan_penolakan"
                              name="alasan_penolakan"
                              value={data.alasan_penolakan}
                              onChange={handleInputChange}
                          />
                        </Grid>
                      </>
                  ) : (
                      <></>
                  )}
                </Grid>
                <Toolbar></Toolbar>
                <Grid container spacing={2}>
                  <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "center", mb: 3 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Daftar Barang:
                    </Typography>
                  </Grid>
                </Grid>
                <MaterialReactTable
                    displayColumnDefOptions={{
                      "mrt-row-actions": {
                        muiTableBodyCellProps: {
                          align: "center",
                        },
                        size: 100,
                      },
                    }}
                    columns={columns}
                    data={rows}
                    editingMode="modal"
                    enableColumnOrdering
                    enableColumnResizing
                    muiTableBodyProps={{
                      sx: {
                        "& tr:nth-of-type(odd)": {
                          backgroundColor: "#FCF4A3",
                        },
                      },
                    }}
                />
                {/*<TableContainer component={Paper}>*/}
                {/*  <Table sx={{ minWidth: 700 }} aria-label="customized table">*/}
                {/*    <TableHead>*/}
                {/*      <TableRow>*/}
                {/*        <StyledTableCell>No.</StyledTableCell>*/}
                {/*        <StyledTableCell>Id</StyledTableCell>*/}
                {/*        <StyledTableCell>Nama</StyledTableCell>*/}
                {/*        <StyledTableCell>Tipe</StyledTableCell>*/}
                {/*        <StyledTableCell>Kategori</StyledTableCell>*/}
                {/*        <StyledTableCell>Merek</StyledTableCell>*/}
                {/*        <StyledTableCell>Stok Diminta</StyledTableCell>*/}
                {/*      </TableRow>*/}
                {/*    </TableHead>*/}
                {/*    <TableBody>*/}
                {/*      {rows.map((row, idx) => (*/}
                {/*          <StyledTableRow key={idx}>*/}
                {/*            <StyledTableCell component="th" scope="row">*/}
                {/*              {idx + 1}*/}
                {/*            </StyledTableCell>*/}
                {/*            <StyledTableCell>*/}
                {/*              {row.material.id_material}*/}
                {/*            </StyledTableCell>*/}
                {/*            <StyledTableCell>{row.material.nama}</StyledTableCell>*/}
                {/*            <StyledTableCell>{row.material.tipe}</StyledTableCell>*/}
                {/*            <StyledTableCell>*/}
                {/*              {row.material.kategori}*/}
                {/*            </StyledTableCell>*/}
                {/*            <StyledTableCell>{row.material.merk}</StyledTableCell>*/}
                {/*            <StyledTableCell>{row.jumlah}</StyledTableCell>*/}
                {/*          </StyledTableRow>*/}
                {/*      ))}*/}
                {/*    </TableBody>*/}
                {/*  </Table>*/}
                {/*</TableContainer>*/}
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                        type="button"
                        color="secondary"
                        variant="outlined"
                        sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                        onClick={() =>
                            navigate("/pengadaan/detail/" + id_pengadaan)
                        }
                    >
                      Kembali
                    </Button>
                  </Grid>
                  <Grid item>
                    {data.status === "Selesai" &&
                    (user.role === "Warehouse" || user.role === "Admin") ? (
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                            onClick={handleSelesai}
                        >
                          Simpan
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                            onClick={handleUpdate}
                        >
                          Simpan
                        </Button>
                    )}
                  </Grid>
                </Grid>
                <Typography></Typography>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
  );
};

export default UpdateStatusPengadaan;
