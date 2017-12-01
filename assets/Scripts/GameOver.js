let Teclado = require("Teclado");
cc.Class({
    extends: cc.Component,

    properties: {
        _gameOver : cc.Node,
        _podeReiniciar : false,
    },

    onLoad: function () {
        cc.director.resume();
        this._podeReiniciar = false;
        
        this._gameOver = cc.find("Interface/GameOver");

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.jogarNovamente, this);

        cc.director.getScene().on("JogadoraMorreu", this.jogoAcabou, this);

    },
    
    jogarNovamente : function(){
        if(this._podeReiniciar){
            cc.director.loadScene("Jogo");
        }  
    },

    jogoAcabou : function(event){
        cc.director.pause();
        this._podeReiniciar = true;
        this._gameOver.active = true;
    },

});
