package C06.OMG.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import C06.OMG.model.PengadaanModel;

@Repository
public interface PengadaanDb extends JpaRepository<PengadaanModel, Long> {
    Optional<PengadaanModel> findById(Long Id);

    @Query(value = "SELECT m.id_material, m.nama, p.tanggal_permintaan,  SUM(jp.jumlah) stok_masuk "
            + "FROM jumlah_pengadaan jp "
            + "INNER JOIN pengadaan p ON jp.id_pengadaan = p.id_pengadaan "
            + "INNER JOIN material m ON jp.id_material = m.id_material "
            + "WHERE p.status = 'Selesai' "
            + "AND p.tanggal_permintaan BETWEEN :startDate AND :endDate "
            + "GROUP BY m.id_material", nativeQuery = true)
    List<Object[]> getListJumlahMaterialMasukByRangeDate(
        @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    @Query(value = "SELECT m.id_material, m.nama, p.tanggal_permintaan, SUM(jp.jumlah) stok_masuk "
            + "FROM jumlah_pengadaan jp "
            + "INNER JOIN pengadaan p ON jp.id_pengadaan = p.id_pengadaan "
            + "INNER JOIN material m ON jp.id_material = m.id_material "
            + "WHERE p.status = 'Selesai' "
            + "GROUP BY m.id_material", nativeQuery = true)
    List<Object[]> getListJumlahMaterialMasuk();

}
