class Load {
  constructor(name) {
    this.name = name
    this.path = "http://localhost/tentacion/components/"
  }
  load() {
    let path = Base + "components/" +  this.name + "/" + this.name
    $.ajax({
      url: path + ".html",
      type: "get",
      success: res => {
        $("#"+this.name+"").append(res)
        $("head").append($("<link rel='stylesheet' href='"+ path +".css'>"))
        $("head").append($("<script src='"+path+".js'></script>"))
      }
    })
  }
}

