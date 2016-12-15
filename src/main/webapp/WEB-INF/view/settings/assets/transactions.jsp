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
		<c:import url="/imports/head?pageTitle=Asset Transactions"></c:import>
		<meta name="target_id" content="${id}">
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Asset Transactions</h2>
					
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="c-js-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Settings</li>
						<li>assetsSettings</li>
						<li class="active">Asset Transactions</li>
					</ol>
				</header>
				
				<div class="panel-group" id="c-js-transactions-tools">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">
								<a role="button" data-toggle="collapse" data-parent="#c-js-transactions-tools" href="#c-js-tx-filters">
									Filter
								</a>
							</h3>
						</div>
						<div id="c-js-tx-filters" class="panel-collapse collapse" role="tabpanel">
							<div class="panel-body">
								
								<section id="c-js-transactions-filters">
								
								</section>
							
							</div>
						</div>
					</div>
				</div>
				
				<section id="c-js-transactions-export">
										
					<div class="form-group row">
						<div class="col-xs-12">
							<div class="pull-right">
								<a id="c-js-transactions-export-button"
										class="btn btn-primary"
										download="${username}_transactions.xls" onclick="return ExcellentExport.excel(this, 'c-js-datatable', 'Transactions');">Export</a>
							</div>
						</div>
					</div>
					
				</section>
				
				<section id="c-js-transactions-table">
					<div class="table-responsive">
						<table class="table table-hover c-js-datatable">
							<thead>
								<tr>
									<th class="col-sm-1">ID</th>
									<th class="col-sm-2">Time</th>
									<th class="col-sm-2">Sender</th>
									<th class="col-sm-2">Recipient</th>
									<th class="col-sm-2 c-js-searchable">Category</th>
									<th class="col-sm-1">Amount</th>
									<th class="col-sm-2 c-js-searchable">Message</th>
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
		<script src="${app}/res/excellentexport/excellentexport.js" ></script>
		
		<script src="${app}/res/app/js/services/transactionService.js"></script>
		<script src="${app}/res/app/js/models/assetTransactions.js"></script>
		<script src="${app}/res/app/js/views/transactions.js"></script>
		<script src="${app}/res/app/js/controllers/transactions.js"></script>
		<script src="${app}/res/app/js/pages/assetTransactions.js"></script>

	</body>
</html>