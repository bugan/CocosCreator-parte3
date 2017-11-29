cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab : cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.gerar, this.tempoParaGerar);
    },
    gerar : function(){
        let zumbi = cc.instantiate(this.inimigoPrefab);
        zumbi.parent = this.node.parent;
        zumbi.position = this.node.position;
    }

});
