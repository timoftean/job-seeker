package com.ubb.colectiv.repository;

import com.ubb.colectiv.entity.UserEntity;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public UserEntity getUserById(int id) {
        //Session currentSession = getCurrentSession();
        return new UserEntity(1, "dianahas", "hat", "Diana", "aaa", true);
//        return new UserEntity();
    }

//    public Session getCurrentSession() {
//        return sessionFactory.getCurrentSession();
//    }
}
