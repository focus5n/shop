package com.hjk.service;

import com.hjk.exception.UserException;
import com.hjk.exception.common.CustomException;
import com.hjk.model.User;
import com.hjk.model.dto.UserDto;
import com.hjk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public User findUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
    }

    public User findUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER));
    }

    public UserDto.Response findById(Long id) {
        return findUser(id).toResponseDto();
    }

    public List<UserDto.Response> findAll() {
        List<User> users = userRepository.findAll();
        return User.toResponseDtoList(users);
    }

    public UserDto.Response login(UserDto.loginRequestDto user) {
        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())
                .orElseThrow(() -> new CustomException(UserException.NOT_FOUND_USER)).toResponseDto();
    }
    public UserDto.Response delete(Long id) {
        User userToBeDeleted = findUser(id);
        userRepository.deleteById(id);
        return userToBeDeleted.toResponseDto();
    }

    @Transactional
    public UserDto.Response register(UserDto.registerRequestDto request) {
        checkDuplicateEmail(request.getEmail());
        User userToBeJoined = request.toEntity();
        userToBeJoined.encryptPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(userToBeJoined);

        User registeredUser = findUser(request.getEmail());
        return registeredUser.toResponseDto();
    }

    public UserDto.Response updateUser(Long userId, UserDto.updateRequestDto request) {
        User userToBeUpdated = findUser(userId);
        userToBeUpdated.updateUser(request);
        userRepository.save(userToBeUpdated);
        return userToBeUpdated.toResponseDto();
    }

    public UserDto.Response updateAdmin(Long id) {
        User userToBeUpdated = findUser(id);
        userToBeUpdated.updateAdmin();
        userRepository.save(userToBeUpdated);
        return userToBeUpdated.toResponseDto();
    }

    public void checkDuplicateEmail(String email) {
        if(userRepository.findByEmail(email).isPresent()) {
            throw new CustomException(UserException.DUPLICATED_EMAIL);
        }
    }
}
