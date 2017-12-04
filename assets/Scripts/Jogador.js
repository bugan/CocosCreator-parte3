let Teclado = require("Teclado")
cc.Class({
    extends: cc.Component,

    properties: {
        tiro : cc.Prefab,
        vida : cc.Float,
        _vidaAtual : cc.Float,

        _movimentacao : cc.Component,
        _controleAnimacao : cc.Component,
        
        _audioTiro : cc.AudioSource,

        _direcao : cc.Vec2,
        _camera : cc.Camera,
        _canvas : cc.Canvas,

        _eventoPerdeuVida : cc.Event.EventCustom,
        _eventoMorte : cc.Event.EventCustom,
    },

    onLoad: function () {
        this._vidaAtual = this.vida;
        this.buscarDependencias();
        this.registrarCallbackDeEventos();
        this.criarEventosCustomizados();
    },

    update: function (deltaTime) {
        this._movimentacao.setDirecao(this.calcularDirecao());
        this._movimentacao.andarPraFrente();

    },

    calcularDirecao : function(){
        let direcao = cc.Vec2.ZERO;
        if(Teclado.estaPressionada(cc.KEY.a)){
            direcao.x -= 1;
        }

        if(Teclado.estaPressionada(cc.KEY.d)){
            direcao.x += 1;
        }

        if(Teclado.estaPressionada(cc.KEY.s)){
            direcao.y -= 1;   
        }

        if(Teclado.estaPressionada(cc.KEY.w)){
            direcao.y += 1;
        }
        return direcao;
    },

    mudarDirecaoDaAnimcao : function(event){
        let direcao = this.calcularDirecaoMouse(event);
        let estado;
        if(this.calcularDirecao().mag() == 0){
            estado = "Parado";
        }else{
            estado = "Andar";
        }
        this._controleAnimacao.mudaAnimacao(direcao, estado);
    },

    calcularDirecaoMouse : function(event){
        let posicaoDoClique = event.getLocation();
        posicaoDoClique = new cc.Vec2(posicaoDoClique.x, posicaoDoClique.y);
        posicaoDoClique = this._canvas.convertToNodeSpaceAR(posicaoDoClique);

        let posicaoDoJogador = this._camera.convertToNodeSpaceAR(this.node.position);

        let direcao = posicaoDoClique.sub(posicaoDoJogador);
        return direcao;
    },

    atirar : function(event){
        let direcao = this.calcularDirecaoMouse(event);
        let disparo = cc.instantiate(this.tiro);  
        disparo.getComponent("Tiro").inicializa(this.node.parent, this.node.position, direcao);
        
        this._audioTiro.play();
    },

    sofrerDano : function(event){
        this._vidaAtual -= event.detail.dano;
        this.dispararEvento(this._eventoPerdeuVida,{vidaAtual : this._vidaAtual, vidaMaxima: this.vida});

        if(this._vidaAtual < 0){
            this.dispararEvento(this._eventoMorte);
        }
    },

    dispararEvento : function(evento, dados){
        evento.setUserData(dados);
        this.node.dispatchEvent(evento);    
    },

    registrarCallbackDeEventos : function(){
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.mudarDirecaoDaAnimcao, this);
        this.node.on("SofrerDano", this.sofrerDano, this);
    },

    buscarDependencias: function(){
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._audioTiro = this.getComponent(cc.AudioSource);

        this._camera = cc.find("Camera");
        this._canvas = cc.find("Canvas");
    },

    criarEventosCustomizados : function(){
        this._eventoPerdeuVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        this._eventoMorte = new cc.Event.EventCustom("JogadoraMorreu", true);
    }
});
