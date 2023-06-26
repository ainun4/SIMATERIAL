package C06.OMG.controller;

import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;

import C06.OMG.model.UserModel;
import C06.OMG.service.UserRestService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    private UserRestService userRestService;

    @PostMapping(value = "/user/add")
    private UserModel createUser(@Valid @RequestBody UserModel user, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");

        } else {
            return userRestService.createUser(user);
        }
    }

    @GetMapping(value = "/user/{idKaryawan}")
    private UserModel retrieveUser(@PathVariable("idKaryawan") String idKaryawan) {
        try {
            return userRestService.getUserByIdKaryawan(idKaryawan);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "IdKaryawan User " + idKaryawan + " Not Found");
        }
    }

    @GetMapping(value = "/user/search/{key}")
    public List<UserModel> searchUser(@PathVariable("key") String key) {
        try {
            return userRestService.getUserBySearchKey(key);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User dengan " + key + " Not Found");
        }
    }

    @DeleteMapping(value = "/user/delete/{idKaryawan}")
    private ResponseEntity deleteUser(@PathVariable("idKaryawan") String idKaryawan) {
        try {
            userRestService.deleteUser(idKaryawan);
            return ResponseEntity.ok("User with idKaryawan " + idKaryawan + " has been deleted succesfully");

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "IdKaryawan User" + idKaryawan + " Not Found");

        } catch (UnsupportedOperationException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "User is still open or has pengajar!");
        }
    }

    @PutMapping(value = "/user/update/{idKaryawan}")
    private UserModel updateUser(@PathVariable("idKaryawan") String idKaryawan, @RequestBody UserModel user) {
        try {
            return userRestService.updateUser(idKaryawan, user);

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "IdKaryawan User " + idKaryawan + " Not Found");
        }
    }

    @GetMapping(value = "/list-user")
    private List<UserModel> retrieveListUser() {
        return userRestService.retrieveListUser();
    }

    @GetMapping(value = "/list-user/{role}")
    private List<UserModel> retrieveListUserByRole(@PathVariable("role") String role) {
        return userRestService.retrieveListUserByRole(role);
    }

    @PutMapping(value = "/password/ubah/{id}")
    private UserModel ubahPassword(@PathVariable("id") String id, @RequestBody UserModel user) {
        try {
            return userRestService.ubahPassword(id, user);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Id User " + id + " Not Found");
        }
    }

}
