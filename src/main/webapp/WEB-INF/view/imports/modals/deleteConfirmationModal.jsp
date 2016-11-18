<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<aside class="modal fade" id="c-delete-confirmation-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<header class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Please, confirm</h4>
			</header>
			<div class="modal-body">
				<p>You are about to DELETE the following:</p>
				<p id="c-delete-subject" class="well well-sm"></p>
			</div>
			<footer class="modal-footer">
				
				<form action="" method="post" id="c-modal-delete-form">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="submit" class="btn btn-danger">Delete</button>
				</form>
			</footer>
		</div>
	</div>
</aside>