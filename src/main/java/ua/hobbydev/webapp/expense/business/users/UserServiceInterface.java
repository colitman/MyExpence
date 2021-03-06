/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.business.users;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.util.List;

public interface UserServiceInterface extends DefaultServiceInterface, UserDetailsService {

	@Override
	User loadUserByUsername(String username) throws UsernameNotFoundException;

	/**
	 * Checks whether the user with provided id exists
	 *
	 * @param id id to check
	 * @return true is user with provided id exists; false otherwise
	 */
	boolean exists(Long id);

	/**
	 * Gets user by id
	 *
	 * @param id id to search
	 *
	 * @return User with provided ID
	 *
	 * @throws ResourceNotFoundException if user with provided ID does not exist
	 */
	User get(Long id) throws ResourceNotFoundException;

	/**
	 * Gets all users
	 *
	 * @return a list of all users or empty list if there are no user entries
	 */
	List<User> list();
	

}