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
		<c:import url="/imports/head?pageTitle=Categories"></c:import>
	</head>
	
	<body>
		<div class="container">
			<c:import url="/imports/mainNav"></c:import>
			
			<main>
				<header class="page-header">
					<h2>Categories</h2>
					
					<ol class="breadcrumb" id="c-js-crumbs">
						<li class="c-js-home-crumb">
							<a href="${app}/"><i class="fa fa-home"></i></a>
						</li>
						<li class="active">Settings</li>
						<li class="active">Categories</li>
					</ol>
				</header>
				
				<!-- TAB NAVIGATION -->
				<ul class="nav nav-tabs" role="tablist">
					<li class="active"><a href="#c-js-income-categories" role="tab" data-toggle="tab">Income</a></li>
					<li><a href="#c-js-outgoing-categories" role="tab" data-toggle="tab">Outgoing</a></li>
				</ul>
				
				<!-- TAB CONTENT -->
				<div class="tab-content">
					
					<!-- INCOME -->
					<div class="active tab-pane fade in" id="c-js-income-categories">
						<h2>Income</h2>
						
						<section id="c-js-add-income-category-form">
							<form action="" method="post" class="form-inline">
								<sec:csrfInput/>
								<div class="form-group">
									<label class="sr-only" for="name">Name</label>
									<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
								</div>
								
								<button type="submit" class="btn btn-primary">Add</button>
								<button type="reset" class="btn btn-danger">Reset</button>
							</form>
						</section>
						
						<section id="c-js-edit-income-category-form" class="hidden">
							<form action="" method="post" class="form-inline">
								<sec:csrfInput/>
								<input type="hidden" value="" name="id" id="id">
								<input type="hidden" value="" name="type" id="type">
								<div class="form-group">
									<label class="sr-only" for="name">Name</label>
									<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
								</div>
								
								<button type="submit" class="btn btn-primary">Save changes</button>
								<button id="c-js-cancel-edit-incoming-category-button" type="button" class="btn btn-warning">Cancel</button>
								<button type="reset" class="btn btn-danger">Close</button>
							</form>
						</section>
						
						<section id="c-js-income-categories-table">
							<div class="table-responsive">
								<table class="table table-hover">
									<thead>
										<tr>
											<th class="col-sm-11">Name</th>
											<th class="col-sm-1">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr class="c-spinner">
											<td><i class="fa fa-spinner fa-pulse"></i></td>
											<td><i class="fa fa-spinner fa-pulse"></i></td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
					
					<!-- OUTGOING -->
					<div class="tab-pane fade" id="c-js-outgoing-categories">
						<h2>Outgoing</h2>
						
						<section id="c-js-add-outgoing-category-form">
							<form action="" method="post" class="form-inline">
								<sec:csrfInput/>
								<div class="form-group">
									<label class="sr-only" for="name">Name</label>
									<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
								</div>
								
								<button type="submit" class="btn btn-primary">Add</button>
								<button type="reset" class="btn btn-danger">Reset</button>
							</form>
						</section>
						
						<section id="c-js-edit-outgoing-category-form" class="hidden">
							<form action="" method="post" class="form-inline">
								<sec:csrfInput/>
								<input type="hidden" value="" name="id" id="id">
								<input type="hidden" value="" name="type" id="type">
								<div class="form-group">
									<label class="sr-only" for="name">Name</label>
									<input type="text" class="form-control" name="name" id="name" placeholder="Name" required="required">
								</div>
								
								<button type="submit" class="btn btn-primary">Save changes</button>
								<button id="c-js-cancel-edit-outgoing-category-button" type="button" class="btn btn-warning">Cancel</button>
								<button type="reset" class="btn btn-danger">Close</button>
							</form>
						</section>
						
						<section id="c-js-outgoing-categories-table">
							<div class="table-responsive">
								<table class="table table-hover">
									<thead>
										<tr>
											<th class="col-sm-11">Name</th>
											<th class="col-sm-1">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr class="c-spinner">
											<td><i class="fa fa-spinner fa-pulse"></i></td>
											<td><i class="fa fa-spinner fa-pulse"></i></td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</div>
			
			
			</main>
			
			<c:import url="/imports/mainFooter"></c:import>
		</div>

		<div class="c-modals">
			<c:import url="/imports/modals/deleteConfirmationModal"></c:import>
		</div>

		<c:import url="/imports/scripts"></c:import>
		<script src="${app}/res/app/js/services/categoryService.js"></script>
		<script src="${app}/res/app/js/models/categories.js"></script>
		<script src="${app}/res/app/js/views/incomeCategories.js"></script>
		<script src="${app}/res/app/js/views/outgoingCategories.js"></script>
		<script src="${app}/res/app/js/controllers/categories.js"></script>
		<script src="${app}/res/app/js/pages/categories.js"></script>

	</body>
</html>