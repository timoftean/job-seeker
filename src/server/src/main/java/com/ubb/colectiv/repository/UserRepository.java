package com.ubb.colectiv.repository;

import com.ubb.colectiv.entity.UserEntity;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<UserEntity, Integer> {
    Optional<UserEntity> findOne(Integer userId);

    <S extends UserEntity> S save(S userEntity);
}
