<template>
  <div class="home" id="home">

    <div class="page-wrapper">

      	<!-- Banner con bootstrap -->
		<section class="banner-section">
			<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="@/assets/images/background/BannerSlide01.jpg" alt="...">
				</div>
				<div class="carousel-item">
					<img src="@/assets/images/background/BannerSlide01.jpg" class="d-block w-100" alt="...">
				</div>
				<div class="carousel-item">
					<img src="@/assets/images/background/BannerSlide01.jpg" class="d-block w-100" alt="...">
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
				
				<div class="clearfix row m-auto" style="width:100%">
					
					<!-- Featured Block -->
					<div class="featured-block col-lg-4	col-md-6 col-sm-12">
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
					<div class="featured-block col-lg-4 col-md-6 col-sm-12" id="second-featured">
						<div class="inner-box">
							<div class="content">
								<div class="icon-box">
									<span class="icon flaticon-key"></span>
								</div>
								<h5><a href="http://clubsantapaula.dyndns.org:1081/user/auth/login">Autogestión</a></h5>
							</div>
						</div>
					</div>
					
					<!-- Featured Block -->
					<div class="featured-block col-lg-4 col-md-6 col-sm-12">
						<div class="inner-box">
							<div class="content">
								<div class="icon-box">
									<span class="icon flaticon-newspaper"></span>
								</div>
								<h5><a href="#">Systems</a></h5>
							</div>
						</div>
					</div>
					
				</div>
				
			</div>
		</div>
	</section>
	<!-- Seccion Destacados -->
	
	<!-- Seccion de Actualidad -->
	<section class="premium-section">
		<div class="pattern-layer"></div>
		<div class="auto-wrapper">
			<!-- Titulo de seccion -->
			<div class="sec-title centered">
				<div class="icon">
					<img src="assets/images/icons/separater.png" alt="" />
				</div>
				<h2>Eventos y Noticias</h2>
				<div class="text">Entérate de los últimos eventos y noticias <br> de nuestro Club Santa Paula</div>
			</div>
			
			<div class="row clearfix">
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-cctv"></div>
								<h5><a href="service-detail">CCTV Cameras</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-lcd"></div>
								<h5><a href="service-detail">Theft Protection</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-alarm-1"></div>
								<h5><a href="service-detail">Fire Alarm Systems</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-keyboard"></div>
								<h5><a href="service-detail">Touchscreen Keypads</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-bell"></div>
								<h5><a href="service-detail">Doorbell Cameras</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de Notica -->
				<div class="security-block col-lg-4 col-md-6 col-sm-12">
					<div class="inner-box">
						<div class="image">
							<a href="service-detail"><img src="https://via.placeholder.com/360x260" alt="" /></a>
						</div>
						<div class="lower-content">
							<div class="hover-bg-color"></div>
							<div class="upper-box">
								<div class="icon flaticon-telephone-1"></div>
								<h5><a href="service-detail">Home Automation</a></h5>
							</div>
							<div class="text">Corem ipsum dolor sit amet consec exea dolore fugiatmagna exerd coas</div>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
	</section>
	<!-- Fin Seccion Actualidad -->

	<!-- Seccion de Autogestion -->
		<AutogestionSpan></AutogestionSpan>
	<!-- Fin Seccion Autogestion -->
	
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
										<h4><a href="gallery.html">{{dataAdmis.comi_nombre}}</a></h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Bloque de comite -->
				<div  v-for="element in this.dbWeb.Comites" :key="element.id" v-show="element.comi_int === true" class="gallery-block col-lg-4 col-md-6 col-sm-12">
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
										<h4><a href="gallery.html">{{element.comi_nombre}}</a></h4>
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
	
	<!-- Seccion Distribucion de Cuotas -->
    <section class="cuot-section">
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
				<h2>Distribución de las Cuotas Mensuales</h2>
				<div class="text">¿Quieres saber en qué se ha utilizado las cuotas mensuales? <br> Aquí te lo mostramos</div>
				<!-- Barras % -->
				<!-- Barra 1 -->
				<div class="cuot-porc">
					<div class="row row-cols-1 m-0">
						<div class="cuot-porc-text d-flex">
							<div class="flex-grow-1">Eventos internos</div>
							<div>50%</div>
						</div>
						<div class="progress" style="background-color: rgba(255,255,255,0.25); height: 15px;">
							<div class="progress-bar" role="progressbar" style="width: 50%; background-color: rgba(255,255,255,0.8)" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
				<!-- Barra 2 -->
				<div class="cuot-porc">
					<div class="row row-cols-1 m-0">
						<div class="cuot-porc-text d-flex">
							<div class="flex-grow-1">Remodelación de los Baños</div>
							<div>20%</div>
						</div>
						<div class="progress" style="background-color: rgba(255,255,255,0.25); height: 15px;">
							<div class="progress-bar" role="progressbar" style="width: 20%; background-color: rgba(255,255,255,0.8)" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
				<!-- Barra 3 -->
				<div class="cuot-porc">
					<div class="row row-cols-1 m-0">
						<div class="cuot-porc-text d-flex">
							<div class="flex-grow-1">Arreglo del Parque Infantil</div>
							<div>20%</div>
						</div>
						<div class="progress" style="background-color: rgba(255,255,255,0.25); height: 15px;">
							<div class="progress-bar" role="progressbar" style="width: 20%; background-color: rgba(255,255,255,0.8)" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
				<!-- Barra 4 -->
				<div class="cuot-porc">
					<div class="row row-cols-1 m-0">
						<div class="cuot-porc-text d-flex">
							<div class="flex-grow-1">Otros</div>
							<div>10%</div>
						</div>
						<div class="progress" style="background-color: rgba(255,255,255,0.25); height: 15px;">
							<div class="progress-bar" role="progressbar" style="width: 10%; background-color: rgba(255,255,255,0.8)" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cout-image-container">

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
				<div v-for="(anunciante, index) in Object.values(dbWeb.Anunciantes)" :key="anunciante.anun_id" v-if="anunciante.anun_activo === true" class="clients-slider-items d-flex align-items-center justify-content-center" :id="`client0${index+1}`">
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
import {mapState} from 'vuex'
import AutogestionSpan from '@/components/AutogestionSpan.vue'

  export default {
	  name: 'HomePage',
	  components: {
		AutogestionSpan,
	  },
  	data(){
	  	return{
			dataAdmis: [],
			responsive:[
				{breakpoint:{width:0, items:1}},
				{breakpoint:{width:600, items:2}},
				{breakpoint:{width:1000, items:4}},
			],
	  	}
	  },
	computed:{
		...mapState(['dbWeb'])
	},
  	methods: {
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
		}
	  },
	mounted() {
	/** 
	========================================
	Data y Observers
	========================================
	**/

	var waiting = setInterval(() => {
		if(this.$refs.team !== undefined ){
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
				if (allItemsRef[index+3].id === 'last-first-clone' && allItemsRef[index+3] !== undefined) {
					container.style.transition = 'none';
					index = 1;
					container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
				}else{
				}
			}else if(items === 2){
				if (allItemsRef[index+1].id === 'last-first-clone' && allItemsRef[index+1] !== undefined) {
					container.style.transition = 'none';
					index = 1;
					container.style.transform = `translateX(${-(allItemsWidth + marginItems * 2) * index}px)`;
				}else{
				}
			}else {
				if (allItemsRef[index].id === 'last-first-clone' && allItemsRef[index] !== undefined) {
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