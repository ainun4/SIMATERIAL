package C06.OMG.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties(value={"listPengadaan", "listPermintaan"}, allowSetters = true)
public class UserModel implements Serializable {
    @Id
    private String id;

    @NotNull
    @Size(max = 50)
    @Column(name = "idKaryawan", nullable = false)
    private String idKaryawan;

    @NotNull
    @Size(max = 50)
    @Column(name = "nama", nullable = false)
    private String nama;

    @NotNull
    @Size(max = 50)
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Lob
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Size(max = 20)
    @Column(name = "noTelepon", nullable = false)
    private String noTelepon;

    @NotNull
    @Column(name = "role", nullable = false)
    private String role;

    @ManyToMany(mappedBy = "listUser")
    private List<PermintaanModel> listPermintaan;

    @ManyToMany(mappedBy = "listUser")
    private List<PengadaanModel> listPengadaan;
}
