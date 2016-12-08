<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />
<sec:authorize access="isAuthenticated()" var="authenticated"></sec:authorize>
<c:if test="${authenticated}">
	<sec:authentication property="name" var="currentUsername"></sec:authentication>
</c:if>

<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="${app}/">MyExpense</a>
			<c:if test="${authenticated}">
				<button type="button"
						class="navbar-toggle collapsed"
						data-toggle="collapse"
						data-target="#c-top-nav">
				
					<i class="fa fa-bars"></i>
				</button>
			</c:if>
		</div>

		<c:if test="${authenticated}">
			<div class="collapse navbar-collapse" id="c-top-nav">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-cog"></i>
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li><a href="${app}/settings/categories">Categories</a></li>
							<li><a href="${app}/settings/currencies">Currencies</a></li>
							<li><a href="${app}/settings/assets">Assets</a></li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							${currentUsername} <span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li><a href="${app}/profile"><i class="fa fa-user"></i> ${currentUsername}</a></li>
							<li class="c-logout-link"><a href="${app}/logout"><i class="fa fa-sign-out"></i> Log Out</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</c:if>
	</div>
</nav>

<section id="c-js-alerts"></section>