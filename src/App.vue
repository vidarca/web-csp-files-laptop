<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg" style="height:10vh;">
      <div class="d-flex flex-row" style="">
        <img src="@/assets/logo_215x60.png" width="80" height="80" alt="" loading="lazy">
        <p class="m-0" style="font-size: 30px; color:#09197d;">Club Santa Paula</p>
      </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link style="color:black" class="nav-link" :to="{name:'Home'}" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link style="color:black" class="nav-link" :to="{name:'Nosotros'}">Nosotros</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

    <router-view/>
  </div>
</template>

<style>

@import './assets/css/style.css';
@import './assets/css/animate.css';
</style>
