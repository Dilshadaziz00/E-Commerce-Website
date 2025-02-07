<template>
  <div class=" ">
    <div class="container-fluid  overflow-hidden p-0" v-if="!isLoading">

      <div class="">
        <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade img-width="1024" img-height="480">
          <b-carousel-slide img-src="images\ca-pro-banner.jpg"></b-carousel-slide>
          <b-carousel-slide img-src="images\thecamain.webp"></b-carousel-slide>
          <b-carousel-slide img-src="images\ca-pro-main-banner.webp"></b-carousel-slide>
        </b-carousel>
      </div>

      <div class="row my-5 px-2 px-md-5 ">
        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class=" w-100 h-100  zoom-image" src="images/CricketBat.png" alt="Cricket Bat">
          </div>
        </div>

        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class="w-100 h-100 zoom-image" src="images/CricketShoes.png" alt="">
          </div>
        </div>
        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class="w-100 h-100 zoom-image" src="images/all.png" alt="">
          </div>
        </div>
        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class="w-100 h-100 zoom-image" src="images/Gears.png" alt="">
          </div>
        </div>
        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class="w-100 h-100 zoom-image" src="images/CountTap.png" alt="">
          </div>
        </div>
        <div class="col-6 col-lg-4 col-md-6 mb-4">
          <div class="overflow-hidden ">
            <img class="w-100 h-100 zoom-image" src="images/Bages.png" alt="">
          </div>
        </div>
      </div>


      <div class="">
        <h1 class="text-center text-color fw-bold ">All Collection</h1>
      </div>
      <!-- Fetched data -->
      <div class="row px-5 mb-5">
        <div class="col-12 col-md-6 col-lg-3  my-3" v-for="post in posts" :key="post.id">
          <div class="card position-relative " @click="QuickView(post)">
            <div class="card-body d-flex justify-content-center align-items-center">
              <img :src="post.image" alt="No Image" class="w-75 ">
            </div>

            <div class="info-container d-flex justify-content-center align-items-center">
              <div class="d-flex justify-content-center align-items-center gap-3" v-if="post.loading">
                <div class="spinner-border" style="height:40px; width:40px" role="status"></div>
                <div>Loading...</div>
              </div>
            </div>


          </div>
          <div class="d-md-flex justify-content-between  text-center flex-column  mt-3">
            <h5 class="text-muted"><strong>{{ post.name }}</strong></h5>
            <div>
              <h5 class=""><strong>Rs.{{ post.price }}</strong></h5>
            </div>
          </div>
        </div>
      </div>

      <QuickView ref="openModal" />

    </div>
    <div class="" v-else>
      <div class="flex-container scroll-container loader-container">
        <div class="spinner-border" style="height:40px; width:40px" role="status"></div>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import QuickView from './QuickView.vue';
import axios from 'axios';

export default {

  components: {
    QuickView,
  },
  data() {
    return {
      disabled: false,
      loader: false,
      isLoading: true,
      posts: [],


    };
  },
  methods: {
    QuickView(post) {
      post.loading = true;
      setTimeout(() => {
        this.$refs.openModal.openModal(post.id);
        post.loading = false;
      }, 1000);
    },
    async fetchPosts() {
      try {
        const response = await axios.get('/db.json');
        this.posts = [...new Set([...response.data.cricketBats, ...response.data.balls])].map(post => ({
          ...post,
          loading: false
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        this.isLoading = false;
      }
    },

  },
  mounted() {
    setTimeout(() => {
      this.fetchPosts()
    }, 2000)
  }
};
</script>
<style scoped>
.loader-container {
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.scroll-container {
  height: 878px;
  overflow-x: hidden;
  overflow-y: auto;
}

.flex-container {
  display: flex;
  align-items: center;
}

:root {
  --accent: #0b9b8a;
}

body {
  overflow: hidden;
}



.zoom-image {
  transition: transform 0.3s ease;
}

.zoom-image:hover {
  transform: scale(1.1);
}

.main-images {
  text-align: center;
}

.hidden-radio {
  display: none;
}

.Shop_button {
  background-color: #000;
  color: #fff;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.size-label {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.size-label.selected {
  background-color: #0b9b8a;
  color: white;
}

.size-label:hover {
  background-color: #0b9b8a;

}
.add-to-cart-btn {
  background-color: #000;
  color: #fff;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  color: white;
  border: 1px solid #ccc;

}

.icon {
  float: right;
  cursor: pointer;
}

.text-color {
  color: #151515;
}

.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.info-container {
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(186, 192, 192, 0.9);
  color: #151515;
  padding: 10px;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.7s ease, opacity 0.3s ease;
}

.card:hover .info-container {
  transform: translateY(0);
  opacity: 0.7;

}
</style>