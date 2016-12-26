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
				
				<section id="c-js-expense-trends" class="row">
					<section id="c-js-income-trend-section" class="col-md-6">
						<div class="panel panel-success c-js-income-trend-panel">
							<div class="panel-heading" data-target="#c-js-income-trend-panel-content">
								<h3 class="panel-title">Income</h3>
							</div>
							<div id="c-js-income-trend-panel-content" class="collapse in">
								<div class="panel-body">
									Panel body ...
								</div>
								<div class="panel-footer">
									
								</div>
							</div>
						</div>
					</section>
					
					<section id="c-js-outgoing-trend-section" class="col-md-6">
						<div class="panel panel-danger c-js-outgoing-trend-panel">
							<div class="panel-heading" data-target="#c-js-outgoing-trend-panel-content">
								<h3 class="panel-title">Outgoing</h3>
							</div>
							<div id="c-js-outgoing-trend-panel-content" class="collapse in">
								<div class="panel-body">
									Panel body ...
								</div>
								<div class="panel-footer">
								
								</div>
							</div>
						</div>
					</section>
				</section>
				
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals"></div>
		
		<div class="hidden templates">
			
			<div class="panel panel-primary c-js-currency-stat-panel" id="c-js-currency-stat-template">
				<div class="panel-heading" data-target="#c-js-stat-details">
					<h3 class="panel-title">
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