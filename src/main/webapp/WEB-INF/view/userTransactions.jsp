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
				
				<section id="c-js-transactions-filter-form">
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
		<script src="${app}/res/app/js/services/transactionService.js"></script>
		<script src="${app}/res/app/js/models/userTransactions.js"></script>
		<script src="${app}/res/app/js/views/transactions.js"></script>
		<script src="${app}/res/app/js/controllers/transactions.js"></script>
		<script src="${app}/res/app/js/pages/userTransactions.js"></script>

	</body>
</html>