$(() => {
  let navbar = new Load("navbar")
  navbar.load()
  let banner = new Load("banner")
  banner.load()
  let footer = new Load("footer")
  footer.load()

  let state = localStorage.getItem("state")
  if (state === "1") {
    $("#main .sign .yi").css({display: "flex"})
    $("#main .sign .wei").css({display: "none"})
  } else {
    $("#main .sign .yi").css({display: "none"})
    $("#main .sign .wei").css({display: "flex"})
  }
})

