import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  Toolbar,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/AppBar";
import AuthService from "../Services/auth.services";
import propil from '../image/profil.png';
import Typography from "@mui/material/Typography";

const DetailProfil = () => {
  const user = AuthService.getCurrentUser();
  const { idKaryawan } = useParams();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [role, setRole] = useState("");

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

  useEffect(() => {
    document.title = "Detail Profil Pengguna";
    fetch("http://localhost:8000/api/v1/user/" + idKaryawan, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        // setIdKaryawan(json.id_karyawan);
        setNama(json.nama);
        setEmail(json.email);
        setNoTelepon(json.noTelepon);
        setRole(json.role);
      });
  });

  const navigate = useNavigate();

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
              <Grid container>
                
              <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box mr={2}>
                      <img src={propil} />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Box ml={8}>

                      <Grid item xs={12} sm={6}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Id Karyawan
                        </InputLabel>
                        <TextField
                          required
                          style = {{width: 600}}
                          variant="filled"
                          InputProps={{ disableUnderline: true, readOnly: true, }}
                          hiddenLabel
                          id="idKaryawan"
                          name="idKaryawan"
                          autoComplete="idKaryawan"
                          value={idKaryawan}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Nama
                        </InputLabel>
                        <TextField
                          required
                          style = {{width: 600}}
                          variant="filled"
                          InputProps={{ disableUnderline: true, readOnly: true, }}
                          hiddenLabel
                          id="nama"
                          name="nama"
                          autoComplete="nama"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Email
                        </InputLabel>
                        <TextField
                          required
                          style = {{width: 600}}
                          variant="filled"
                          hiddenLabel
                          InputProps={{ disableUnderline: true, readOnly: true, }}
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <InputLabel id="demo-simple-select-helper-label">
                          No Telepon
                        </InputLabel>
                        <TextField
                          required
                          style = {{width: 600}}
                          variant="filled"
                          hiddenLabel
                          InputProps={{ disableUnderline: true, readOnly: true, }}
                          id="noTelepon"
                          name="noTelepon"
                          autoComplete="noTelepon"
                          value={noTelepon}
                          onChange={(e) => setNoTelepon(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Role
                        </InputLabel>
                        <TextField
                          required
                          style = {{width: 600}}
                          variant="filled"
                          hiddenLabel
                          InputProps={{ disableUnderline: true, readOnly: true, }}
                          id="role"
                          name="role"
                          autoComplete="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </Grid>
    
                  </Box>
                </Grid>
                </Grid>

                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        type="button"
                        color="secondary"
                        variant="outlined"
                        sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                        onClick={() => navigate("/dasbor")}
                      >
                        Kembali
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
                        onClick={() =>
                          navigate("/password/ubah/" + idKaryawan)
                        }
                      >
                        Ubah Password
                      </Button>
                    </Grid>
                  </Grid>

            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default DetailProfil;
