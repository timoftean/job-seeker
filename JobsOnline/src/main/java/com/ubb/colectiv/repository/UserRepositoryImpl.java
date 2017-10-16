package com.ubb.colectiv.repository;

import com.ubb.colectiv.model.User;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public User getUserById(int id) {
        //Session currentSession = getCurrentSession();
        return new User(1, "dianahas", "hat", "Diana", "aaa", true);
//        return new User();
    }

//    public Session getCurrentSession() {
//        return sessionFactory.getCurrentSession();
//    }
}
