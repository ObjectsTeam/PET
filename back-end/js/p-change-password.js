var $changePasswordPanel = (function() {
  var $changePwdDOM = $(''
  	+'<div class="mbx">密码管理>修改密码</div>'
      + '<div class="change-password-panel">'
        + '<form>'
          + '<input class="origin-pwd" type="password" placeholder="请输入原密码" required><br>'
          + '<input class="new-pwd" type="password" placeholder="请输入新密码" minlength="6" required><br>'
          + '<input class="new-pwd2" type="password" placeholder="请再次输入新密码" minlength="6" required><br>'
          + '<input type="submit" value="保存">'
          + '<input type="reset" value="重置">'
        + '</form>'
      + '</div>');

  var $form = $changePwdDOM.find('form'),
    $originPwd = $changePwdDOM.find('.origin-pwd'),
    $newPwd = $changePwdDOM.find('.new-pwd'),
    $newPwd2 = $changePwdDOM.find('.new-pwd2');

  /**
   * 验证密码数据是否合法
   *
   * @returns boolean true 验证通过，false 验证不通过
   */
  function validate() {
    if($originPwd.val() === $newPwd.val()) {
      alert('新密码不应该跟旧密码相同');
      return false;
    } else if($newPwd.val() !== $newPwd2.val()) {
      alert('确认密码和新密码不同');
      return false;
    } else {
      return true;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if(validate()) {
      // 验证通过后，调用 API 接口修改密码
      //创建http服务
			var obj={
				'username':localStorage.getItem("username"),
				'newPwd':$newPwd.val()
			}
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
				    console.log(xhr.readyState,xhr.status);
				    if (xhr.readyState == 4) {
				        //表示服务器的相应代码是200；正确返回了数据
				        if(xhr.status == 200){
									var message = xhr.responseText;
									var result = JSON.parse(message);
									if(result == 1){
				            alert("success!");
									}
				        }
				    }
				};
				xhr.open("get","http://127.0.0.1:8082?"+obj.username+'-'+obj.newPwd,true);//使用POST方法
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
        xhr.send();
    }
  }
  
  function show(config) {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($changePwdDOM);

    $form.submit(onSubmit);
  }

  return {show: show};
})();
