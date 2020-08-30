<template>
  <div id="nosotros">
	<Header></Header>

    <section class="v-misvis-section">

        <div class="v-misvis-leftbox">
            <div class="v-leftbox-pattern1"></div>
            <div class="v-leftbox-pattern2"></div>
        </div>
        
        <div class="v-icon-box">
                <div class="v-icon-cont">
                    <div class="v-icon"><i class="fas fa-bullseye"></i></div>
                    <p>Misión</p>
                </div>
                <div class="v-icon-cont">
                    <div class="v-icon"><i class="fab fa-tripadvisor"></i></div>
                    <p>Visión</p>
                </div>
                <div class="v-icon-cont">
                    <div class="v-icon"><i class="fas fa-heart" style="padding-top: 2px"></i></div>
                    <p>Valores</p>
                </div>
        </div>

        <div class="v-misvis-rightbox">
            <div class="v-rightbox-title">
                <div class="title-cont">
                    <span>n</span><span>u</span><span>e</span><span>s</span><span>t</span><span>r</span><span>o</span><span>s</span>
                </div>
                <div class="title-cont">
                    <span>o</span><span>b</span><span>j</span><span>e</span><span>t</span><span>i</span><span>v</span><span>o</span><span>s</span>
                </div>
            </div>
            <div class="v-rightbox-txt">
                El objetivo primordial del Club Santa Paula es proporcionar a sus socios actividades sociales, culturales, deportivas, de recreación y esparcimiento. Es, en sus fines, una manera de contribuir al ejercicio de la vida en sociedad y a procurar un espacio donde prive la humanización y la unidad familiar.
            </div>
            
            <div class="v-rightbox-txt">
                Ser una institución líder en recreación y deportes, tanto en Caracas como en el resto del país, donde participaremos mediante torneos y competencias deportivas que aseguren la generación de valor para nuestros accionistas. Estaremos orientados a destacarnos en las diversas disciplinas deportivas y sociales dentro de la Asociación de Clubes del país. Seleccionaremos y capacitaremos a nuestro personal con el fin de alcanzar los perfiles requeridos, lograremos su pleno compromiso con los valores del Club Santa Paula y le ofreceremos las mejores oportunidades de desarrollo.
            </div>
        </div>
    </section>
        
    <div class="v-history">
        <div class="v-history-imgbox" id="leftbox">
            <img src="https://via.placeholder.com/360x260" alt="History" width="100%" height="50%" loading="lazy" style="align-self:start">
        </div>
        <div class="v-history-midbox">
            El Club Santa Paula fue creado el 20 de diciembre de 1976, cuando el grupo de promotores integrado por los señores: Henrik D. Ravn, Eric Larsson, Elba Porras, Acnne Brigitt de Ravn y Ali Lasser, se reunieron en una Asamblea y con fecha 30 de diciembre de ese mismo año se registró legalmente el acta constitutiva.

            El capital de riesgo y fondo de inversión equivalió a ciento veinte (120) cuotas de participación por valor nominal de Bolívares Mil cada una.

            El numero de cuotas de participación patrimonial autorizado por los estatutos de ese momento fue de setecientas cuotas, en la actualidad se mantienen seiscientas cincuenta (650) acciones y cincuenta (50) en tesorería.

            La Junta Directiva decidió comprarle a la empresa Venezolana de Bienes S.A., una parcela de terreno ubicado en la Urbanización Santa Paula, dicha negociación se realizó el 17 de mayo de 1977, habiéndose ordenado el anteproyecto al arquitecto Harry Jagenberg.

            El asiento permanente del Club es el inmueble de su propiedad construido en la Parcela n° 647, Avenida Circunvalación del Sol, Urbanización Santa Paula, Jurisdicción del Municipio Autónomo de Baruta, Distrito Sucre, del Estado Miranda, cuya propiedad se evidencia en documento protocolizado en la Oficina Subalterna del Segundo Circuito del Registro del Distrito Sucre del Estado Miranda el 17 de Mayo de 1977, bajo el n° 20, Folio 87 Vto. Tomo 47 del Protocolo Primero, así como en el correspondiente Titulo Supletorio declarado por el Juzgado de Primera Instancia en lo Civil del Distrito Federal y Estado Miranda en fecha 18 de Agosto de 1987.

            La Asociación Civil Club Santa Paula quedó debidamente inscrita en la Oficina Subalterna del Primer Circuito de Registro del Distrito Sucre del Estado Miranda en fecha 30 de Diciembre de 1976, bajo el n° 33, Folio 218, Protocolo Primero.

            La idea fundamental está basada en las instalaciones necesarias para la practica de tenis, actualmente también se incluyen otras áreas de esparcimiento como la piscina, gimnasio, sauna, salones de juego, cafetería, bar, entre otras.
        </div>
        <div class="v-history-imgbox">

        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name: 'UsPage',
    components: {
		Header,
  	},
}
</script>

<style>
.secP .v-social-header{
    display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 5vw;
	position: relative;
	z-index: 2;
	background-color: rgba(255, 255, 255);
	width: 100%;
	height: 30px;
    overflow: hidden;
    
	/* display: flex;
	justify-content: center;
	align-items: center;
	padding: 1;
	position: relative;
	z-index: 0;
	background-color: rgba(255, 255, 255);
	width: 100%;
	height: 120px; */
}


.secP .v-navbar{
    position: relative;
	height:100px;
	width:100%;
	background-color: rgba(255,255,255);
	transition: opacity 0.2s;
	list-style: none;
	padding: auto;
	top: 0;
	z-index: 2;
	display: flex;
	align-items: center;
    justify-content: space-between;
    
	/* position: relative;
	height:60px;
	width:100%;
	background-color: rgba(255,255,255);
	transition: opacity 0.2s;
	list-style: none;
	padding: 0;
	top: 0;
	z-index: 2; */
}

.secP .v-dropdown-menu{
    height: 0;
	color: #000000;
	width: auto;
	position: absolute;
	background-color: #ffffff;
	z-index: 2;
	bottom: -1;
	transform: translateX(-100%);
	transition: transform 0.4s ease-out, opacity 0.4s ease-in;
	border-radius: 10px;
    overflow: hidden;
    
	/* height: 0;
	color: #000000;
	width: auto;
	position: absolute;
	background-color: #ffffff;
    bottom: -1;
    z-index: 2;
	transform: translateX(-100%);
	transition: transform 0.4s ease-out, opacity 0.4s ease-in;
	border-radius: 10px; */
}

</style>