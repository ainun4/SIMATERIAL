package C06.OMG.security.jwtutils.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class JwtResponseModel {
    String id;
    String id_karyawan;
    String nama;
    String email;
    String no_telepon;
    String role;
    String token;
}