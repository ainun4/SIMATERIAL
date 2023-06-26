package C06.OMG.repository;

import C06.OMG.model.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDb extends JpaRepository<UserModel, String> {
        Optional<UserModel> findByIdKaryawan(String code);
        UserModel findByEmail(String email);

        @Query("select u from user u where u.role = :role")
        List<UserModel> filterUserByRole(@Param("role") String role);

        @Query("SELECT u FROM user u WHERE " +
                        "u.idKaryawan LIKE CONCAT('%',:key, '%')" +
                        "OR u.nama LIKE CONCAT('%',:key, '%')" +
                        "OR u.email LIKE CONCAT('%',:key, '%')" +
                        "OR u.noTelepon LIKE CONCAT('%',:key, '%')" +
                        "OR u.role LIKE CONCAT('%',:key, '%')")
        List<UserModel> searchUser(@Param("key") String key);
        
        Optional<UserModel> findById(String code);
}
