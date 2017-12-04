cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        dano : cc.Float,
        distanciaAtaque : cc.Float,
        distanciaPerseguir : cc.Float,
        tempoAtaque : cc.Float,
        _cronometroAtaque : cc.Float,
        _controleAnimacao : cc.Component,
        _eventoAtaque : cc.Event.CustomEvent,
        _gameOver : cc.Node,
        _movimentacao : cc.Component,


    },

    onLoad: function () {
        this.buscarDependencias();
        this.registrarCallbackDeEventos();

        this._cronometroAtaque = this.tempoAtaque;
    },

    update: function (deltaTime) {
        let direcao = this.alvo.position.sub(this.node.position);
        let distancia = direcao.mag();

        this._cronometroAtaque -= deltaTime;

        if(distancia < this.distanciaPerseguir){
            this._controleAnimacao.mudaAnimacao(direcao, "Andar");
            this.movimentarInimigo(direcao);
        }

        if(distancia < this.distanciaAtaque && this._cronometroAtaque < 0){
            this.alvo.emit("SofrerDano", {dano: this.dano});
            this._cronometroAtaque = this.tempoAtaque;
        }
    },

    movimentarInimigo : function(direcao){
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarPraFrente();    
    },

    morrer : function(event){
        let eventoMorreu = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorreu); 
        this.node.destroy();
    },

    registrarCallbackDeEventos : function(){
        this.node.on("SofrerDano", this.morrer, this);
    },

    buscarDependencias: function(){
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");

        this._gameOver = cc.find("GameOver");
        this.alvo = cc.find("Personagens/Jogadora");
    },
});
