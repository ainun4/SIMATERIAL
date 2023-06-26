package C06.OMG.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import C06.OMG.model.UserModel;
import C06.OMG.repository.UserDb;

@Service
@Transactional
public class UserRestServiceImpl implements UserRestService {
    @Autowired
    private UserDb userDb;
    @Override
    public void setIdUser(UserModel user) {
        List<UserModel> listAllUser = retrieveListUser();
        UserModel lastUser;
        int count;
        String userId;

        if (user.getIdKaryawan().length() == 1) {
            userId = user.getIdKaryawan().toUpperCase().concat("00");
        } else if (user.getIdKaryawan().length() == 2){
            userId = user.getIdKaryawan().toUpperCase().concat("0");
        } else if (user.getIdKaryawan().length() == 3){
            userId = user.getIdKaryawan().toUpperCase();
        } else {
            userId = user.getIdKaryawan().substring(0, 3).toUpperCase();
        }

        if (listAllUser.size() == 0){
            count = 1;
        } else {
            lastUser = listAllUser.get(listAllUser.size() - 1);
            count = Integer.parseInt(lastUser.getId().substring(6)) + 1;
        }
        user.setId(String.format("BWP" + userId + "%0" + 4 + "d", count));
    }

    @Override
    public UserModel createUser(UserModel user) {
        setIdUser(user);
        return userDb.save(user);
    }

    @Override
    public List<UserModel> retrieveListUser() {
        return userDb.findAll();
    }

    @Override
    public List<UserModel> retrieveListUserByRole(String role){
        List<UserModel> listUser = userDb.filterUserByRole(role);
        return listUser;
    }

    @Override
    public UserModel getUserByIdKaryawan(String idKaryawan) {
        Optional<UserModel> user = userDb.findByIdKaryawan(idKaryawan);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public UserModel updateUser(String idKaryawan, UserModel userUpdate) {
        UserModel user = getUserByIdKaryawan(idKaryawan);
        user.setIdKaryawan(userUpdate.getIdKaryawan());
        user.setNama(userUpdate.getNama());
        user.setEmail(userUpdate.getEmail());
        user.setPassword(userUpdate.getPassword());
        user.setNoTelepon(userUpdate.getNoTelepon());
        user.setRole(userUpdate.getRole());
        return userDb.save(user);
    }

    @Override
    public void deleteUser(String idKaryawan) {
        UserModel user = getUserByIdKaryawan(idKaryawan);
        userDb.delete(user);
    }

    public String encrypt(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        return hashedPassword;
    }

    @Override
    public List<UserModel> getUserBySearchKey(String key) {
        return userDb.searchUser(key);
    }

    @Override
    public UserModel ubahPassword(String id, UserModel userUpdate) {
        UserModel user = getUserById(id);
        System.out.println(userUpdate.getPassword());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userUpdate.getPassword());
        user.setPassword(hashedPassword);
        return userDb.save(user);
    }

    @Override
    public UserModel getUserById(String id) {
        Optional<UserModel> user = userDb.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}
