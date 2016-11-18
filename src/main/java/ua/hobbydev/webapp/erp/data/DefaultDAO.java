/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.data;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ua.hobbydev.webapp.erp.domain.EntityInterface;
import ua.hobbydev.webapp.erp.domain.IdentifiedEntityInterface;

import java.util.Collections;
import java.util.List;

/**
 * Generic class for accessing application datastorage
 */
@Repository
public class DefaultDAO {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	/**
	 * Checks whether the entity with provided id exists
	 *
	 * @param clazz entity class
	 * @param id id to check
     * @return true is entity of the provided class with provided id exists; false otherwise
     */
	public <ENTITY extends IdentifiedEntityInterface> boolean exists(Class<ENTITY> clazz, Long id) {
		
		if(id == null) {
			return false;
		}
		
		Session session = getSession();
		
		ENTITY entity = session.get(clazz, id);
		
		return entity != null;
	}

	/**
	 * Gets an entity by id
	 *
	 * @param clazz entity class
	 * @param id id to search
	 *
	 * @return Entity of the provided class with provided ID
	 *
	 * @throws ObjectNotExistsException if entity of provided class with provided ID does not exist
	 * @throws IllegalArgumentException if provided id is NULL
     */
	public <ENTITY extends IdentifiedEntityInterface> ENTITY getById(Class<ENTITY> clazz, Long id) throws ObjectNotExistsException {
		if (id == null) {
			throw new IllegalArgumentException("Invalid value for entity id provided:[NULL]");
		}
		
		if(!exists(clazz, id)) {
			throw new ObjectNotExistsException(clazz.getSimpleName() + " entity with requested id does not exist:[" + id.toString() + "]");
		}
		
		Session session = getSession();
		
		ENTITY entity = session.load(clazz, id);
		return entity;
	}

	/**
	 * Gets all entities of the provided class
	 * @param clazz entity class
	 *
     * @return a list of all entities of provided class or empty list if there no such entities
     */
	public <ENTITY extends EntityInterface> List<ENTITY> getAll(Class<ENTITY> clazz) {
		Session session = getSession();
		
		@SuppressWarnings("unchecked")
		List<ENTITY> entities = session.createCriteria(clazz).list();
		
		if(entities == null) {
			entities = Collections.emptyList();
		}
		
		return entities;
	}

	/**
	 * Creates a new entry in the datastorage with data from provided entity
	 *
	 * @param entity entity information to save
	 *
     * @return ID of the newly created entity
     */
	public <ENTITY extends EntityInterface> Long create(ENTITY entity) {
		Session session = getSession();

		Long id = -1L;

		try {
			id = (Long) session.save(entity);
		} catch (ClassCastException cce) {
			// TODO add logging
		}
		
		return id;
	}

	/**
	 * Updates entry information in datastorage by ID of the provided entity.
	 * @param entity entity information to update datastorage with.
	 *
	 * @return true if entity was updated; false otherwise
	 *
	 * @throws ObjectNotExistsException if ID of the provided entity is NULL or there is no saved entry
	 * for entity with ID, equal to ID of the provided entity.
	 * @throws IllegalArgumentException if provided entity is NULL
     */
	public <ENTITY extends IdentifiedEntityInterface> boolean update(ENTITY entity) throws ObjectNotExistsException {
		if(entity == null) {
			throw new IllegalArgumentException("Invalid entity provided:[NULL]");
		}
		
		if(entity.getId() == null || !exists(entity.getClass(), entity.getId())) {
			throw new ObjectNotExistsException(entity.getClass().getSimpleName() + " entity, requested for update does not exist");
		}
		
		Session session = getSession();

		return session.merge(entity) != null;
	}

	public <ENTITY extends IdentifiedEntityInterface> void delete(ENTITY entity) {
		if(entity == null || entity.getId() == null) {
			throw new IllegalArgumentException("Invalid entity provided - entity or its id is NULL");
		}

		if(!exists(entity.getClass(), entity.getId())) {
			return;
		}

		Session session = getSession();
		session.delete(entity);
	}
}
