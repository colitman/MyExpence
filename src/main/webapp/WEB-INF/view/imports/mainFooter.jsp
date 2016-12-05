<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<footer class="navbar-fixed-bottom">
	<p class="text-center text-muted">
		MyExpense |
		<a href="https://ua.linkedin.com/in/dmytro-romenskyi-87035524">Dmytro Romenskyi</a> |
		HobbyDev | 2016 |
		<a href="${app}/swagger">API Reference</a>
	</p>
</footer>