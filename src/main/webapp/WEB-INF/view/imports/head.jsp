<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

<sec:csrfMetaTags/>
<sec:authorize access="isAuthenticated()" var="authenticated"></sec:authorize>
<c:if test="${authenticated}">
	<sec:authentication property="name" var="currentUsername"></sec:authentication>
	<meta name="principal" content="${currentUsername}" >
</c:if>
<meta name="contextPath" content="${app}">

<title>${pageTitle}</title>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
		crossorigin="anonymous">

<link rel="stylesheet" href="${app}/res/bootstrap/bootstrap.css">

<link rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
		integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1"
		crossorigin="anonymous">

<link rel="stylesheet" href="${app}/res/app/css/main.css">