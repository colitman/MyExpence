/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.business.users;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.hobbydev.webapp.erp.business.DefaultService;
import ua.hobbydev.webapp.erp.business.ResourceNotFoundException;
import ua.hobbydev.webapp.erp.domain.user.User;

import java.util.List;

/**
 * User Service
 */
@Service
public class UserService extends DefaultService implements UserServiceInterface {

    @Override
    @Transactional
    public boolean exists(Long id) {
        return exists(User.class, id);
    }

    @Override
    @Transactional
    public User get(Long id) throws ResourceNotFoundException {
        return get(User.class, id);
    }

    @Override
    @Transactional
    public List<User> list() {
        return list(User.class);
    }

    @Override
    @Transactional
    public User loadUserByUsername(final String username) throws UsernameNotFoundException {
        try {
            List<User> allUsers = list();
            User foundUser = allUsers.stream()
                    .filter(
                            (user) -> user.getUsername().equals(username)
                    )
                    .findFirst()
                    .orElseThrow(() -> new UsernameNotFoundException(username));
            return foundUser;
        } catch (UsernameNotFoundException unfe) {
            throw unfe;
        } catch (Throwable t) {
            throw new RuntimeException("Authentication service failure. Please contact the administrator");
        }
    }
}
