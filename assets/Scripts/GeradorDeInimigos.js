cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab : cc.Prefab,
        area : cc.Float,
    },

    // use this for initialization
    onLoad: function () {
        this.schedule(this.gerar, this.tempoParaGerar);
    },
    gerar : function(){
        let posicao = this.calcularPosicao();
        let zumbi = cc.instantiate(this.inimigoPrefab);
        zumbi.parent = this.node.parent;
        zumbi.position = posicao;
    },

    calcularPosicao : function(){
        let alcance = new cc.Vec2(Math.random()- 0.5, Math.random() - 0.5);
        alcance = alcance.normalize();
        alcance = alcance.mul(this.area * Math.random());
        let posicao = this.node.position.add(alcance);
        return posicao;
    }

});
