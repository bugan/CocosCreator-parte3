cc.Class({
    extends: cc.Component,

    properties: {
        _direcao : cc.Vec2,
        tiro : cc.Prefab,
        _movimentacao : cc.Component,
        _controleAnimacao : cc.Component,
        _canvas : cc.Canvas,
        vivo : true,

    },


    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.mudarDirecaoDaAnimcao, this);
        this.vivo = true;

    },
    
    update: function (deltaTime) {
        this._movimentacao.setDirecao(this._direcao);
        this._movimentacao.andarPraFrente();

    },

    mudarDirecaoDaAnimcao : function(event){
        let direcao = this.calcularDirecaoMouse(event);
        let estado;
        if(this._direcao.mag() == 0){
            estado = "Parado";
        }else{
            estado = "Andar";
        }
        this._controleAnimacao.mudaAnimacao(direcao, estado);
    },

    calcularDirecaoMouse : function(event){
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        let direcao = posicaoMouse.sub(this.node.position);
        return direcao;
    },

    atirar : function(event){
        let direcao = this.calcularDirecaoMouse(event);
        let disparo = cc.instantiate(this.tiro);  
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        disparo.getComponent("Movimentacao").setDirecao(direcao);
    },

    teclaPressionada : function(event){

        if(event.keyCode == cc.KEY.a){
            this._direcao.x = -1;
        }
        if(event.keyCode == cc.KEY.d){
            this._direcao.x = 1;
        }

        if(event.keyCode == cc.KEY.w){
            this._direcao.y = 1;
        }
        if(event.keyCode == cc.KEY.s){
            this._direcao.y = -1;
        }
    },


    teclaSolta : function(event){
        if(event.keyCode == cc.KEY.a){
            this._direcao.x = 0;
        }
        if(event.keyCode == cc.KEY.d){
            this._direcao.x = 0;
        }

        if(event.keyCode == cc.KEY.w){
            this._direcao.y = 0;
        }
        if(event.keyCode == cc.KEY.s){
            this._direcao.y = 0;
        }
    }

});
