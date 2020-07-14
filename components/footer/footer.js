$(() => {
  let audio = $("audio")
  let player = new Player(audio[0])
  player.run()
  let play = $("#footer .play")
  let next = $(".next")
  let prev = $(".prev")
  play.click(() => {
    player.play()
  })
  next.click(() => {
    player.next()
  })
  prev.click(() => {
    player.prev()
  })

})