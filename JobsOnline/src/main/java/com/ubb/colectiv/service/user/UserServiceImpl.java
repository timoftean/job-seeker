package com.ubb.colectiv.service.user;

import com.ubb.colectiv.entity.UserEntity;
import com.ubb.colectiv.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity getUserById(int id) {
        return userRepository.getUserById(id);
    }
}
