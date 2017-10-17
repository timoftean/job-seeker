package com.ubb.colectiv.service.user;

import com.ubb.colectiv.entity.UserEntity;
import com.ubb.colectiv.repository.UserRepository;
import com.ubb.colectiv.resource.user.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserInfo getUserById(Integer id) {
        Optional<UserEntity> usersEntityOptional = userRepository.findOne(id);
        if (usersEntityOptional.isPresent()) {
            UserEntity userEntity = usersEntityOptional.get();
            return UserInfo.builder()
                    .id(userEntity.getId())
                    .name(userEntity.getName())
                    .surname(userEntity.getSurname())
                    .build();
        }


        return null;
    }
}
