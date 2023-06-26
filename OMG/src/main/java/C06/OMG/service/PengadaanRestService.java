package C06.OMG.service;

import java.time.LocalDateTime;
import java.util.List;

import C06.OMG.dto.LaporanPengadaanModelDTO;
import C06.OMG.model.JumlahPengadaanModel;
import C06.OMG.model.PengadaanModel;
import C06.OMG.model.UserModel;

public interface PengadaanRestService {

    List<PengadaanModel> retrieveListPengadaan(String idKaryawan);

    List<PengadaanModel> retrieveListAllPengadaan();

    List<PengadaanModel> retrieveListPengadaanWarehouse();

    void deletePengadaan(Long id_pengadaan);

    PengadaanModel updatePengadaan(PengadaanModel pengadaan);

    PengadaanModel getPengadaan(Long id);

    PengadaanModel createPengadaan(PengadaanModel pengadaan);

    List<JumlahPengadaanModel> countMaterialDibutuhkan(Long id_permintaan);

    List<JumlahPengadaanModel> retrieveListJumlah(Long id);

    UserModel getManajerById(Long id);

    PengadaanModel editDetailPengadaan(PengadaanModel pengadaan);

    UserModel getRequesterByIdPengadaan(Long id_pengadaan);

    UserModel getPurchaserByIdPengadaan(Long id_pengadaan);

    List<UserModel> retrieveListUser(Long id_pengadaan);

    PengadaanModel updatePengadaanStatus(PengadaanModel pengadaan);

    List<LaporanPengadaanModelDTO> getJumlahMaterialMasuk();

    List<LaporanPengadaanModelDTO> getJumlahMaterialMasukByRangeDate(LocalDateTime startDate, LocalDateTime endDate);
}
