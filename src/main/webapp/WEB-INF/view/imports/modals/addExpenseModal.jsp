<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<aside class="modal fade" id="c-js-add-expense-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<header class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Add Expense</h4>
			</header>
			<div class="modal-body">
				<form id="c-js-add-expense-full-form" action="" method="post" class="form-horizontal">
					<input type="hidden" id="type" name="type" required="required" />
					<div class="form-group">
						<label for="amount" class="col-sm-3 control-label">Amount</label>
						<div class="col-sm-9">
							<input type="number" step="any" class="form-control" name="amount" id="amount" placeholder="Amount" required="required" autofocus="autofocus">
						</div>
					</div>
					
					<div class="form-group" id="c-js-expense-category-form-group">
						<label for="category" class="col-sm-3 control-label">Category</label>
						<div class="col-sm-9">
							<select class="form-control" name="category" id="category" placeholder="Category" required="required">
							</select>
						</div>
					</div>
					
					<div class="form-group" id="c-js-expense-asset-form-group">
						<label for="asset" class="col-sm-3 control-label"></label>
						<div class="col-sm-9">
							<select class="form-control" name="asset" id="asset" placeholder="Asset" required="required">
							</select>
						</div>
					</div>
					
					<div class="form-group">
						<label for="description" class="col-sm-3 control-label">Description</label>
						<div class="col-sm-9">
							<textarea class="form-control" name="description" id="description" placeholder="Description"></textarea>
						</div>
					</div>
				</form>
			</div>
			<footer class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				<button form="c-js-add-expense-full-form" type="submit" class="btn btn-primary">Add</button>
			</footer>
		</div>
	</div>
</aside>