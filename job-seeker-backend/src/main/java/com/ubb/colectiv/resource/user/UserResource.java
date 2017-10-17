package com.ubb.colectiv.resource.user;

import com.ubb.colectiv.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserResource {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserInfo getUserById() {
        //return UserInfo.builder().id(1).name("aaa").surname("gggg").build();
        return userService.getUserById(1);
    }
}
