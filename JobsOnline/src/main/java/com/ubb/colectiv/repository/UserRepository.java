package com.ubb.colectiv.repository;

import com.ubb.colectiv.entity.UserEntity;

public interface UserRepository {
    UserEntity getUserById(int id);
}
