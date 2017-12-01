cc.Class({
    extends: cc.Component,

    properties: {
        evento : cc.String,
        _audio : cc.AudioSource,
    },

    // use this for initialization
    onLoad: function () {
        this._audio = this.getComponent(cc.AudioSource);
        cc.director.getScene().on(this.evento, this.tocarAudio, this);
    },
    
    tocarAudio : function(event){
        this._audio.play();
    }

});
