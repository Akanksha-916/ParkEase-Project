package com.parkease.parkease_backend.user.service;

import com.parkease.parkease_backend.user.base.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
}
