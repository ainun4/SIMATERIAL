package C06.OMG.service;

import java.util.List;

import C06.OMG.model.UserModel;

public interface UserService {
    UserModel addUser(UserModel user);
    public String encrypt(String password);
    UserModel getUserByEmail(String email);
    List<UserModel> getListUser();
    void deleteUser(UserModel user);
    boolean validasiPassword(UserModel user, String passwordLama);
    void updatePassword(UserModel user, String konfirmasiPassword);
}
