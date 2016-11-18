<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<!DOCTYPE html>
<html lang="en">
	<head>
		<c:import url="/imports/head?pageTitle=Log In"></c:import>
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<form class="c-auth-form" action="${app}/login" method="post">
					<sec:csrfInput/>
					<div class="form-group has-feedback">
						<label class="control-label" for="username">Username</label>
						<input value="${username}" type="text" class="form-control" id="username" name="username" placeholder="Username" autofocus="autofocus" required="required"/>
						<i class="glyphicon glyphicon-user form-control-feedback"></i>
					</div>
					
					<div class="form-group has-feedback">
						<label class="control-label" for="password">Password</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="Password" required="required" />
						<i class="glyphicon glyphicon-lock form-control-feedback"></i>
					</div>
					
					<button type="submit" class="btn btn-primary btn-block">Sign In</button>
					<section>
						<a href="${app}/restore">Restore password</a>
						<a class="pull-right" href="${app}/register">Sign Up</a>
					</section>
					<div>
						<c:if test="${param.error != null && not empty SPRING_SECURITY_LAST_EXCEPTION}">
							<div class="alert alert-danger">
								<button type="button" class="close" data-dismiss="alert">&times;</button>
								<strong>Login failed!</strong><br>
								${SPRING_SECURITY_LAST_EXCEPTION.message}
							</div>
						</c:if>
					</div>
					
				</form>
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals"></div>

		<c:import url="/imports/scripts"></c:import>

	</body>
</html>