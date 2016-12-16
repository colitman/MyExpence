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
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Configure asset</h2>
					
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="c-js-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Settings</li>
						<li>assetsSettings</li>
						<li class="active"></li>
					</ol>
				</header>
				
				<form id="c-js-configure-asset-form" action="" method="post" class="form-horizontal" role="form">
					<legend></legend>
					
					<input type="hidden" name="id" id="id" required="required" />
					<input type="hidden" name="type" id="type" required="required" />
					
					<div class="form-group">
						<label for="name" class="col-sm-3 control-label">Name</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required" autofocus="autofocus">
						</div>
					</div>
					
					<div class="form-group">
						<label for="currency" class="col-sm-3 control-label">Currency</label>
						<div class="col-sm-4">
							<select class="form-control" name="currency" id="currency" placeholder="Currency" required="required">
							</select>
						</div>
					</div>
					
					<div class="form-group">
						<label for="amount" class="col-sm-3 control-label">Amount</label>
						<div class="col-sm-4">
							<input type="number" step="any" class="form-control" name="amount" id="amount" placeholder="Amount">
						</div>
					</div>
				
				    <div class="form-group">
				        <div class="col-sm-4 col-sm-offset-3">
				            <div class="pull-right">
								<a class="btn btn-default" role="button" href="${app}/settings/assets">Go Back</a>
								<button type="submit" class="btn btn-primary">Save Changes</button>
							</div>
				        </div>
				    </div>
				</form>
				
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals">
		</div>

		<c:import url="/imports/scripts"></c:import>
		<script src="${app}/res/app/js/services/assetService.js"></script>
		<script src="${app}/res/app/js/services/currencyService.js"></script>
		<script src="${app}/res/app/js/services/paymentSystemService.js"></script>
		<script src="${app}/res/app/js/models/currencies.js"></script>
		<script src="${app}/res/app/js/models/assetConfig.js"></script>
		<script src="${app}/res/app/js/views/assetConfig.js"></script>
		<script src="${app}/res/app/js/controllers/assetConfig.js"></script>
		<script src="${app}/res/app/js/pages/assetConfig.js"></script>

	</body>
</html>