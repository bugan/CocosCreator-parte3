cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab : cc.Prefab,
        area : cc.Float,
        _distanciaMinima : cc.Float,
    },

    onLoad: function () {
        this.calculaDistanciaMinima();
        this.schedule(this.gerar, this.tempoParaGerar);
    },
    gerar : function(){
        if(this.podeGerar()){
            let posicao = this.calcularPosicao();
            let zumbi = cc.instantiate(this.inimigoPrefab);
            zumbi.parent = this.node.parent;
            zumbi.position = posicao;
        }
    },

    calcularPosicao : function(){
        let alcance = new cc.Vec2(Math.random()- 0.5, Math.random() - 0.5);
        alcance = alcance.normalize();
        alcance = alcance.mul(this.area * Math.random());
        let posicao = this.node.position.add(alcance);
        return posicao;
    },

    calculaDistanciaMinima : function(){
        let resolucao = cc.view.getVisibleSize();
        this._distanciaMinima = resolucao.width / 2;
    },

    podeGerar : function(){
        let distanciaAtual = cc.Camera.main.node.position.sub(this.node.position);
        if(distanciaAtual.mag() > this._distanciaMinima){
            return true;
        }
        return false;
    }

});
