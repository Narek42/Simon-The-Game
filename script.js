new Vue({
  el: "#main",
  data: {
    container: Array.from(document.querySelectorAll(".container div")),
    btnStart: document.querySelector(".start"),
    rgbColor: "",
    lavel: "1500",
    round: 1,
    finishRound: 0,
    clickDiv: [],
    gameing: true,
    audio: 0,
    msg: "",
    i: 0,
  },
  methods: {
    randomRGB: function () {
      var r = parseInt(Math.random() * 255);
      var g = parseInt(Math.random() * 255);
      var b = parseInt(Math.random() * 255);
      this.rgbColor = `rgba(${r}, ${g}, ${b})`;
      return this.rgbColor;
    },
    setRandomColor: function () {
      this.container.map((item) => {
        this.randomRGB();
        item.style.background = this.rgbColor;
      });
      this.btnStart.style.background = this.randomRGB();
    },
    randomButton: function () {
      return parseInt(Math.random() * 4);
    },
    onClick: function () {
      const divs = document.querySelectorAll(".button");
      for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", this.selectDiv);
      }
    },
    offClick: function () {
      const divs = document.querySelectorAll(".button");
      for (let i = 0; i < divs.length; i++) {
        divs[i].removeEventListener("click", this.selectDiv);
      }
    },
    nextRound: function () {
      this.round += 1;
      this.finishRound = 0;
      this.clickDiv = [];
      this.startGame();
    },
    lostGame: function () {
      this.gameing = true;
      this.msg = "You Loss";
      this.round = 1;
      this.clickDiv = [];
      this.finishRound = 0;
      this.i = 0;
      const divs = document.querySelectorAll(".button");
      this.offClick();
    },
    selectDiv: function (event) {
      const sound = new Howl({
        src: ["han4snhat.mp3"],
        volume: 0.5,
      });
      const click = event.currentTarget;
      click.style.opacity = 1;
      setTimeout(() => {
        if (this.audio) {
          sound.play();
        }
        click.style.opacity = "0.3";
      }, 90);
      if (this.clickDiv.length > 0) {
        if (Number(click.dataset.id) != Number(this.clickDiv[this.i])) {
          return this.lostGame();
        }
      }
      this.i += 1;
      if (this.i == this.clickDiv.length) {
        this.i = 0;
        this.clickDiv = [];
        this.nextRound();
      }
    },
    activeDiv: function () {
      this.offClick();
      if (this.round > this.finishRound) {
        const randomButton = this.randomButton();
        const container = Array.from(
          document.querySelectorAll(".container div")
        );
        this.finishRound += 1;
        this.clickDiv.push(randomButton);
        container[randomButton].style.opacity = "1";
        setTimeout(() => {
          container[randomButton].style.opacity = "0.3";
        }, 300);
        if (this.round == this.finishRound) {
          clearInterval(this.timer);
          this.onClick();
        }
      }
    },
    startGame: function () {
      this.gameing = false;
      this.msg = "";
      this.timer = setInterval(this.activeDiv, this.lavel);
    },
  },
  created: function () {
    this.setRandomColor();
    console.log(this.audio);
  },
});
