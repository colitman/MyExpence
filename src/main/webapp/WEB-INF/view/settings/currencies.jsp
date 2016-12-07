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
		<c:import url="/imports/head?pageTitle=Currencies"></c:import>
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Currencies</h2>
					
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="c-js-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Settings</li>
						<li class="active">Currencies</li>
					</ol>
				</header>
				
				<section id="c-js-add-currency-form">
					<form action="" method="post" class="form-inline">
						<sec:csrfInput/>
						<div class="form-group">
							<label class="sr-only" for="name">Name</label>
							<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
						</div>
						
						<div class="form-group">
							<label class="sr-only" for="code">Code</label>
							<input type="text" class="form-control" name="code" id="code" placeholder="Code" required="required">
						</div>
						
						<div class="form-group">
							<label class="sr-only" for="symbol">Symbol</label>
							<input type="text" class="form-control" name="symbol" id="symbol" placeholder="Symbol" required="required">
						</div>
						
						<button type="submit" class="btn btn-primary">Add</button>
						<button type="reset" class="btn btn-danger">Reset</button>
					</form>
				</section>
				
				<section id="c-js-choose-default-currency-form">
					<form action="" method="post" class="form-inline" role="form">
						<sec:csrfInput/>
						<div class="form-group">
							<label class="sr-only" for="id">Currency</label>
							<select class="form-control" name="id" id="id">
								
							</select>
						</div>
					
						<button type="submit" class="btn btn-success">Set Default</button>
					</form>
				</section>
				
				<section id="c-js-edit-currency-form" class="hidden">
					<form action="" method="post" class="form-inline">
						<sec:csrfInput/>
						<input type="hidden" value="" name="id" id="id">
						<input type="hidden" value="" name="defaultCurrency" id="defaultCurrency">
						<div class="form-group">
							<label class="sr-only" for="name">Name</label>
							<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
						</div>
						
						<div class="form-group">
							<label class="sr-only" for="code">Code</label>
							<input type="text" class="form-control" name="code" id="code" placeholder="Code" required="required">
						</div>
						
						<div class="form-group">
							<label class="sr-only" for="symbol">Symbol</label>
							<input type="text" class="form-control" name="symbol" id="symbol" placeholder="Symbol" required="required">
						</div>
						
						<button type="submit" class="btn btn-primary">Save changes</button>
						<button id="c-js-cancel-edit-currency-button" type="button" class="btn btn-warning">Cancel</button>
						<button type="reset" class="btn btn-danger">Close</button>
					</form>
				</section>
				
				<section id="c-js-currencies-table">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="col-sm-8">Name</th>
									<th class="col-sm-1">Symbol</th>
									<th class="col-sm-2">Code</th>
									<th class="col-sm-1">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr class="c-spinner">
									<td><i class="fa fa-spinner fa-pulse"></i></td>
									<td><i class="fa fa-spinner fa-pulse"></i></td>
									<td><i class="fa fa-spinner fa-pulse"></i></td>
									<td><i class="fa fa-spinner fa-pulse"></i></td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals">
			<c:import url="/imports/modals/deleteConfirmationModal"></c:import>
		</div>

		<c:import url="/imports/scripts"></c:import>
		<script src="${app}/res/app/js/services/currencyService.js"></script>
		<script src="${app}/res/app/js/models/currencies.js"></script>
		<script src="${app}/res/app/js/views/currencies.js"></script>
		<script src="${app}/res/app/js/controllers/currencies.js"></script>
		<script src="${app}/res/app/js/pages/currencies.js"></script>

	</body>
</html>