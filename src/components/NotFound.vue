<template>
    <div class="text-center   not-page">
      <h1 class="tex_404">404 </h1>
        <h3>Not found</h3>
        <p class="text-center text-muted" style="width: 19%;">The page you're trying to access
          could not be found</p>
          <router-link  to="/home">
        <button class="btn btn-dark"><b-icon icon="arrow-left" aria-hidden="true" class="icon"></b-icon> Back to home </button></router-link>
    </div>
</template>
<style>
.tex_404{
  font-weight: 600;
  font-size: 80px;
}
.not-page {
  height: 100vh; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
}
</style>