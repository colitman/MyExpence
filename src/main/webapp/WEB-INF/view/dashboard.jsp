<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<!DOCTYPE html>
<html lang="en">
	<head>
		<c:import url="/imports/head?pageTitle=Dashboard"></c:import>
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Dashboard</h2>
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="active c-js-home-crumb">
							<i class="fa fa-home"></i> Dashboard
						</li>
					</ol>
				</header>
				
				<section id="c-js-stats-by-currencies" class="row">
					
				</section>
				
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals"></div>
		
		<div class="hidden templates">
			
			<div class="panel panel-info c-js-currency-stat-panel" id="c-js-currency-stat-template">
				<div class="panel-heading" data-target="#c-js-stat-details">
					<h3 class="panel-title">
						<%--a role="button" href="#c-js-stat-details"></a--%>
					</h3>
				</div>
				<div id="c-js-stat-details" class="panel-collapse collapse" role="tabpanel">
					<table class="table table-condensed table-hover c-js-datatable">
						<thead>
							<tr>
								<th>Asset</th>
								<th>Type</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>
					<div class="panel-footer c-js-stat-chart">
					</div>
				</div>
				
			</div>
			
		</div>

		<c:import url="/imports/scripts"></c:import>
		<script src="${app}/res/app/js/models/dashboard.js"></script>
		<script src="${app}/res/app/js/views/dashboard.js"></script>
		<script src="${app}/res/app/js/controllers/dashboard.js"></script>

	</body>
</html>