cc.Class({
    extends: cc.Component,

    properties: {
        _barraDeVida : cc.ProgressBar,
    },

    onLoad: function () {
        
        cc.director.getScene().on("JogadoraPerdeuVida", this.atualizarBarraDeVida, this);
        
        this._barraDeVida = this.getComponent(cc.ProgressBar);
        this._barraDeVida.progress = 1;
    },
    
    atualizarBarraDeVida : function(event)
    {
        let dados = event.getUserData();
        this._barraDeVida.progress = dados.vidaAtual / dados.vidaMaxima;
    },
    
});
