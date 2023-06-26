package C06.OMG.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import C06.OMG.model.PengadaanModel;
import C06.OMG.service.JumlahPengadaanRestService;
import C06.OMG.service.MaterialRestService;
import C06.OMG.service.PengadaanRestService;
import C06.OMG.dto.LaporanPengadaanModelDTO;
import C06.OMG.dto.PengadaanDTO;
import C06.OMG.model.JumlahPengadaanModel;
import C06.OMG.model.MaterialModel;
import C06.OMG.model.PermintaanModel;
import C06.OMG.model.UserModel;
import C06.OMG.service.PermintaanRestService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class PengadaanRestController {

    @Autowired
    private PengadaanRestService pengadaanRestService;

    @Autowired
    PermintaanRestService permintaanRestService;

    @Autowired
    JumlahPengadaanRestService jumlahPengadaanRestService;

    @Autowired
    MaterialRestService materialRestService;

    @GetMapping(value = "/list-pengadaan/{id}")
    public List<PengadaanModel> retrieveListPengadaan(@PathVariable("id") String id) {
        try {
            return pengadaanRestService.retrieveListPengadaan(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Daftar Pengadaan User " + id + " Not Found");
        }
    }

    @GetMapping(value = "/list-pengadaan")
    public List<PengadaanModel> retrieveListAllPengadaan() {
        return pengadaanRestService.retrieveListAllPengadaan();
    }

    @GetMapping(value = "/list-pengadaan/warehouse")
    public List<PengadaanModel> retrieveListPengadaanWarehouse() {
        return pengadaanRestService.retrieveListPengadaanWarehouse();
    }

    @DeleteMapping(value = "/pengadaan/delete/{id_pengadaan}")
    private ResponseEntity deletePengadaan(@PathVariable("id_pengadaan") Long id_pengadaan) {
        try {
            pengadaanRestService.deletePengadaan(id_pengadaan);
            return ResponseEntity.ok("Pengadaan with id " + id_pengadaan + " has been deleted succesfully");

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Pengadaan with id " + id_pengadaan + " Not Found");
        }
    }

    @PostMapping(value = "/pengadaan/create")
    private PengadaanModel createPengadaan(@Valid @RequestBody PengadaanDTO pengadaanDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            PengadaanModel pengadaan = new PengadaanModel();
            pengadaan.setListJumlah(pengadaanDTO.getListJumlah());
            pengadaan.setListUser(pengadaanDTO.getListUser());
            pengadaan.setTanggal_permintaan(pengadaanDTO.getTanggal_permintaan());
            pengadaan.setNamaProyek(pengadaanDTO.getNama_proyek());

            pengadaan.setStatus("Menunggu Persetujuan Purchaser");

            if (pengadaanDTO.getPermintaan().getId_permintaan() != 0) {
                PermintaanModel permintaan = permintaanRestService
                        .getPermintaanByIdPermintaan(pengadaanDTO.getPermintaan().getId_permintaan());
                permintaan.setStatus("Menunggu Pengadaan");
                permintaanRestService.createPermintaan(permintaan);
                pengadaan.setPermintaan(permintaan);
            }

            return pengadaanRestService.createPengadaan(pengadaan);

        }
    }

    @GetMapping(value = "/pengadaan/{id}")
    private PengadaanModel getPengadaanById(@PathVariable("id") Long id) {
        try {
            return pengadaanRestService.getPengadaan(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id Material " + id + " Not Found");
        }
    }

    @PostMapping(value = "/pengadaan/update-listjumlah")
    private PengadaanModel updatePengadaan(@Valid @RequestBody PengadaanModel pengadaanDto,
            BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            if (pengadaanDto.getPermintaan() != null) {
                PermintaanModel permintaan = pengadaanDto.getPermintaan();
                permintaan.setNama_proyek(pengadaanDto.getNamaProyek());
                permintaanRestService.updatePermintaan(permintaan);
            }

            return pengadaanRestService.editDetailPengadaan(pengadaanDto);

        }
    }

    @GetMapping(value = "/pengadaan/{id}/list-jumlah")
    public List<JumlahPengadaanModel> retrieveListJumlahByIdPengadaan(@PathVariable Long id) {
        try {
            return pengadaanRestService.retrieveListJumlah(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "List User from id permintaan " + id + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/{id}/list-jumlah-required")
    public List<JumlahPengadaanModel> retrieveListJumlahRequired(@PathVariable Long id) {
        try {
            return pengadaanRestService.retrieveListJumlah(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "List User from id permintaan " + id + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/{id}/manajer")
    public UserModel getManajerByIdPengadaan(@PathVariable Long id) {
        try {
            return pengadaanRestService.getManajerById(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Requester from id permintaan " + id + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/{id_pengadaan}/list-user")
    public List<UserModel> retrieveListUserByIdPengadaan(@PathVariable("id_pengadaan") Long id_pengadaan) {
        try {
            return pengadaanRestService.retrieveListUser(id_pengadaan);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "List User from id permintaan " + id_pengadaan + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/{id_pengadaan}/requester")
    public UserModel getRequesterByIdPengadaan(@PathVariable("id_pengadaan") Long id_pengadaan) {
        try {
            return pengadaanRestService.getRequesterByIdPengadaan(id_pengadaan);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Requester from id pengadaan " + id_pengadaan + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/{id_pengadaan}/purchaser")
    public UserModel getPurchaserByIdPengadaan(@PathVariable("id_pengadaan") Long id_pengadaan) {
        try {
            return pengadaanRestService.getPurchaserByIdPengadaan(id_pengadaan);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Requester from id permintaan " + id_pengadaan + " Not Found");
        }
    }

    @PutMapping(value = "/pengadaan/ubah-status/{id_pengadaan}")
    private PengadaanModel updatePengadaanId(@RequestBody PengadaanModel pengadaan,
            BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            return pengadaanRestService.updatePengadaanStatus(pengadaan);
        }
    }

    @PutMapping(value = "/pengadaan/{id_pengadaan}/list-jumlah/edit")
    public List<JumlahPengadaanModel> updateStokMaterial(@PathVariable("id_pengadaan") Long id_pengadaan) {
        try {
            List<JumlahPengadaanModel> jumlahMaterialPengadaan = pengadaanRestService.retrieveListJumlah(id_pengadaan);

            for (JumlahPengadaanModel jumlahMaterial : jumlahMaterialPengadaan) {
                MaterialModel material = jumlahMaterial.getMaterial();
                PengadaanModel pengadaan = jumlahMaterial.getPengadaan();
                if (pengadaan.getPermintaan() != null) {
                    PermintaanModel permintaan = pengadaan.getPermintaan();
                    permintaan.setStatus("Menunggu Konfirmasi Warehouse");
                }
                material.setStok(material.getStok() + jumlahMaterial.getJumlah());
                pengadaan.setStatus("Selesai");
                // System.out.println(jumlahMaterialPengadaan.size());
                materialRestService.updateMaterial(material);
            }

            return jumlahMaterialPengadaan;

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "List User from id pengadaan " + id_pengadaan + " Not Found");
        }
    }

    @GetMapping(value = "/pengadaan/jumlah-material-masuk")
    public List<LaporanPengadaanModelDTO> getJumlahMaterialMasuk(
            @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime startDate,
            @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime endDate) {
        try {
            if (startDate == null || endDate == null) {
                return pengadaanRestService.getJumlahMaterialMasuk();
            } else {
                return pengadaanRestService.getJumlahMaterialMasukByRangeDate(startDate, endDate);
            }
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Material Not Found");
        }
    }
}
