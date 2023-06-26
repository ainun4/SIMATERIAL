package C06.OMG.service;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;

import C06.OMG.model.PengadaanModel;
import C06.OMG.model.UserModel;
import C06.OMG.dto.LaporanPengadaanModelDTO;
import C06.OMG.model.JumlahPengadaanModel;
import C06.OMG.repository.PengadaanDb;
import C06.OMG.repository.UserDb;
import C06.OMG.repository.JumlahPengadaanDb;

@Service
@Transactional
public class PengadaanRestServiceImpl implements PengadaanRestService {

    @Autowired
    UserDb userDb;

    @Autowired
    PengadaanDb pengadaanDb;

    @Autowired
    JumlahPengadaanDb jumlahPengadaanDb;

    @Autowired
    PermintaanRestService permintaanService;

    @Override
    public List<PengadaanModel> retrieveListPengadaan(String id) {
        Optional<UserModel> user = userDb.findById(id);
        UserModel user1;
        if (user.isPresent()) {
            user1 = user.get();
        } else {
            throw new NoSuchElementException();
        }

        if (user1.getListPengadaan().size() > 0) {
            return user1.getListPengadaan();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public List<PengadaanModel> retrieveListAllPengadaan() {
        return pengadaanDb.findAll();
    }

    @Override
    public List<PengadaanModel> retrieveListPengadaanWarehouse() {
        List<PengadaanModel> listPengadaan = new ArrayList<>();
        List<PengadaanModel> listAllPengadaan = retrieveListAllPengadaan();
        for (int i = 0; i < listAllPengadaan.size(); i++) {
            if (listAllPengadaan.get(i).getStatus().equals("Diproses")
                    || listAllPengadaan.get(i).getStatus().equals("Selesai")) {
                listPengadaan.add(listAllPengadaan.get(i));
            }
        }
        return listPengadaan;
    }

    @Override
    public PengadaanModel updatePengadaan(PengadaanModel pengadaan) {
        List<JumlahPengadaanModel> listJumlah = pengadaan.getListJumlah();
        pengadaan.setListJumlah(null);
        pengadaanDb.save(pengadaan);
        for (int i = 0; i < listJumlah.size(); i++) {
            JumlahPengadaanModel jml = listJumlah.get(i);
            jml.setPengadaan(pengadaan);
            ;
            jumlahPengadaanDb.save(jml);
        }
        pengadaan.setListJumlah(listJumlah);
        return pengadaanDb.save(pengadaan);

    }

    @Override
    public PengadaanModel updatePengadaanStatus(PengadaanModel pengadaan) {
        return pengadaanDb.save(pengadaan);
    }

    @Override
    public PengadaanModel getPengadaan(Long id) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id);
        if (pengadaan.isPresent()) {
            return pengadaan.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public void deletePengadaan(Long id_pengadaan) {
        PengadaanModel pengadaan = getPengadaan(id_pengadaan);
        pengadaanDb.delete(pengadaan);
    }

    @Override
    public PengadaanModel createPengadaan(PengadaanModel pengadaan) {
        List<JumlahPengadaanModel> listJumlah = pengadaan.getListJumlah();
        pengadaan.setListJumlah(null);
        pengadaanDb.save(pengadaan);

        for (int i = 0; i < listJumlah.size(); i++) {
            JumlahPengadaanModel jml = listJumlah.get(i);
            jml.setPengadaan(pengadaan);
            ;
            jumlahPengadaanDb.save(jml);
        }
        return pengadaan;
    }

    @Override
    public List<JumlahPengadaanModel> countMaterialDibutuhkan(Long id_permintaan) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<JumlahPengadaanModel> retrieveListJumlah(Long id) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id);
        if (pengadaan.isPresent()) {
            List<JumlahPengadaanModel> listJumlah = pengadaan.get().getListJumlah();
            return listJumlah;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public UserModel getManajerById(Long id) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id);
        if (pengadaan.isPresent()) {
            List<UserModel> listUser = pengadaan.get().getListUser();
            UserModel manajer = new UserModel();
            for (UserModel u : listUser) {
                if (u.getRole().equals("Manajer") || u.getRole().equals("Admin")) {
                    manajer = u;
                }
            }
            return manajer;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public PengadaanModel editDetailPengadaan(PengadaanModel pengadaan) {
        PengadaanModel pengadaanOld = pengadaanDb.findById(pengadaan.getId_pengadaan()).get();

        List<JumlahPengadaanModel> listJumlahOld = pengadaanOld.getListJumlah();
        List<JumlahPengadaanModel> listJumlahNew = pengadaan.getListJumlah();
        pengadaanOld.setListJumlah(null);
        pengadaanOld.setNamaProyek(pengadaan.getNamaProyek());

        pengadaanDb.save(pengadaanOld);

        for (JumlahPengadaanModel jml : listJumlahOld) {
            jumlahPengadaanDb.delete(jml);
        }
        for (JumlahPengadaanModel jml : listJumlahNew) {

            jml.setPengadaan(pengadaan);
            jumlahPengadaanDb.save(jml);
        }
        return pengadaan;
    }

    @Override
    public UserModel getRequesterByIdPengadaan(Long id_pengadaan) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id_pengadaan);
        if (pengadaan.isPresent()) {
            List<UserModel> listUser = pengadaan.get().getListUser();
            UserModel requester = new UserModel();
            for (UserModel u : listUser) {
                if (u.getRole().equals("Admin") || u.getRole().equals("Staff")) {
                    requester = u;
                }
            }
            return requester;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public UserModel getPurchaserByIdPengadaan(Long id_pengadaan) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id_pengadaan);
        if (pengadaan.isPresent()) {
            List<UserModel> listUser = pengadaan.get().getListUser();
            UserModel requester = new UserModel();
            for (UserModel u : listUser) {
                if (u.getRole().equals("Admin") || u.getRole().equals("Staff")) {
                    requester = u;
                }
            }
            return requester;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public List<UserModel> retrieveListUser(Long id_pengadaan) {
        Optional<PengadaanModel> pengadaan = pengadaanDb.findById(id_pengadaan);
        if (pengadaan.isPresent()) {
            List<UserModel> listUser = pengadaan.get().getListUser();
            return listUser;
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public List<LaporanPengadaanModelDTO> getJumlahMaterialMasukByRangeDate(
            LocalDateTime startDate,
            LocalDateTime endDate) {
        List<Object[]> results = pengadaanDb.getListJumlahMaterialMasukByRangeDate(startDate, endDate);
        List<LaporanPengadaanModelDTO> dtoList = new ArrayList<>();

        for (Object[] objArr : results) {
            LaporanPengadaanModelDTO dto = new LaporanPengadaanModelDTO();
            dto.setId_material((BigInteger) objArr[0]);
            dto.setNama((String) objArr[1]);
            dto.setTanggal_permintaan((Timestamp) objArr[2]);
            dto.setStok_masuk((BigDecimal) objArr[3]);
            dtoList.add(dto);
        }

        if (dtoList.size() > 0) {
            return dtoList;
        } else
            return null;
    }

    @Override
    public List<LaporanPengadaanModelDTO> getJumlahMaterialMasuk() {
        List<Object[]> results = pengadaanDb.getListJumlahMaterialMasuk();
        List<LaporanPengadaanModelDTO> dtoList = new ArrayList<>();

        for (Object[] objArr : results) {
            LaporanPengadaanModelDTO dto = new LaporanPengadaanModelDTO();
            dto.setId_material((BigInteger) objArr[0]);
            dto.setNama((String) objArr[1]);
            dto.setTanggal_permintaan((Timestamp) objArr[2]);
            dto.setStok_masuk((BigDecimal) objArr[3]);
            dtoList.add(dto);
        }

        if (dtoList.size() > 0) {
            return dtoList;
        } else
            return null;
    }
}
