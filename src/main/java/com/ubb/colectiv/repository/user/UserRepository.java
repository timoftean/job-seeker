package com.ubb.colectiv.repository.user;

import com.ubb.colectiv.entity.user.UserEntity;

public interface UserRepository {
    UserEntity getUserById(Integer userId);
}
