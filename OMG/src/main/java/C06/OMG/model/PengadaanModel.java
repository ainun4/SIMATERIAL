package C06.OMG.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value={"listJumlah", "listUser"}, allowSetters = true)
@Entity
@Table(name = "pengadaan")
public class PengadaanModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pengadaan;

    @NotNull
    @Column(name = "tanggal_permintaan", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime tanggal_permintaan;

    @Column(name = "tanggal_perkiraan")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime tanggal_perkiraan;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;
    
    @NotNull
    @Column(name = "nama_proyek", nullable = false)
    private String namaProyek;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "id_permintaan", referencedColumnName = "id_permintaan", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PermintaanModel permintaan;

    @Column(name = "alasan_penolakan", nullable = true)
    private String alasan_penolakan;
    
    @ManyToMany
    @JoinTable(name = "pengadaan_user", joinColumns = @JoinColumn(name = "id_pengadaan"), inverseJoinColumns = @JoinColumn(name = "id"))
    private List<UserModel> listUser;

    @OneToMany(mappedBy = "pengadaan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<JumlahPengadaanModel> listJumlah;

}
