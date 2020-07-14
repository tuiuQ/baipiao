$(() => {
  let state = localStorage.getItem("state")
  if (state === "1") {
    $("#navbar .wei").hide()
    $("#navbar .deng").show()
  } else {
    $("#navbar .wei").show()
    $("#navbar .deng").hide()
  }
  $(".clear").click(() => {
    localStorage.removeItem("state")
    localStorage.removeItem("tel")
    window.location.href = Base
  })
})