package com.ubb.colectiv.repository;

import com.ubb.colectiv.entity.user.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {
}
