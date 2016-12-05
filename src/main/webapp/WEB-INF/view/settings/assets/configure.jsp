<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />
<c:set var="webApi" value="${app += '/api/web'}" />
<sec:authentication property="name" var="username" />

<!DOCTYPE html>
<html lang="en">
	<head>
		<c:import url="/imports/head?pageTitle=Configure Asset"></c:import>
		<meta name="target_id" content="${id}">
		<meta name="target_type" content="${type}">
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Configure asset</h2>
					
					<ol class="breadcrumb">
						<li class="c-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Settings</li>
						<li>assetsSettings</li>
						<li class="active c-generate-crumb-name">#GenerateMe</li>
					</ol>
				</header>
				
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals">
		</div>

		<c:import url="/imports/scripts"></c:import>
		<script src="${app}/res/app/js/pages/currencies.js"></script>
		<script src="${app}/res/app/js/services/currencyServices.js"></script>
		<script src="${app}/res/app/js/pages/assets.js"></script>
		<script src="${app}/res/app/js/services/assetServices.js"></script>

	</body>
</html>