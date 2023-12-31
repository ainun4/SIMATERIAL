package C06.OMG.security.jwtutils;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import C06.OMG.model.UserModel;
import C06.OMG.security.jwtutils.models.JwtRequestModel;
import C06.OMG.security.jwtutils.models.JwtResponseModel;
import C06.OMG.service.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class JwtController {
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenManager tokenManager;
    @Autowired
    UserService userService;

    @PostMapping(value = "/api/v1/auth/login", consumes = {
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.ALL_VALUE,
    })
    public ResponseEntity<?> createToken(@RequestBody JwtRequestModel request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(),
                            request.getPassword()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        final var userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = tokenManager.generateJwtToken(userDetails);
        final UserModel user = userService.getUserByEmail(userDetails.getUsername());
        // if (!user.getRole().equals("Admin")) {
        //     throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        // }
        return ResponseEntity.ok(new JwtResponseModel(user.getId(), user.getIdKaryawan(), user.getNama(), user.getEmail(), user.getNoTelepon(), user.getRole(), jwtToken));
    }
}