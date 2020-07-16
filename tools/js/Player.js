class Player {
  constructor(obj) {
    this.obj = obj
    this._state = false
    this.timer
    this.progressBox = $("#footer .progress")
    this.volumeProgressBox = $("#footer .volume-progress")
    this.bar = $("#footer .progress .bar")
    this.volumeBar = $("#footer .volume .volume-progress .bar")
    this._duration = "00:00"
    this.move = false
    this._mediaPath = Base + "lib/media/"
    this._Base = Base
    this.playlistId = []
    this.playlist = []
    this.thenPlay = 0
    this.title = $("#footer .info .title")
    this.singer = $("#footer .info .singer")
    this.cover = $("#footer .cover img")
    this.list = $(".list")
    this.zhang = $(".play-list")
    this.newsong = $(".news-song")
    this.zhangM = false
    this.searchList = []
  }

  run() {
    console.log(this.progressBox[0].offsetLeft);
    this.init()
    this.getData()
    this.progress()
    this.progressClick()
    this.progressMove()
    this.listShowHide()
    this.volumeProgressClick()
  }

  // 计算音乐时长
  init() {
    let time = this.obj.duration
    let min = parseInt(time / 60)
    if (min > 10) {
      min = "0" + min
    }
    let sec = Math.round(time % 60)
    if (sec < 10) {
      sec = "0" + sec
    }
    this._duration = min + ":" + sec

  }

  // 显示隐藏音乐列表
  listShowHide() {
    this.zhang.click(() => {
      if (this.zhangM) {
        this.zhangM = !this.zhangM
        this.list.hide()
      } else {
        this.zhangM = !this.zhangM
        this.list.show()
      }
    })
  }

  // 获取音乐数据
  getData() {
    $.ajax({
      url: this._Base + "admin/getData.php",
      type: "get",
      success: result => {
        try {
          let data = JSON.parse(result)
          this.playlist = data["playlist"]["tracks"]
          this.playlistId = data["playlist"]["trackIds"]
          // 初始化第一条音乐
          this.getDanUrl(this.playlistId[this.thenPlay]["id"], false)
          for (let i = 0; i < 50; i++) {
            if (i < 10) {
              let item = $("<li class='list-group-item' data-id='"+i+"'>"+this.playlist[i].name+"</li>")
              $(".pai .ge").append(item)
            }
            if (i > 9 && i < 20) {
              // 动态插入最新音乐
              let item = createNewSong(i, this.playlist[i])
              this.newsong.append(item)
            }
            // 动态插入音乐列表
            let item = createList(i, this.playlist[i])
            $(this.list.find(".songlist")).append(item)
          }

          // 初始化音乐列表默认选中的音乐
          $(this.list.find(".songlist li")[0]).addClass("active")


          // 给音乐列表每条音乐添加点击事件
          // 这里不使用箭头函数是因为在里面需要使用到$(this)，来获取点击了那条音乐
          // 所以在外面先赋值给then变量
          let then = this
          $(this.list.find(".songlist li")).click(function () {
            // 切换选中音乐的状态
            $(this).addClass("active").siblings("li").removeClass("active")
            then.update($(this).data("id"))
          })

          // 给最新音乐每条音乐添加点击事件
          $(this.newsong.find(".item")).click(function () {
            then.update($(this).data("id"))
          })
          console.log($(".pai .ge .list-group-item"));
          $(".pai .ge .list-group-item").click(function (){
            then.update($(this).data("id"))
          })

        } catch {
          alert("请求失败，请检查网络问题")
        }
      }
    })


    // 创建一条最新列表音乐
    function createNewSong(index, ele) {
      let $item = $("<div class=\"item\" data-id='"+index+"'>\n" +
          "                        <div class=\"name\">"+ele.name+"</div>\n" +
          "                        <div class=\"info\">\n" +
          "                          <div class=\"singer\">"+ele["ar"][0]["name"]+"</div>\n" +
          "                        </div>\n" +
          "                      </div>")
      return $item
    }

    // 创建一条音乐列表音乐
    function createList(index, ele) {
      let $item = $("<li data-id='"+index+"'>\n" +
          "        <div class=\"name\">"+ele.name+"</div>\n" +
          "        <div class=\"author\">"+ele["ar"][0]["name"]+"</div>\n" +
          "      </li>")
      return $item
    }
  }

  // 更改播放歌曲
  update (id) {
    this.thenPlay = id
    this.getDanUrl(this.playlistId[id]["id"])
  }



  // 点击播放按钮播放
  play() {
    if (this._state) {
      console.log(this._state);
      this.obj.pause()
      this._state = false
      $("#footer .play i").removeClass("fa-pause").addClass("fa-play")
      this.progressRoll()
    } else {
      console.log(this._state);
      this.obj.play()
      this._state = true
      $("#footer .play i").removeClass("fa-play").addClass("fa-pause")
      this.progress()
    }
  }

  volumeProgressClick() {
    this.volumeProgressBox.click(e => {
      this.obj.volume = e.offsetX / progressW
      this.volumeBar.css({width: e.offsetX + "px"})
    })
  }

  // 进度条跟新
  progress () {
    if (this._state) {
      this.timer = this.progressRoll()
    } else {
      clearInterval(this.timer)
    }
  }

  // 进度条点击更换进度
  progressClick() {
    let progressW = this.progressBox.width()
    let progressOffLeft = $("#footer .progress")[0].offsetLeft
    this.progressBox.click(e => {
      let current = (e.clientX / progressW) * 100
      this.obj.currentTime = this.obj.duration * (((e.clientX - progressOffLeft) / progressW))
      this.bar.css({width: current + "%"})
    })
  }


  // 进度条的拖动
  progressMove() {
    this.progressBox.mousedown(() => {
      $(document).mousemove(e => {
        clearInterval(this.timer)
        let progressW = this.progressBox.width()
        let current = (e.clientX / progressW) * 100
        this.bar.css({width: current + "%"})
        this.move = true
      })
    })

    $(document).mouseup((e) => {
      $(document).off("mousemove")
      if (this.move) {
        this.timer = this.progressRoll()
        let progressW = this.progressBox.width()
        let progressOffLeft = this.progressBox[0].offsetLeft
        this.obj.currentTime = this.obj.duration * ((e.clientX - progressOffLeft) / progressW)
        this.move = false
      }

    })
  }


  // 进度条更新状态
  progressRoll() {
    setInterval(() => {
      let current =  (this.obj.currentTime / this.obj.duration) * 100
      this.bar.css({width: current + "%"})
      this.progressClick()
      if (current === 100) {
        this.next()
      }
    }, 300);
  }


  // 获取单条音乐的mp3文件
  getDanUrl(id, auto=true) {
    $.ajax({
      url: this._Base + "admin/getDan.php",
      type: "get",
      data: {
        "id": id
      },
      success: result => {
        var data = JSON.parse(result)
        this.obj.src = data["url"]
        this.title.html(this.playlist[this.thenPlay]["name"])
        this.singer.html(this.playlist[this.thenPlay]["ar"][0]["name"])
        this.cover[0].src = this.playlist[this.thenPlay]["al"]["picUrl"]
        if (auto) {
          this._state = false
          this.play()
          $("#footer .play i").removeClass("fa-play").addClass("fa-pause")
          this.progressRoll()
        }
      }
    })
  }
  getSearch(name, page = 1) {
    this.name = name
    this.page = page
    $.ajax({
      url: this._Base + "admin/getSearch.php",
      type: "get",
      data: {
        name: this.name,
        page: this.page
      },
      success: result => {
        try {
          let data = JSON.parse(result)
          this.searchList = data
          console.log(this.searchList);
          $.each(this.searchList, (index, ele) => {
            let item = createSearchList(index, ele)
            $(".playlist .list-group").append(item)
          })
          let then = this
          console.log($(".playlist .list-group .list-group-item"));
          $(".playlist .list-group .list-group-item").click(function (){
            console.log($(this).data("id"));
            then.updateS($(this).data("id"))
          })
        } catch {
          console.log("请求超时");
        }
      }
    })
    function createSearchList(index, ele) {
      let $item = $("<li class=\"list-group-item\" data-id='"+index+"'>\n" +
          "                  <div class=\"item\">\n" +
          "                    <div class=\"name\">"+ele.name+"</div>\n" +
          "                    <div class=\"info\">\n" +
          "                      <div class=\"album d-none d-sm-block\" style='text-align: center'>"+ele.album+"</div>\n" +
          "                      <div class=\"singer\" style='text-align: right'>"+ele.artist.join(" / ")+"</div>\n" +
          "                    </div>\n" +
          "                  </div>\n" +
          "                </li>")
      return $item
    }
  }
  getDan(id, auto = true) {
    $.ajax({
      url: this._Base + "admin/getDan.php",
      type: "get",
      data: {
        "id": id
      },
      success: result => {
        var data = JSON.parse(result)
        console.log(data["br"]);
        if (data["br"] == "-1") {
          alert("该歌曲无法解析")
          this.thenPlay += 1
          this.updateS(this.thenPlay)
        } else {
          this.obj.src = data["url"]
          console.log(this.title);
          $("#footer .title").html(this.searchList[this.thenPlay]["name"])
          $("#footer .singer").html(this.searchList[this.thenPlay]["artist"].join(" / "))
          if (auto) {
            this._state = false
            this.play()
            // $("#footer .play i").removeClass("fa-play").addClass("fa-pause")
          }
        }

      }
    })
  }
  updateS(id) {
    this.thenPlay = id
    $.ajax({
      url: this._Base + "admin/getImage.php",
      type: "get",
      data: {
        id: this.searchList[id]["pic_id"]
      },
      success: result => {
        let data = JSON.parse(result)
        console.log($("#footer .cover img"));
        $("#footer .cover img")[0].src = data["url"]
      }
    })
    this.getDan(this.searchList[id]["id"])
  }

  // 上一首
  prev() {
    if (this.thenPlay === 0) {
      console.log("前面已经没有歌曲了哦")
    } else {
      this.thenPlay -= 1
      this.getDanUrl(this.playlistId[this.thenPlay]["id"])
    }
  }

  // 下一首
  next() {
    console.log(this.playlistId.length);
    if (this.thenPlay === this.playlistId.length) {
      console.log("已经没有歌曲了");
    } else {
      this.thenPlay += 1
      this.getDanUrl(this.playlistId[this.thenPlay]["id"])
    }
  }
}
