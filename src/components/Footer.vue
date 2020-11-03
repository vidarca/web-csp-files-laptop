<template>
    <div id="footer">
        <!-- Main Footer -->
    <footer class="main-footer overflow-hidden">
		<div class="auto-container overflow-hidden">
			<!-- Upper Box -->
			<div class="upper-box w-100 m-auto overflow-hidden pl-2 pr-2">
				<div class="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between w-100">
					<!-- Column -->
					<div class="col-12 col-md-5 text-left pr-2 pl-2">
						<div class="text text-justify">{{Object.values(dbWeb.Miscellaneous)[0].misc_direccion}}</div>
					</div>
					<!-- Column -->
					<div class="info-column col-12 col-md-7 p-0 m-0">
						<div class="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between">
							
							<!-- Contact Info Box -->
							<div class="d-flex flex-column align-items-center justify-content-center col-12 col-sm-4 p-3 p-sm-2 text text-center">
								¿Alguna pregunta?
								<div v-for="telefono in Object.values(dbWeb.Miscellaneous)[0].misc_telefonos" :key="telefono" class="w-100 text-center text">
									<a :href="`tel: ${telefono}`">{{telefono}}</a>
								</div>
							</div>
							
							<!-- Contact Info Box -->
							<div class="d-flex flex-column align-items-center justify-content-center col-12 col-sm-5 p-3 p-sm-2 text">
								Envíe un correo
								<div v-for="correo in Object.values(dbWeb.Miscellaneous)[0].misc_correos" :key="correo" class="w-100 text-center text">
									<a :href="`tel: ${correo}`">{{correo}}</a>
								</div>
							</div>
							
							<!-- Contact Info Box -->
							<div class="d-flex flex-column align-items-center justify-content-center col-12 col-sm-3 p-3 p-sm-2 text">
								Horario de atención
								<div class="w-100 text-center text">
									De {{Object.values(dbWeb.Miscellaneous)[0].misc_inicio}} a.m. a {{finhora(Object.values(dbWeb.Miscellaneous)[0].misc_fin)}} p.m.
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			
            <div class="widgets-section w-100 m-auto overflow-hidden pl-2 pr-2">
            	<div class="d-flex flex-row align-items-center flex-wrap justify-content-center">
                	
                    <div class="col-12 col-sm-12 col-md-4 d-flex flex-column align-items-center justify-content-center h-100">

						<div class="logo pt-2 pb-2">
							<a href="index.html"><img src="https://via.placeholder.com/215x60" alt="" /></a>
						</div>

						<div class="v-social-rightbox pt-2 pb-2">
							<div class="v-social-right-container">
								<div style="display: flex; flex-direction: row; justify-content: flex-start">
									<div class="item">
										<a title="Facebook" href="https://www.facebook.com/Club-Santa-Paula-298392530588034/?__xts__[0]=68.ARDBzo-RGGkBG2HPpJxccWxgxlyL6km99x7__SBWkgUw8LixjgDI87BzXrBlfzzPwketujNaMOOtnJ_LcI6IsbeBNexdENGbC22NGo_9Ga5Qh46R-LDTetq0ZQ76yXYJL2-Rk5nqGzKbdvsUZCvUYTa79WuvOCBENAGa8yRQrn3RVDM4GLNdYNFzXYW4mYt-nKcvYiijMYcbZ6crFI31Ik_xFwi4ZOinlQ-WEP5Nn9rj33YIFlr3J7SMPomlPCqtnVeLlMGMwSiS65efXlg6vFsszdJG5Ul2m-L5xsSwb7snaCKYkna9_7puGa91icoJW_xgigl55rjRp4kM8CRDRRI" target="blank" class="icon flaticon-facebook"></a>
									</div>
									<div class="item">
										<a title="Twitter" href="https://twitter.com/santapaulaclub?lang=es" target="blank" class="icon flaticon-twitter"></a>
									</div>
									<div class="item">
										<a title="Instagram" href="https://www.instagram.com/clubsantapaulaccs/?hl=es-la" target="blank" class="icon flaticon-instagram"></a>
									</div>
								</div>
							</div>       
							
							<div class="text pt-2 pb-2">
								© 2020 Club Social Santa Paula - Caracas
							</div>   
						</div>

					</div>

                    <div class="col-12 col-sm-6 col-md-4">
						<!-- Footer Column -->
						<div class="footer-widget links-widget">
							<h5 class="text-md-left text-center">Secciones principales</h5>
							<div class="d-flex flex-column align-items-md-start align-items-center justify-content-center">
								<router-link :to="{name:'Home'}" exact>Home</router-link>
								<router-link :to="{name:'Nosotros'}" exact>Nosotros</router-link>
								<router-link :to="{name:'Servicios'}" exact>Servicios</router-link>
								<router-link :to="{name:'Comites'}" exact>Comités</router-link>
								<router-link :to="{name:'Contacto'}" exact>Contacto</router-link>
							</div>
						</div>
					</div>
					
					<div class="col-12 col-sm-6 col-md-4">
						<div class="footer-widget links-widget">
							<h5 class="text-md-left text-center">Enlaces de interés</h5>
							<div class="d-flex flex-column align-items-md-start justify-content-center align-items-center">
								<a :href="Object.values(dbWeb.Miscellaneous)[0].misc_archivos.archivo1.url" target="blank">Estatutos</a>
							</div>
						</div>
					</div>

					<div class="col-12 pt-4" style="height:500px">
						<Googlemap></Googlemap>
					</div>
					
				</div>
			</div>
		</div>
	</footer>
	<!-- End Main Footer -->        
    </div>
</template>

<script>
import {mapState} from "vuex"
import Googlemap from "@/components/GoogleMap.vue"

    export default {
		name: 'Footer',

		components:{
			Googlemap,
		},
		
		computed:{
			...mapState(['dbWeb']),
		},

		methods:{
			finhora(val){

				let splitVal = val.split(':');
				let val1 = splitVal[0];

				if(parseInt(val1) > 12){
					let splitVal = val.split(':');
					let val1 = splitVal[0];
					splitVal[0] = parseInt(val1) - 12;

					const joinVal = splitVal.join(':');
					return joinVal
				}else{
					return val
				}
			}
		},
    }
</script>

<style scoped>
	.main-footer .text{
		color: white !important;
		font-size: 15px !important;
	}

	.main-footer a{
		color: white;
		-webkit-transition:all .4s ease;
		-ms-transition:all .4s ease;
		-o-transition:all .4s ease;
		-moz-transition:all .4s ease;
		transition:all .4s ease;
	}

	.main-footer a:hover{
		color: #FE5D25;
	}

	.v-social-header .v-social-rightbox{
		width: 100%;
	}

	.v-social-rightbox .v-social-right-container{
		width: 100%;
		height: 100%;
		display: flex;
		margin-left: auto;
		flex-direction:row;
		justify-content: center;
		align-items: center;
	}

	.v-social-rightbox .icon:before{
		height: 30px !important;
		width: 30px !important;
		font-size: 20px;
		line-height: 30px;
		text-align: center;
		padding: 5px;
		color: black;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		align-self: center;
		transition: all 0.5s;
	}

	.v-social-rightbox .icon:hover:before{
		color: white;
		background-color: #FE5D25;
	}

	.v-social-rightbox .item{
		padding: 0 5px;
	}
</style>