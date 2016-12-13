/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.hobbydev.webapp.expense.domain.EntityInterface;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.data.DefaultDAO;
import ua.hobbydev.webapp.expense.data.ObjectNotExistsException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Default entity service implementation
 */
@Service
public class DefaultService implements DefaultServiceInterface {
	
	@Autowired
	private DefaultDAO dao;
	
	protected DefaultDAO getDAO() {
		return dao;
	}
	
	@Override
	@Transactional
	public <ENTITY extends IdentifiedEntityInterface> boolean exists(Class<ENTITY> clazz, Long id) {
		boolean exists = getDAO().exists(clazz, id);
		if(exists) {
			try {
				ENTITY entity = this.get(clazz, id);
				exists = !entity.isDeleted();
			} catch (ResourceNotFoundException e) {
				// TODO add logging
				exists = false;
			}
		}

		return exists;
	}
	
	@Override
	@Transactional
	public <ENTITY extends IdentifiedEntityInterface> ENTITY get(Class<ENTITY> clazz, Long id) throws ResourceNotFoundException {
		ENTITY entity = null;
		try {
			entity = getDAO().getById(clazz, id);
		} catch (ObjectNotExistsException one) {
			throw new ResourceNotFoundException(one.getMessage(), one);
		}

		if(entity.isDeleted()) {
			throw new ResourceNotFoundException("Entity has been deleted or has never existed.");
		}
		
		return entity;
	}

	@Override
	@Transactional
	public <ENTITY extends EntityInterface> List<ENTITY> list(Class<ENTITY> clazz) {
		List<ENTITY> entities = getDAO().getAll(clazz);

		List<ENTITY> availableEntities = entities.stream()
				.filter(
						(entity) -> !entity.isDeleted()
				).collect(Collectors.toList());

		return availableEntities;
	}
	
	@Override
	@Transactional
	public <ENTITY extends EntityInterface> Long add(ENTITY entity) {
		return getDAO().create(entity);
	}
	
	@Override
	@Transactional
	public <ENTITY extends IdentifiedEntityInterface> boolean update(ENTITY entity) throws ResourceNotFoundException {
		try {
			return getDAO().update(entity);
		} catch (ObjectNotExistsException e) {
			throw new ResourceNotFoundException(e.getMessage(), e);
		}
	}

	@Override
	@Transactional
	public <ENTITY extends IdentifiedEntityInterface> void delete(Class<ENTITY> clazz, Long id) {
		ENTITY entity = null;
		try {
			entity = get(clazz, id);
		} catch (ResourceNotFoundException e) {
			//TODO add logging
			return;
		}
		getDAO().delete(entity);
	}
}
