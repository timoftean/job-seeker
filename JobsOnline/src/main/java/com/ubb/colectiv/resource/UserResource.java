package com.ubb.colectiv.resource;

import com.ubb.colectiv.model.User;
import com.ubb.colectiv.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserResource {
    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    private UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public User getUserById() {
        return userService.getUserById(1);
    }
}
