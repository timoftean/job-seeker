package com.ubb.colectiv.resource.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserResource {
    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserInfo getUserById() {
        return UserInfo.builder().id(1).name("aaa").surname("gggg").build();
    }
}
