<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<c:set var="app" value="${pageContext.servletContext.contextPath}" />

<c:import url="/imports/modals/addExpenseModal"></c:import>

<script src="https://code.jquery.com/jquery-2.2.4.min.js"
		integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
		crossorigin="anonymous"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
		integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
		crossorigin="anonymous"></script>

<script src="${app}/res/jscookie/js.cookie.js"></script>
<script src="${app}/res/datejs/date.js"></script>
<script src="${app}/res/app/js/alerts.js"></script>
<script src="${app}/res/app/js/app.js"></script>
<script src="${app}/res/app/js/core.js"></script>
<script src="${app}/res/app/js/domain.js"></script>

<script src="${app}/res/app/js/services/categoryService.js"></script>
<script src="${app}/res/app/js/services/assetService.js"></script>
<script src="${app}/res/app/js/services/currencyService.js"></script>
<script src="${app}/res/app/js/services/expenseService.js"></script>

<script src="${app}/res/app/js/models/mainNav.js"></script>
<script src="${app}/res/app/js/views/mainNav.js"></script>
<script src="${app}/res/app/js/controllers/mainNav.js"></script>
<script src="${app}/res/app/js/pages/mainNav.js"></script>