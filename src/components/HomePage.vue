<template>
  <div class="home" id="home">

    <div class="page-wrapper">

      	<!-- Banner con bootstrap -->
			<section class="banner-section">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" v-if="selectBanners">
				<div class="carousel-inner">
					<div :class="['carousel-item', (index === 0)?'active':'']" v-for="(slide, index) in Object.values(bannersList[0].bann_slides)" :key="index" ref="carouselitems">
						<img :src="slide.url">
						<div :class="['textcontainer', (index % 2 === 0)?'textcontainerpos1':'textcontainerpos2']">
							{{slide.info}}
						</div>
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
				</div>
			</section>
		<!-- Fin del banner -->
	
	
	<!-- Seccion Destacados -->
	<section class="featured-section">
		<div class="auto-wrapper ">
			<div class="inner-container ">
				
				<div class="clearfix row m-auto align-items-center justify-content-center" style="width:100%">
					
					<!-- Featured Block -->
					<div class="featured-block col-lg-6	col-md-6 col-sm-12">
						<div class="inner-box">
							<div class="content">
								<div class="icon-box">
									<span class="icon flaticon-newspaper"></span>
								</div>
								<h5><router-link :to="{name: 'Actualidad'}">Actualidad</router-link></h5>
							</div>
						</div>
					</div>
					
					<!-- Featured Block -->
					<div class="featured-block col-lg-6 col-md-6 col-sm-12" id="second-featured">
						<div class="inner-box">
							<div class="content">
								<div class="icon-box">
									<span class="icon flaticon-key"></span>
								</div>
								<h5><a href="http://clubsantapaula.dyndns.org:1081/user/auth/login">Autogestión</a></h5>
							</div>
						</div>
					</div>
					
				</div>
				
			</div>
		</div>
	</section>
	<!-- Seccion Destacados -->
	
	<!-- Seccion de Actualidad -->
	<section class="premium-section overflow-hidden"  v-if="dbWeb.Noticias !== undefined">
		<div class="pattern-layer"></div>
		<div class="auto-wrapper">
			<!-- Titulo de seccion -->
			<div class="sec-title centered">
				<div class="icon">
					<img src="assets/images/icons/separater.png" alt="" />
				</div>
				<h2 id="beforeNoti">Eventos y Noticias</h2>
				<div class="text">Entérate de los últimos eventos y noticias <br> de nuestro Club Santa Paula</div>
			</div>
			
			<div class="d-flex align-items-center justify-content-center flex-row flex-wrap clearfix">
				
				<!-- Bloque de Notica -->
				<div class="security-block col-md-6 col-12" ref="anuncios" v-for="(noticia, index) in reverseArray" :key="noticia.noti_id" v-show="index < numElements + showIndex && index >= showIndex">
					<div class="inner-box">
					<div class="image">
						<img :src="noticia.noti_fotos.imagen1.url" />
					</div>
					<div class="lower-content d-flex flex-column align-items-center justify-content-center">
						<div class="hover-bg-color"></div>
						<div class="upper-box">
							<div :class="['icon mr-1', iconSelect(index)]"></div>
							<h5 class="ml-1 w-100 text-left">{{noticia.noti_titulo}}</h5>
						</div>
						<div class="lower-box">
							<div class="align-self-end text" style="width: auto; font-size: 13px">
								{{calcTime(noticia.noti_fecha)}}
							</div>
							<div class="text text-center">
								{{noticia.noti_prev}}
							</div>
							<a class="align-self-end" @click="selectAnun(index)" style=" font-size: 13px">Leer más ...</a>
						</div>
					</div>
					</div>
				</div>
				
			</div>

			<div class="bot-selectors d-flex flex-row align-items-center justify-content-center position-relative align-self-end" v-if="showSelect === true">
				<div class="position-relative" style="width: 25px; height: 25px;">
				<i class="icon left-arrow flaticon-arrowhead-pointing-to-the-right" style="transform: rotate(180deg);" @click="translateLeft()"></i>
				</div>
				<div class="bot-container">
				<div class="inner-container d-flex flex-row justify-content-center align-items-center" ref="innerContainer">
					<div v-for="index in number" :key="index">
					<div :class="['circle', (index === 1)?'active':'']" :ref="`bot${index}`" :id="index">
						<div class="text" @click="changeIndex(index)">{{index}}</div>
					</div>
					</div>
				</div>
				</div>
				<div class="position-relative" style="width: 25px; height: 25px;">
				<i class="icon right-arrow flaticon-arrowhead-pointing-to-the-right" @click="translateRight()"></i>
				</div>
			</div>
			
		</div>
	</section>
	<!-- Fin Seccion Actualidad -->
	
	<!-- Seccion de Comites -->
	<section class="gallery-section">
		<div class="auto-wrapper">
			
			<div class="row clearfix">
				
				<!-- Bloque de comite de adimision -->
				<div class="gallery-block col-lg-8 col-md-12 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<div class="gallery-content-box">
								<p class="gallery-content-title"> {{dataAdmis.comi_nombre}} </p>									
							</div>
							<img src="https://via.placeholder.com/750x285" style="min-height: 285px" alt="" />
							<!-- Overlay Box -->
							<div class="overlay-box">
								<div class="overlay-inner">
									<div class="content">
										<h4><a @click="selectAdmins()">{{dataAdmis.comi_nombre}}</a></h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de comite -->
				<div  v-for="(element, index) in Object.values(this.dbWeb.Comites)" :key="element.id" v-show="element.comi_int === true" class="gallery-block col-lg-4 col-md-6 col-sm-6">
					<div class="inner-box">
						<div class="image">
							<div class="gallery-content-box">
								<p class="gallery-content-title"> {{element.comi_nombre}} </p>								
							</div>
							<img src="https://via.placeholder.com/360x285" alt="" />
							<!-- Overlay Box -->
							<div class="overlay-box">
								<div class="overlay-inner">
									<div class="content">
										<h4><a @click="selectComi(index)">{{element.comi_nombre}}</a></h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				
				
			</div>
		</div>
	</section>
	<!-- Fin Seccion Comites -->

	<!-- Seccion de Autogestion -->
		<AutogestionSpan></AutogestionSpan>
	<!-- Fin Seccion Autogestion -->
	
	<!-- Seccion Distribucion de Cuotas -->
    <section class="cuot-section" v-if="selectCuotas">
		<div class="logo-icon"></div>
		
		<!-- Icons Box -->
		<div class="cuot-icon-box">
			<div class="icon flaticon-balance"></div>
			<div class="icon flaticon-coin-stack"></div>
			<div class="icon flaticon-padlock"></div>
		</div>

		<!-- Left box -->
		<div class="cuot-left-container">
			<div class="cuot-inner-column">
				<h2>{{distCuotas.sec_nombre}}</h2>
				<div class="text">¿Quieres saber en qué se ha utilizado las cuotas mensuales? <br> Aquí te lo mostramos</div>
				<!-- Barras % -->
				<!-- Barra 1 -->
				<div class="cuot-porc" v-for="(element) in distCuotas.sec_contenido" :key="element.sec_id">
					<div class="row row-cols-1 m-0">
						<div class="cuot-porc-text d-flex">
							<div class="flex-grow-1">{{element.texto}}</div>
							<div>{{element.porcentajeBarra}}%</div>
						</div>
						<div class="progress" style="background-color: rgba(255,255,255,0.25); height: 15px;">
							<div ref="progressbar" class="progress-bar" role="progressbar" :data-progress="element.porcentajeBarra" style="width: 0%; background-color: rgba(255,255,255,0.8)" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cout-image-container">
			<img :src="distCuotas.sec_fotos.imagen0.url" v-if="distCuotas.sec_imagen_seccion">
		</div>
	</section>
	<!-- Fin Seccion Distribucion de Cuotas -->
	
	<!-- Equipo Administrativo -->
	<section class="team-section">
		<div class="auto-wrapper">
			<!-- Sec Title -->
			<div class="sec-title centered">
				<div class="icon">
					<img src="assets/images/icons/separater.png" alt="" />
				</div>
				<h2>Nuestro Equipo</h2>
				<div class="text">Ipsum dolor sit amet consect asetur adipisicing elit sedunas eiusmod <br> temporas incididunt ut labore dolore magna aliqua. </div>
			</div>
			
			<div class="row clearfix">
				
				<!-- Team Member -->
                <div class="team-member col-lg-3 col-md-6 col-sm-6" v-for="(item,index) in Object.values(dbWeb.Gerencia)" :key="index" v-show="index < 4">
                    <div class="inner-box team-inner-box" ref="team">
                        <!--Image Box-->
                        <div class="image-box">
                            <!--Image-->
                            <figure class="image">
                                <img :src="item.gr_foto.url" :alt="item.gr_cargo" />
                            </figure>
                            <!--Overlay Box-->
                            <div class="overlay-box">
                                <div class="inner">
                                    <!--Social Icon One-->
                                    <ul class="social-icon-one">
                                        <li><a class="flaticon-email" :href="`mailto: ${item.gr_correo}`"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!--Lower Content-->
                        <div class="lower-content">
                            <h5>{{item.gr_nombre}}</h5>
                            <div class="designation">{{item.gr_cargo}}</div>
                        </div>
                    </div>
                </div>
				
			</div>
		</div>
	</section>
	<!-- Fin Equipo Administrativo -->
	
	<!-- Clients Section -->
    <section class="clients-section" v-if="dbWeb.Anunciantes !== undefined">
		<!-- <button class="slider-button previous"></button>
		<button class="slider-button next" @click="carouselMoveLeft" id="next"></button> -->
		<div class="slider">
			<div class="clients-slider-container">
				<div v-for="(anunciante, index) in Object.values(dbWeb.Anunciantes)" :key="anunciante.anun_id" v-show="anunciante.anun_activo === true" class="clients-slider-items d-flex align-items-center justify-content-center" :id="`client0${index+1}`">
					<img class="clients-images"  :src="anunciante.anun_foto.url" @click="sendTo(`${anunciante.anun_url}`)" :title="anunciante.anun_nombre" alt="" loading="lazy">
				</div>
			</div>
		</div>
    </section>
    <!-- End Clients Section -->
	<div class="back-btn">
		<button @click="goToTop()" class="icon"><i class="flaticon-up-chevron"></i></button>
	</div>
	</div>
<!--End pagewrapper-->
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import AutogestionSpan from '@/components/AutogestionSpan.vue'

  export default {
	  name: 'HomePage',
	  components: {
		AutogestionSpan,
	  },
  	data(){
	  	return{
			dataAdmis: [],
        	showSelect: false,
			number: 0,
			numElements: 4,
			showIndex: 0,
			bannersList: [],
			currentIndex: 1,
			distCuotas: [],
			responsive:[
				{breakpoint:{width:0, items:1}},
				{breakpoint:{width:600, items:2}},
				{breakpoint:{width:1000, items:4}},
			],
	  	}
	  },
	computed:{
		...mapState(['dbWeb']),
        reverseArray(){
            if(this.dbWeb.Noticias !== undefined){
            let array = Object.values(this.dbWeb.Noticias);
            return array.reverse()
            }else{
            let array = []
            return array
            }
		},
		selectCuotas(){
			if(this.dbWeb.Secciones_Extra !== undefined){
				for(let i = 0; i < Object.values(this.dbWeb.Secciones_Extra).length; i++){
					if(Object.values(this.dbWeb.Secciones_Extra)[i].sec_nombre.toLowerCase() === "distribución de cuotas mensuales"){
						this.distCuotas = Object.values(this.dbWeb.Secciones_Extra)[i];
						return true;
					}
					return false;
				}
				return false;
			}
		},
		selectBanners(){
			if(this.dbWeb.Banners !== undefined){
				for(let i = 0; i < Object.values(this.dbWeb.Banners).length; i++){
					if(Object.values(this.dbWeb.Banners)[i].bann_seccion.toLowerCase() === "inicio"){
						this.bannersList.push(Object.values(this.dbWeb.Banners)[i]);
						return true;
					}
					return false;
				}
				return false;
			}
		}
	},
  	methods: {
		...mapMutations(['selectItemSelect']),
		goToTop(){
			window.scrollTo(0, 0);
		},
	    clientSliderItems(responsive, items){
	  	    for(let i=0; i < responsive.length; i++){
	  		    if(window.innerWidth>responsive[i].breakpoint.width){
	  			  items=responsive[i].breakpoint.items
	  	  		}	
	  		}
	  		return items
	  	},
	  	clientSliderItemsWidth(items, boxes, containerWidth, marginItems){
	  		let allBoxes = 0;
	  		for(let i=0; i<boxes.length; i++){
	  			allBoxes = containerWidth/items - 2*marginItems;
	  		}
	  		return allBoxes
		},
		sendTo(url){
			window.open(`${url}`, '_blank');
		},
		getIdInfo(area, val, rel){
			for(let i = 0; i < Object.values(this.dbWeb[area]).length; i++){
				if(Object.values(this.dbWeb[area])[i][`${val}`] === rel){
					return Object.values(this.dbWeb[area])[i];
				}
			}
		},
		iconSelect(index){
			if(this.reverseArray[index].noti_seccion === 'Comité de Tenis'){
				return 'flaticon-racket-and-tennis-ball'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Alimentos y Bebidas'){
				return 'flaticon-restaurant'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Gimnasio'){
				return 'flaticon-barbell'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Admisión'){
				return 'flaticon-lista-de-verificacion'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Artes Marciales'){
				return 'flaticon-martial-arts'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Comunicaciones'){
				return 'flaticon-megafono'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Cultura'){
				return 'flaticon-mascaras-felices-y-tristes'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Dominó'){
				return 'flaticon-domino'
			}else if(this.reverseArray[index].noti_seccion === 'Comité Juvenil'){
				return 'flaticon-chico'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Bailoterapia'){
				return 'flaticon-baile'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Natación'){
				return 'flaticon-swimming'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Squash'){
				return 'flaticon-squash-rackets'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Guardería'){
				return 'flaticon-chupete'
			}else if(this.reverseArray[index].noti_seccion === 'Comité Social'){
				return 'flaticon-asistencia-social'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de TRX'){
				return 'flaticon-suspension'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Infraestructura'){
				return 'flaticon-edificio'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Finanzas'){
				return 'flaticon-ahorrar-dinero'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Reforma de Estatutos'){
				return 'flaticon-libro-de-leyes'
			}else if(this.reverseArray[index].noti_seccion === 'Comité de Tribunal Disciplinario'){
				return 'flaticon-subasta'
			}else{
				return ''
			}
		},
		calcTime(val){
			const p = new Date(val);
			const pSplitted = p.toString().split(' ');
			let mm = '';
			if(pSplitted[1] === "Jan"){
				mm = "01";
			}else if(pSplitted[1] === "Feb"){
				mm = "02";
			}else if(pSplitted[1] === "Mar"){
				mm = "03";
			}else if(pSplitted[1] === "Apr"){
				mm = "04";
			}else if(pSplitted[1] === "May"){
				mm = "05";
			}else if(pSplitted[1] === "Jun"){
				mm = "06";
			}else if(pSplitted[1] === "Jul"){
				mm = "07";
			}else if(pSplitted[1] === "Ago"){
				mm = "08";
			}else if(pSplitted[1] === "Sep"){
				mm = "09";
			}else if(pSplitted[1] === "Oct"){
				mm = "10";
			}else if(pSplitted[1] === "Nov"){
				mm = "11";
			}else if(pSplitted[1] === "Dic"){
				mm = "12";
			}

			return `${pSplitted[2]}/${mm}/${pSplitted[3]}`
		},
		selectAnun(val){
			this.selectItemSelect(val)
			this.$router.push({name:'Actualidad'})
		},
		translateRight(){
			if(this.currentIndex <= this.maxShowNoti*((this.$refs.innerContainer.children.length/this.maxShowNoti)-1)){
				this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) - 45}px)`
				this.currentIndex ++;
			}
		},
		translateLeft(){
			if(this.currentIndex > 1){
				this.$refs.innerContainer.style.transform = `translateX(${parseFloat(this.$refs.innerContainer.style.transform.split('(')[1].split(')')[0]) + 45}px)`
				this.currentIndex --;
			}
		},
		changeIndex(val){
			this.$refs.anuncios.forEach(element => {
				element.dataset.transitioned = 'true';
				element.classList.toggle('translate');
			})
			setTimeout(() => {
				this.showIndex = this.numElements*(val-1);
			}, 700);
			setTimeout(() => {
				location.href = "#beforeNoti";
				this.$refs.anuncios.forEach(element => {
				element.dataset.transitioned = 'false';
				element.classList.toggle('translate');
				})
			}, 800);
			this.$refs.innerContainer.children.forEach(element => {
				if(parseInt(element.children[0].id) !== val){
				element.children[0].classList.remove('active');
				}else if(parseInt(element.children[0].id) === val){
				element.children[0].classList.add('active');
				}
			})
		},
		selectAdmins(){
			for(let i = 0; i < Object.values(this.dbWeb.Comites).length; i++){
				if(Object.values(this.dbWeb.Comites)[i].comi_nombre === "Comité de Admisión"){
					this.selectItemSelect(i)
					this.$router.push({name:'Comites'})
				}
			}
		},
		selectComi(val){
			this.selectItemSelect(val)
			this.$router.push({name:'Comites'})
		},
	},
	
	mounted() {
	/** 
	========================================
	Data y Observers
	========================================
	**/

	if(this.reverseArray !== undefined && this.reverseArray.length/this.numElements > 1){
      this.number = Math.ceil(this.reverseArray.length/this.numElements);
      this.showSelect = true;
	}

	this.$nextTick(() =>{
		
		if(this.$refs.carouselitems !== undefined){
			
			/* Textos del banner */

			const carouseli = this.$refs.carouselitems;
			
			carouseli.forEach(item => {
				if(item.classList.contains('active')){
					item.children[1].classList.add('toggle-mheight-opacity');
				}
			})

			
			carouseli[0].addEventListener("transitionend", ()=> {
				carouseli.forEach(item => {
					if(item.classList.contains('active')){
						item.children[1].classList.add('toggle-mheight-opacity');
					}else{
						item.children[1].classList.remove('toggle-mheight-opacity');
					}
				})
			})
		}
		
	})

	const distcuot = setInterval(() => {

		/* Dist Cuotas */
		if(this.$refs.progressbar !== undefined){
			const barras = this.$refs.progressbar;
			
			const options = { 
				root: null,
				threshold: 0,
				rootMargin: "150px",
			};
		
			const observer = new IntersectionObserver(function(entries,observer) {
				entries.forEach(entry =>{
					setTimeout(() => {
						if(!entry.isIntersecting){
							return;
						}
						entry.target.style.width = `${entry.target.dataset.progress}%`;
					}, 500);
				})
			}, options)
		
			barras.forEach(item =>{
				observer.observe(item)
			})

			clearInterval(distcuot)
		}
		
	}, 100);

	var waiting = setInterval(() => {

		if(this.$refs.team !== undefined ){

			/* Equipo de trabajo */

			/* Data */
			this.dataAdmis = this.getIdInfo('Comites', 'comi_nombre', 'Comité de Admisión')


			/* Observers */
			const teamMembers = this.$refs.team
			
			const options = { 
				root: null,
				threshold: 0,
				rootMargin: "150px",
			};
		
			const observer = new IntersectionObserver(function(entries,observer) {
				entries.forEach(entry =>{
					setTimeout(() => {
						if(!entry.isIntersecting){
							return;
						}
						entry.target.style.zIndex = 1;
						entry.target.style.opacity = 1;
						entry.target.classList.add("fadeInLeft");
					}, 500);
				})
			}, options)
		
			teamMembers.forEach(item =>{
				observer.observe(item)
			})
			clearInterval(waiting)
		}
	}, 100);

	/** 
	========================================
	Banner Clientes 
	========================================
	**/
	  	const allContainer = document.querySelector('.clients-section');
		let container = document.querySelector('.clients-slider-container');
	  	let containerWidth = container.offsetWidth;
		let allItems = document.querySelectorAll('.clients-slider-items');
		let allItemsRef = document.querySelectorAll('.clients-slider-items');

		/* Para el responsive */
		let items = 0;
		/* Para el movimiento */
		let index = 1;
		const interval = 2000;
		let itemId;
		/* Para el tamaño */
		const marginItems = 10;

		/* Numero de items mostrados en el slider de clientes "Responsive" */
		items = this.clientSliderItems(this.responsive, items);
	  	

	  	/* Colocando el tamaño de las cajas de los clientes */
		  let allItemsWidth = this.clientSliderItemsWidth(items, allItems, containerWidth, marginItems);
	  	for(let i=0; i < allItems.length; i++){
	  		allItems[i].style.minWidth = allItemsWidth  + "px";
			allItems[i].style.maxWidth = allItemsWidth  + "px";
	  		allItems[i].style.margin = `0px ${marginItems}px`;
	  	}

	  	/* Movimiento automatico slider clientes */
	  	let firstClone = [];

		/* Clonando el primer y ultimo slider */

	  	if(items === 4){
	  		for(let i=0; i<items; i++){
				  firstClone[i] = allItems[i].cloneNode(true);
	  		}
	  		firstClone[3].id = 'last-first-clone';
	  		for(let i=0; i<items; i++){
	  			container.append(firstClone[i]);
	  		}
	  	}else if(items === 2){
	  		for(let i=0; i<items; i++){
				  firstClone[i] = allItems[i].cloneNode(true);
	  		}
	  		firstClone[1].id = 'last-first-clone';
	  		for(let i=0; i<items; i++){
	  			container.append(firstClone[i]);
	  		}
	  	}else {
			firstClone = allItems[0].cloneNode(true);
	  		firstClone.id = 'last-first-clone';
	  		container.append(firstClone);
	  	}
  
	  	let lastClone = allItems[allItems.length - 1].cloneNode(true);
  
	  	lastClone.id = 'last-clone';

	  	container.prepend(lastClone);

		container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`
		

		/* Comenzando el movimiento */

		container.addEventListener('transitionend', ()=>{
			allItemsRef = document.querySelectorAll('.clients-slider-items');
			if(index > allItemsRef.length -1){
				index = 1;
			}
			if(items === 4){
				if (allItemsRef[index+3] === undefined || allItemsRef[index+2] === undefined || allItemsRef[index+1] === undefined || allItemsRef[index] === undefined || allItemsRef[index+3].id === 'last-first-clone' && allItemsRef[index+3] !== undefined) {
					container.style.transition = 'none';
					index = 1;
					container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
				}else{
				}
			}else if(items === 2){
				if (allItemsRef[index+1] === undefined || allItemsRef[index] === undefined || allItemsRef[index+1].id === 'last-first-clone' && allItemsRef[index+1] !== undefined) {
					container.style.transition = 'none';
					index = 1;
					container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
				}else{
				}
			}else {
				if (allItemsRef[index] === undefined || allItemsRef[index].id === 'last-first-clone' && allItemsRef[index] !== undefined) {
					container.style.transition = 'none';
					index = 1;
					container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
				}else{
				}
			}
		})

		const startSlide = () => {
	  	itemId = setInterval(() => {
			allItemsRef = document.querySelectorAll('.clients-slider-items');
	  		if(allItemsRef[index] === undefined || index >= allItemsRef.length -1){
	  			index = 1;
	  		}
			  index++;
			try{
	  		container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
	  		container.style.transition = '1s ease-out'}catch{
				  index = 1;
			  }
	  	}, interval);
		};
		
		window.addEventListener('resize', ()=>{

			let homeLink = document.getElementById('home-page')

			if(homeLink.classList.contains('router-link-active')){
				if(container.children.length === allItems.length + 5){
					container.removeChild(container.firstChild)
					for(let i = 0; i < 4; i++){
						container.removeChild(container.lastChild)
					}
				}else if(container.children.length === allItems.length + 3){
					container.removeChild(container.firstChild)
					for(let i = 0; i < 2; i++){
						container.removeChild(container.lastChild)
					}
				}else {
					container.removeChild(container.firstChild)
					for(let i = 0; i < 1; i++){
						container.removeChild(container.lastChild)
					}
				}
				containerWidth = container.offsetWidth;
				items = this.clientSliderItems(this.responsive, items);
				index = 1;

				allItemsWidth = this.clientSliderItemsWidth(items, allItems, containerWidth, marginItems);
					for(let i=0; i < allItems.length; i++){
						allItems[i].style.minWidth = allItemsWidth  + "px";
						allItems[i].style.maxWidth = allItemsWidth  + "px";
						allItems[i].style.margin = `0px ${marginItems}px`;
					}

				let firstClone = [''];

				if(items === 4){
					for(let i=0; i<items; i++){
						firstClone[i] = allItems[i].cloneNode(true);
					}
					firstClone[3].id = 'last-first-clone';
					for(let i=0; i<items; i++){
						container.append(firstClone[i]);
					}
				}else if(items === 2){
					for(let i=0; i<items; i++){
						firstClone[i] = allItems[i].cloneNode(true);
					}
					firstClone[1].id = 'last-first-clone';
					for(let i=0; i<items; i++){
						container.append(firstClone[i]);
					}
				}else {
					firstClone = allItems[0].cloneNode(true);
					firstClone.id = 'last-first-clone';
					container.append(firstClone);
				}

				lastClone = ['']

				lastClone = allItems[allItems.length - 1].cloneNode(true);
	
				lastClone.id = 'last-clone';

				container.prepend(lastClone);
			}
		})
	  	allContainer.addEventListener('mouseenter', ()=>{
	  		clearInterval(itemId)
	  	})

	  	allContainer.addEventListener('mouseleave', startSlide)

	  	startSlide()
		},
  }
</script>