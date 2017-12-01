cc.Class({
    extends: cc.Component,

    properties: {
        _mortos : cc.Float,
        _texto : cc.Label,
    },

    onLoad: function () {
        this. _mortos = 0;
        this._texto = this.getComponent(cc.Label);
        this._texto.string = this._mortos;
        
         cc.director.getScene().on("ZumbiMorreu", this.atualizarPontuacao, this);
    },
    
    atualizarPontuacao : function(event){
        this._mortos += 1;
        this._texto.string = this._mortos;
    }
});
