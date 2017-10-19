package com.ubb.colectiv.resource.user;

import com.ubb.colectiv.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class UserResource {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/user", method = RequestMethod.GET, produces = "application/json")
    public UserInfo getUserById(HttpServletResponse response) {
        response.addHeader("Content-Type", "application/json");
        response.setStatus(200);
        return userService.getUserById(1);
    }
}
