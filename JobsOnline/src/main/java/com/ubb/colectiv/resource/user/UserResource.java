package com.ubb.colectiv.resource.user;

import com.ubb.colectiv.entity.UserEntity;
import com.ubb.colectiv.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserResource {
    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    UserService userService;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserEntity getUserById() {
        return userService.getUserById(1);
    }
}
