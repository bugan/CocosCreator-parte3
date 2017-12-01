cc.Class({
    extends: cc.Component,

    properties: {
       vidaMinimaParaTocar : {
           default: .5,
           range: [0,1],
           type: cc.Float,
           slide : true,
       },
        _audioCoracao : cc.AudioSource,
    },

    onLoad: function () {
        cc.director.getScene().on("JogadoraPerdeuVida", this.tocarAudio, this);
        this._audioCoracao = this.getComponent(cc.AudioSource);
    },
    
    tocarAudio : function(event)
    {
        let dados = event.getUserData();
        let vidaRestante = dados.vidaAtual / dados.vidaMaxima;
        
        if(vidaRestante < this.vidaMinimaParaTocar && !this._audioCoracao.isPlaying){
             this._audioCoracao.loop = true;
             this._audioCoracao.play();
        }
    },
});
