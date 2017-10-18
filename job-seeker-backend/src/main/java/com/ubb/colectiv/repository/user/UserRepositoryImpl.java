package com.ubb.colectiv.repository.user;

import com.ubb.colectiv.entity.user.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Transactional
@Repository
public class UserRepositoryImpl implements UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public UserEntity getUserById(Integer userId){
        return entityManager.find(UserEntity.class, userId);
    }

}
