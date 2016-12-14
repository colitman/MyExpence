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
		<c:import url="/imports/head?pageTitle=Transactions"></c:import>
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Transactions</h2>
					
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="c-js-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Transactions</li>
					</ol>
				</header>
				
				<section id="c-js-transactions-filter-form" class="row">
					<form action="" method="get" class="">
						<sec:csrfInput/>
						<div class="form-group col-sm-3">
							<label class="" for="sender">Sender</label>
							<input type="search" class="form-control" name="sender" id="sender" placeholder="Sender" />
						</div>
						
						<div class="form-group col-sm-3">
							<label class="" for="recipient">Recipient</label>
							<input type="search" class="form-control" name="recipient" id="recipient" placeholder="Recipient" />
						</div>
						
						<div class="form-group col-sm-3">
							<label class="" for="category">Category</label>
							<input type="search" class="form-control" name="category" id="category" placeholder="Category">
						</div>
						
						<div class="form-group col-sm-3">
							<label class="" for="message">Message</label>
							<input type="search" class="form-control" name="message" id="message" placeholder="Message">
						</div>
						
						<%--
						<button type="submit" class="btn btn-primary">Filter</button>
						<button type="reset" class="btn btn-danger">Reset</button>
						--%>
					</form>
				</section>
				
				<section id="c-js-transactions-table">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="col-sm-1">ID</th>
									<th class="col-sm-2">Time</th>
									<th class="col-sm-2">Sender</th>
									<th class="col-sm-2">Recipient</th>
									<th class="col-sm-2">Category</th>
									<th class="col-sm-1">Amount</th>
									<th class="col-sm-2">Message</th>
								</tr>
							</thead>
							<tbody>
								<tr class="c-spinner">
									<td><i class="fa fa-spinner fa-pulse"></i></td>
									<td><i class="fa fa-spinner fa-pulse"></i></td>
									<td><i class="fa fa-spinner fa-pulse"></i></td>
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
		</div>

		<c:import url="/imports/scripts"></c:import>
		
		<script src="${app}/res/jquery-searchable/jquery.searchable.js" ></script>
		
		<script src="${app}/res/app/js/services/transactionService.js"></script>
		<script src="${app}/res/app/js/services/assetService.js"></script>
		<script src="${app}/res/app/js/models/userTransactions.js"></script>
		<script src="${app}/res/app/js/models/assets.js"></script>
		<script src="${app}/res/app/js/views/transactions.js"></script>
		<script src="${app}/res/app/js/controllers/transactions.js"></script>
		<script src="${app}/res/app/js/pages/userTransactions.js"></script>

	</body>
</html>