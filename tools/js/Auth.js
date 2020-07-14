function Auth() {
  this.login = $("#login-wrapper")
  this.register = $("#register-wrapper")
}

Auth.prototype.authLogin = function (){
  let loginBtn = this.login.find("#sub")
  let username = this.login.find("#username")
  let password = this.login.find("#password")
  let then = this
  let telTree = false
  let pwdTree = false
  loginBtn.click(function (){
    if (username.val().length > 0) {
      if (username.val().length >= 3 && username.val().length <= 18) {
        then.login.find("#username").removeClass("is-invalid").addClass("is-valid")
        telTree = true
      } else {
        then.login.find("#username").removeClass("is-valid").addClass("is-invalid")
      }
    } else {
      then.login.find("#username").removeClass("is-valid").addClass("is-invalid")
    }
    if (password.val().length > 0) {
      if (password.val().length >= 6 && password.val().length <= 18) {
        then.login.find("#password").removeClass("is-invalid").addClass("is-valid")
        pwdTree = true
      } else{
        then.login.find("#password").removeClass("is-valid").addClass("is-invalid")
      }
    } else {
      then.login.find("#password").removeClass("is-valid").addClass("is-invalid")
    }
    if (telTree && pwdTree) {
      $.ajax({
        url: Base + "admin/login.php",
        type: "post",
        data: {
          username: username.val(),
          password: password.val()
        },
        success: function (result) {
          let data = JSON.parse(result)
          if (data["code"] == "200") {
            alert(data["message"])
            localStorage.setItem("state", 1)
            localStorage.setItem("tel", data["data"]["username"])
            window.location.href = Base + "index.html"
          } else if (data["code"] == "400") {
            alert(data["message"])
          }
        }
      })
    }
  })
}

Auth.prototype.authRegister = function (){
  let registerBtn = this.register.find("#sub")
  let username = this.register.find("#username")
  let password = this.register.find("#password")
  let rpassword = this.register.find("#rpassword")

  let then = this
  let telTree = false
  let pwdTree = false
  let rpwdTree = false

  registerBtn.click(function (){
    console.log("dd");
    if (username.val().length > 0) {
      if (username.val().length >= 3 && username.val().length <= 18) {
        username.removeClass("is-invalid").addClass("is-valid")
        telTree = true
      } else {
        username.removeClass("is-valid").addClass("is-invalid")
      }
    } else {
      username.removeClass("is-valid").addClass("is-invalid")
    }
    if (password.val().length > 0) {
      if (password.val().length >= 6 && password.val().length <= 18) {
        password.removeClass("is-invalid").addClass("is-valid")
        pwdTree = true
      } else{
        password.removeClass("is-valid").addClass("is-invalid")
      }
    } else {
      password.removeClass("is-valid").addClass("is-invalid")
    }
    if (rpassword.val().length > 0) {
      if (rpassword.val() == password.val()) {
        rpassword.removeClass("is-invalid").addClass("is-valid")
        rpwdTree = true
      } else {
        rpassword.removeClass("is-valid").addClass("is-invalid")
      }
    } else {
      rpassword.removeClass("is-valid").addClass("is-invalid")
    }

    if(telTree && pwdTree && rpwdTree) {
      $.ajax({
        url: Base + "admin/register.php",
        type: "post",
        data: {
          "username": username.val(),
          "password": password.val()
        },
        success: function (result){
          let data = JSON.parse(result)
          if (data["code"] == "200") {
            alert(data["message"])
            localStorage.setItem("state", 1)
            localStorage.setItem("tel", data["data"]["username"])
            window.location.href = "./index.html"
          } else if (data["code"] == "400") {
            alert(data["message"])
          }
        }
      })
    }
  })
}

Auth.prototype.run = function (){
  this.authLogin()
  this.authRegister()

}

$(function (){
  var auth = new Auth()
  auth.run()
})