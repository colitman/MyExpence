/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.util.ClassUtils;
import ua.hobbydev.webapp.erp.Application;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Properties;

import static org.hibernate.cfg.AvailableSettings.*;

/**
 * Spring beans, related to data access
 */
@Configuration
@EnableTransactionManagement
public class DataAccessConfig {
	
	private @Value("${jdbc.host}") String host;
	private @Value("${jdbc.port}") int port;
	private @Value("${jdbc.dbName}") String dbName;
	private @Value("${jdbc.login}") String login;
	private @Value("${jdbc.password}") String password;
	private @Value("${jdbc.driverClassName}") String driverClass;
	private @Value("${jdbc.maxPoolSize}") int maxPoolSize;
	private @Value("${jdbc.minPoolSize}") int minPoolSize;
	private @Value("${jdbc.maxStatements}") int maxStatements; 
	private @Value("${jdbc.testConnection}") boolean testConnectionOnCheckout;
	
	private @Value("${hibernate.dialect}") String dialect;
	private @Value("${hibernate.show_sql}") String showSQL;
	private @Value("${hibernate.hbm2ddl.auto}") String autoDDL;
	private @Value("${hibernate.enable_lazy_load_no_trans}") String lazyLoadNoTrans;
	
	private @Value("${environment.heroku}") boolean onHeroku;

	/**
	 * Overrides default data access parameter, stated in application.properties file,
	 * with those, used on Heroku deployment environment.
     */
	private void redefineCredentialsForHeroku() {
		URI dbUri = null;
		try {
			dbUri = new URI(System.getenv("DATABASE_URL"));
		} catch (URISyntaxException e) {
			return;
		}

	    this.login = dbUri.getUserInfo().split(":")[0];
	    this.password = dbUri.getUserInfo().split(":")[1];
	    this.host = dbUri.getHost();
	    this.port = dbUri.getPort();
	    this.dbName = dbUri.getPath().substring(1);

	}

	/**
	 * Datasource Spring Bean
	 *
	 * @return DataSource definition
	 *
	 * @throws PropertyVetoException if JDBC driver class value is invalid
     */
	@Bean(destroyMethod="close")
	public DataSource dataSource() throws PropertyVetoException {
		
		if(onHeroku) {
			redefineCredentialsForHeroku();
		}
		
        String jdbcURL = "jdbc:postgresql://" + host + ":" + port + "/" + dbName;

		ComboPooledDataSource dataSource = new ComboPooledDataSource();
		dataSource.setDriverClass(driverClass);
		dataSource.setJdbcUrl(jdbcURL);
		dataSource.setUser(login);
		dataSource.setPassword(password);
		dataSource.setMaxPoolSize(maxPoolSize);
		dataSource.setMinPoolSize(minPoolSize);
		dataSource.setMaxStatements(maxStatements);
		dataSource.setTestConnectionOnCheckout(testConnectionOnCheckout);
		
		return dataSource;		
	}

	/**
	 * Session factory bean
	 *
	 * @param dataSource DataSource definition
	 *
	 * @return Session factory
     */
	@Bean
	@Autowired
	public LocalSessionFactoryBean sessionFactory(DataSource dataSource) {
		
		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);

		String rootPackage = ClassUtils.getPackageName(Application.class);
		sessionFactory.setPackagesToScan(rootPackage + ".domain.*");
		
		Properties hibProps = new Properties();
		hibProps.setProperty(DIALECT, dialect);
		hibProps.setProperty(SHOW_SQL, showSQL);
		hibProps.setProperty(HBM2DDL_AUTO, autoDDL);
		hibProps.setProperty(ENABLE_LAZY_LOAD_NO_TRANS, lazyLoadNoTrans);
		
		sessionFactory.setHibernateProperties(hibProps);
		
		return sessionFactory;
	}

	/**
	 * Transaction management bean
	 *
	 * @param sessionFactory Session factory definition
	 *
	 * @return Transaction manager
     */
	@Bean
	@Autowired
	public PlatformTransactionManager transactionManager(SessionFactory sessionFactory) {
		return new HibernateTransactionManager(sessionFactory);
	}
}
