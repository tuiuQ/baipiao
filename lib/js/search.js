$(() => {
  let navbar = new Load("navbar")
  navbar.load()
  let footer = new Load("footer")
  footer.load()

  let audio = $("audio")
  let searchI = $(".search")
  let player = new Player(audio[0])


  let query = parseUrl(window.location.href)
  try {
    if (query["name"] && query["page"]) {
      searchI.val(decodeURI(query["name"]))
      player.getSearch(query["name"], query["page"])
    } else if (query["name"]) {
      searchI.val(decodeURI(query["name"]))
      player.getSearch(query["name"])
    } else {
      alert("请输入要搜索的歌曲/歌手/专辑")
    }
  } catch {
  }





  function parseUrl(url) {
    url = url.split("#")[0].split("?")[1]
    url = url.split("&")
    let query = {}
    for(let i = 0; i < url.length; i++) {
      let p = url[i].split("=")
      query[p[0]] = p[1]
    }

    return query

  }
})