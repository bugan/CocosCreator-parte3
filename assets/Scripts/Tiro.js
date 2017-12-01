cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao : cc.Component,
    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },
    
    inicializa : function(pai, posicao, direcao){
        this.node.parent = pai;
        this.node.position = posicao;
        this._movimentacao.setDirecao(direcao);
    },
    
    update : function(){
        this._movimentacao.andarPraFrente();  
    },
    
    onCollisionEnter:function(outro){
        if(outro.node.group == "inimigo"){
            outro.node.emit("SofrerDano");
        }
        this.node.destroy();
    }

});
