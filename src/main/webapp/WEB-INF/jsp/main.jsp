<%@ page contentType="text/html" isELIgnored="false" %>
<%@ taglib prefix="portlet" uri="http://java.sun.com/portlet_2_0" %>
<portlet:defineObjects/>
<portlet:resourceURL var="data" id="data"/>

<%-- 
     This sets the javascript variable dataUrl to a portlet URL.
     In App.js we set /* global dataUrl */ that allows us to access
     this variable.
 --%>
<script>
  var dataUrl = '${data}';
</script>

<div class="up-portlet-content-wrapper-inner">
  <%--
        The id for this should be unique per portlet. Otherwise reactjs will render all content
        to the same id.
  --%>
  <div id="app">
  </div>
  <script src="${pageContext.request.contextPath}/js/main.js" type="text/javascript"></script>
</div>
