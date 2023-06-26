package C06.OMG.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import C06.OMG.model.UserModel;
import C06.OMG.repository.UserDb;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDb userDb;

    @Override
    public UserModel addUser(UserModel user){
        String pass = encrypt(user.getPassword());
        user.setPassword(pass);
        return userDb.save(user);
    }

    @Override
    public String encrypt(String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        return hashedPassword;
    }

    @Override
    public UserModel getUserByEmail(String email){
        UserModel user = userDb.findByEmail(email);
        if(user!=null){
            return user;
        }
        else{
            return null;
        }
    }

    @Override
    public List<UserModel> getListUser(){
        return userDb.findAll();
    }

    @Override
    public void deleteUser(UserModel user){
        userDb.delete(user);
    }

    @Override
    public boolean validasiPassword(UserModel user, String passwordLama){
        return new BCryptPasswordEncoder().matches(passwordLama, user.getPassword());
    }

    @Override
    public void updatePassword(UserModel user, String konfirmasiPassword){
        user.setPassword(new BCryptPasswordEncoder().encode(konfirmasiPassword));
        userDb.save(user);
    }
}
