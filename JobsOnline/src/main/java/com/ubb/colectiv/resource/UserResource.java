package com.ubb.colectiv.resource;

import com.ubb.colectiv.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserResource {
    private static final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userService;

//    @Autowired
//    public UserResource(UserService userService){
//        this.userService = userService;
//    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserInfo getUserById() {
        return userService.getUserById(1);
    }
}
