package C06.OMG.service;

import C06.OMG.model.UserModel;

import java.util.List;

public interface UserRestService {
    UserModel createUser(UserModel user);

    List<UserModel> retrieveListUser();

    UserModel getUserByIdKaryawan(String idKaryawan);

    UserModel updateUser(String idKaryawan, UserModel userUpdate);

    void deleteUser(String idKaryawan);

    String encrypt(String password);

    List<UserModel> retrieveListUserByRole(String Role);
    List<UserModel> getUserBySearchKey(String key);

    void setIdUser(UserModel user);

    UserModel getUserById(String id);

    UserModel ubahPassword(String id, UserModel userUpdate);
}
