import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";
import { PersetujuanSupervisor } from '../overview/supervisor/PersetujuanSupervisor';
import { Inventori, JumlahPengadaan, JumlahPermintaan, StatusAdmin } from '../overview/admin/Card';
import { PersetujuanManajer, PengadaanDitolak, StatusManajer } from '../overview/manajer/Card';
import { PersetujuanPurchaser, StatusPurchaser } from '../overview/purchaser/Card';
import { PermintaanDitolak, KonfirmasiStaff, StatusStaff } from '../overview/staff/Card';
import { PenerimaanWarehouse, PengirimanWarehouse, StatusWh } from '../overview/warehouse/Card';
import { OverviewSales, OverviewPengadaan, OverviewPermintaan } from '../overview/MyChart';

import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  Toolbar,
  Grid,
  InputLabel,
  TextField,
  Card,
  CardContent,
  CardActions,
  Container,
  Stack


} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/AppBar";
import AuthService from "../Services/auth.services";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { grey } from '@mui/material/colors';
import { IoMdColorPalette } from "react-icons/io";
const Dasbor = () => {
  const user = AuthService.getCurrentUser();
  const { id_material } = useParams();
  const [data, setData] = useState({});

  const color = grey[100];


  const [permintaan, setPermintaan] = useState({});
  const [pengadaan, setPengadaan] = useState({});

  useEffect(() => {
    document.title = "Dasbor";
  }, []);

  useEffect(() => {
    {
      fetch("http://localhost:8000/api/v1/dashboard/" + user.id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) =>
          setData({
            JumlahPengadaan: json.jumlahPengadaan,
            JumlahPermintaan: json.jumlahPermintaan,
            JumlahInventori: json.jumlahInventori,
            ChartPermintaan: json.chartPermintaan,
            ChartPengadaan: json.chartPengadaan,
            permintaanDitolak: json.permintaan.ditolak,
            permintaanDikirim: json.permintaan.dikirim,
            permintaanWarehouse: json.permintaan.warehouse,
            permintaanSupervisor: json.permintaan.supervisor,
            permintaanManajer: json.permintaan.manajer,
            permintaanPengadaan: json.permintaan.pengadaan,
            permintaanSelesai: json.permintaan.selesai,

            pengadaanDitolak: json.pengadaan.ditolak,
            pengadaanDikirim: json.pengadaan.dikirim,
            pengadaanPurchaser: json.pengadaan.purchaser,
            pengadaanDiproses: json.pengadaan.diproses,
            pengadaanSelesai: json.pengadaan.selesai,

          })
        )
        .catch(() => {
          console.log("Error");
        });

      fetch("http://localhost:8000/api/v1/dashboard/" + user.id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) =>
          setPermintaan({
            ditolak: json.permintaan.ditolak,
            dikirim: json.permintaan.dikirim,
            warehouse: json.permintaan.warehouse,
            selesai: json.permintaan.selesai,
            pengadaan: json.permintaan.pengadaan,
            manajer: json.permintaan.manajer,
            supervisor: json.permintaan.supervisor


          })
        )
        .catch(() => {
          console.log("Error");
        });

      fetch("http://localhost:8000/api/v1/dashboard/" + user.id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) =>
          setPengadaan({
            purchaser: json.pengadaan.purchaser,
            dikirim: json.pengadaan.dikirim,
            diproses: json.pengadaan.diproses,
            ditolak: json.pengadaan.ditolak,
            selesai: json.pengadaan.selesai


          })
        )
        .catch(() => {
          console.log("Error");
        });


    }



  }, []);

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

  return (

    <Box sx={{ display: "flex" }}>
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
              p: 2,

            }}
          >
            <Container maxWidth="xl">
              <Grid container

                spacing={0}>
                {user.role == "Purchaser" ? (

                  <Grid container spacing={0}>

                    <Grid

                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '16px'
                        }}
                      >

                        <PersetujuanPurchaser
                          sx={{ height: '100%' }}
                          value={pengadaan.purchaser}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                    >

                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                    >

                    </Grid>


                    <Grid
                      xs={12}
                      lg={8}
                    >

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '16px'
                        }}
                      >
                        <OverviewPengadaan
                          chartSeries={[
                            {
                              name: 'Pengadaan',
                              data: data.ChartPengadaan
                            }

                          ]}
                          sx={{ height: '150%' }}
                        />
                      </Box>
                    </Grid>

                    <Grid
                      xs={12}
                      md={6}
                      lg={4}

                      alignItems="stretch"
                    >


                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '16px'
                        }}
                      >
                        <StatusPurchaser

                          pengadaan={pengadaan}
                          sx={{ height: '200%' }}
                        /></Box>

                    </Grid>
                  </Grid>
                )

                  : user.role == "Staff" ? (
                    <Grid container spacing={0}>
                      <Grid
                        xs={12}
                        sm={6}
                        lg={4}
                      >

                        <Box
                          sx={{
                            p: 2,
                          }}
                        >
                          <KonfirmasiStaff
                            sx={{ height: '100%' }}
                            value={permintaan.dikirim}
                          />
                        </Box>
                      </Grid>


                      <Grid
                        xs={12}
                        sm={6}
                        lg={4}
                      >
                        <Box
                          sx={{
                            p: 2,
                          }}
                        >

                          <PermintaanDitolak
                            sx={{ height: '100%' }}
                            value={permintaan.ditolak}
                          />
                        </Box>
                      </Grid>
                      <Grid
                        xs={12}
                        md={6}
                        lg={4}
                      >

                      </Grid>

                      <Grid
                        xs={12}
                        lg={8}
                      >

                        <Box
                          sx={{
                            p: 2,
                          }}
                        >
                          <OverviewPermintaan
                            chartSeries={[

                              {
                                name: 'Permintaan',
                                data: data.ChartPermintaan
                              }
                            ]}
                            sx={{ height: '100%' }}
                          />
                        </Box>
                      </Grid>

                      <Grid
                        xs={12}
                        md={6}
                        lg={4}
                      >
                        <Box
                          sx={{
                            p: 2,
                          }}
                        >
                          <StatusStaff
                            chartSeries={[63, 15, 22]}
                            permintaan={permintaan}

                            sx={{ height: '100%' }}
                          />
                        </Box>
                      </Grid>

                    </Grid>) :

                    user.role == "Warehouse" ?
                      (<Box>
                        <Grid container spacing={3}>

                          <Grid
                            xs={12}
                            sm={6}
                            lg={4}
                          >

                            <Box
                              sx={{
                                p: 2,
                              }}
                            >
                              <PenerimaanWarehouse
                                sx={{ height: '100%' }}
                                value={pengadaan.diproses}
                              />
                            </Box>
                          </Grid>

                          <Grid
                            xs={12}
                            sm={6}
                            lg={4}
                          >
                            <Box
                              sx={{
                                p: 2,
                              }}
                            >
                              <PengirimanWarehouse
                                sx={{ height: '100%' }}
                                value={permintaan.warehouse}
                              />
                            </Box>
                          </Grid>
                          <Grid
                            xs={12}
                            md={6}
                            lg={4}
                          >

                          </Grid>

                          <Grid
                            xs={12}
                            lg={8}
                          >
                            <Box
                              sx={{
                                p: 2,
                              }}
                            >
                              <OverviewSales
                                chartSeries={[
                                  {
                                    name: 'Pengadaan',
                                    data: data.ChartPengadaan
                                  },
                                  {
                                    name: 'Permintaan',
                                    data: data.ChartPermintaan
                                  }
                                ]}
                                sx={{ height: '100%' }}
                              />
                            </Box>
                          </Grid>



                          <Grid
                            xs={12}
                            md={6}
                            lg={4}
                          >
                            <Box
                              sx={{
                                p: 2,
                              }}
                            >
                              <StatusWh
                                chartSeries={[63, 15, 22]}
                                permintaan={permintaan}
                                pengadaan={pengadaan}
                                sx={{ height: '100%' }}
                              />
                            </Box>
                          </Grid>


                        </Grid>
                      </Box>)

                      : user.role == "Supervisor" ?
                        (
                          <Grid container spacing={0}>

                            <Grid
                              xs={12}
                              sm={6}
                              lg={4}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >

                                <PersetujuanSupervisor
                                  sx={{ height: '100%' }}
                                  value={permintaan.supervisor}
                                />
                              </Box>
                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                              lg={4}
                            >

                            </Grid>
                            <Grid
                              xs={12}
                              md={6}
                              lg={4}
                            >

                            </Grid>


                            <Grid
                              xs={12}
                              lg={8}
                            >

                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <OverviewPermintaan
                                  chartSeries={[

                                    {
                                      name: 'Permintaan',
                                      data: data.ChartPermintaan
                                    }
                                  ]}
                                  sx={{ height: '150%' }}
                                />
                              </Box>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              lg={4}

                              alignItems="stretch"
                            >


                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <StatusStaff

                                  permintaan={permintaan}
                                  sx={{ height: '200%' }}
                                /></Box>

                            </Grid>
                          </Grid>

                        )

                        : user.role == "Manajer" ?
                          (<Grid container spacing={0}>

                            <Grid
                              xs={12}
                              sm={6}
                              lg={4}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <PersetujuanManajer
                                  sx={{ height: '100%' }}
                                  value={permintaan.manajer}
                                />
                              </Box>
                            </Grid>

                            <Grid
                              xs={12}
                              sm={6}
                              lg={4}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <PengadaanDitolak
                                  sx={{ height: '100%' }}
                                  value={pengadaan.ditolak}
                                />
                              </Box>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              lg={4}
                            >

                            </Grid>

                            <Grid
                              xs={12}
                              lg={8}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <OverviewSales
                                  chartSeries={[
                                    {
                                      name: 'Pengadaan',
                                      data: data.ChartPengadaan
                                    },
                                    {
                                      name: 'Permintaan',
                                      data: data.ChartPermintaan
                                    }
                                  ]}
                                  sx={{ height: '100%' }}
                                />
                              </Box>
                            </Grid>

                            <Grid
                              xs={12}
                              md={6}
                              lg={4}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                }}
                              >
                                <StatusManajer
                                  chartSeries={[63, 15, 22]}
                                  permintaan={permintaan}
                                  pengadaan={pengadaan}
                                  sx={{ height: '100%' }}
                                />
                              </Box>
                            </Grid>




                          </Grid>
                          )

                          : user.role == "Admin" ?


                            (<Grid container spacing={3}>

                              <Grid
                                xs={12}
                                sm={6}
                                lg={4}
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                  }}
                                >
                                  <JumlahPengadaan
                                    sx={{ height: '100%' }}
                                    value={data.JumlahPengadaan}
                                  />
                                </Box>
                              </Grid>

                              <Grid
                                xs={12}
                                sm={6}
                                lg={4}
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                  }}
                                >
                                  <JumlahPermintaan
                                    sx={{ height: '100%' }}
                                    value={data.JumlahPermintaan}
                                  />
                                </Box>
                              </Grid>

                              <Grid
                                xs={12}
                                sm={6}
                                lg={4}
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                  }}
                                >
                                  <Inventori
                                    sx={{ height: '100%' }}
                                    value={data.JumlahInventori}
                                  />
                                </Box>
                              </Grid>

                              <Grid
                                xs={12}
                                lg={8}
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                  }}
                                >
                                  <OverviewSales
                                    chartSeries={[
                                      {
                                        name: 'Pengadaan',
                                        data: data.ChartPengadaan
                                      },
                                      {
                                        name: 'Permintaan',
                                        data: data.ChartPermintaan
                                      }
                                    ]}
                                    sx={{ height: '100%' }}
                                  />
                                </Box>
                              </Grid>

                              <Grid
                                xs={12}
                                md={6}
                                lg={4}
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                  }}
                                >
                                  <StatusAdmin

                                    permintaan={permintaan}
                                    pengadaan={pengadaan}
                                    sx={{ height: '100%' }}
                                  />
                                </Box>
                              </Grid>




                            </Grid>)

                            : (<></>)
                }






              </Grid>
            </Container>
          </Box>

        </Box>
      </ThemeProvider>
    </Box>

  );

}

export default Dasbor;