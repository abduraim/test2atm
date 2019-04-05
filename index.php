<!DOCTYPE html>
<html>
<head>

</head>
<body>



<!-- build:deleteToHtml -->
<?php if (getAccessToken()) { ?>
  <!-- endbuild -->
  <span class="main_text match-begin">Трансляция начнется</span>
  <span class="start_time">17 марта в 17.03</span>
  <!-- build:deleteToHtml -->
<?php } else { ?>

  <span class="main_text">Для просмотра авторизуйся на&nbsp;Pass&nbsp;Media</span>
  <a href="/login" class="btn btn_blue">Войти</a>

<?php } ?>
<!-- endbuild -->


</body>
</html>
