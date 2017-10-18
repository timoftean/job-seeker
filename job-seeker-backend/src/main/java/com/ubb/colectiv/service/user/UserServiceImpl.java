package com.ubb.colectiv.service.user;

import com.ubb.colectiv.entity.user.UserEntity;
import com.ubb.colectiv.repository.user.UserRepository;
import com.ubb.colectiv.resource.user.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserInfo getUserById(Integer id) {
        UserEntity userEntity = userRepository.getUserById(id);

        return UserInfo.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .surname(userEntity.getSurname()).build();
    }
}
