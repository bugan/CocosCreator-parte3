cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao : cc.Component,
    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },
    update : function(){
        this._movimentacao.andarPraFrente();  
    },
    onCollisionEnter:function(outro){
        if(outro.node.group == "inimigo"){

            outro.node.destroy();
        }
        this.node.destroy();
    }

});
