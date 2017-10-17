package com.ubb.colectiv.repository;

import com.ubb.colectiv.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer> {
    UserEntity findOne(Integer userId);

    <S extends UserEntity> S save(S userEntity);
}
