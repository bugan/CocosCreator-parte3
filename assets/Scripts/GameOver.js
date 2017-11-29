cc.Class({
    extends: cc.Component,

    properties: {
        _gameOver : cc.Node,
        _jogador : cc.Componet,
    },

    onLoad: function () {
        cc.director.resume();
        let jogadora = cc.find("Personagem");
        this._jogador = jogadora.getComponent("Jogador");
        this._gameOver = cc.find("GameOver");
        
        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.jogarNovamente, this);
     
    },
    
    jogarNovamente : function(){
      if(!this._jogador.vivo){
          cc.director.loadScene("Jogo");
      }  
    },

    update: function (dt) {
        if(!this._jogador.vivo){
            cc.director.pause();
            this._gameOver.active = true;
        }
    },
});
