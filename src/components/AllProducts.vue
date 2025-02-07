<template>
    <div class="container-fluid ">
        <h1 class="text-center text-color mt-3 fw-bold">Best Sellers</h1>
        <div class="row">
            <div class="page-left-side col-md-3">

                <div class="">
                    <h2 class="px-md-5 text-color fw-bold">Categories</h2>
                    <ul
                        class="list-unstyled px-md-5 px-1 fs-md-3 fs-4 py-3  d-flex flex-md-column flex-row gap-md-0 gap-3 flex-wrap">
                        <li class="py-2 py-md-3" >
                             <span class="d" @click="ChangeRoutes()"> <router-link class="router_Links" :class="{ active: activeItem === 'Bats' }"
                                :to="{ path: '/products/bats' }">Cricket Bats</router-link></span>
                        </li>
                        <li class="py-2 py-md-3">
                            <span class="d" @click="ChangeRoutes()">
                            <router-link class="router_Links" :class="{ active: activeItem === 'Ball' }"
                                :to="{ path: '/products/balls' }">Cricket Balls</router-link></span>

                        </li>
                        <li class="py-2 py-md-3" >
                            <span class="d" @click="ChangeRoutes()">
                            <router-link class="router_Links" :class="{ active: activeItem === 'Kits' }"
                                :to="{ path: '/products/kits' }"> Complete Kits</router-link></span>

                        </li>
                        <li class="py-2 py-md-3" >
                            <span class="d" @click="ChangeRoutes()">
                            <router-link class="router_Links" :class="{ active: activeItem === 'Shoes' }"
                                :to="{ path: '/products/shoes' }"> Cricket Shoes</router-link></span>
                        </li>
                        <li class="py-2 py-md-3">
                            <span class="d" @click="ChangeRoutes()">
                            <router-link class="router_Links" :class="{ active: activeItem === 'Parts' }"
                                :to="{ path: '/products/accessories' }"> Cricket Accessories</router-link></span>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="page-right-side col-md-9 mt-3">
                <VueSlickCarousel v-bind="settings">
                    <div v-for="(image, index) in images" :key="index">
                        <div class=" overflow-hidden position-relative">
                            <img :src="image" class=" h-100  " alt="" width="95%">
                            <div class=" image-container"></div>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>

        </div>
        <div class="" v-if="!isLoading">
            <div class="text-center my-2">
                <h2 class="text-center text-color mt-3 fw-bold heading-with-line">{{ headText }}</h2>
            </div>
            <div class="row px-5 mb-5">
                <div class="col-md-6 col-lg-3 col-12 my-3" v-for="post in posts" :key="post.id">
                    <div class="card position-relative " @click="QuickView(post)">
                        <div class="card-body d-flex justify-content-center align-items-center">
                            <img :src="`/${post.image}`" alt="No Image" class="w-75 ">
                        </div>

                        <div class="info-container d-flex justify-content-center align-items-center ">
                            <div class="d-flex justify-content-center align-items-center gap-3" v-if="post.loading ">
                                <div class="spinner-border" style="height:40px; width:40px" role="status"></div>
                                <div>Loading...</div>
                            </div>
                        </div>

                    </div>
                    <div class="d-md-flex justify-content-between  text-center flex-column  mt-3">
                        <h5 class="text-muted"><strong>{{ post.name }}</strong></h5>
                        <div>
                            <h5><strong>Rs.{{ post.price }}</strong></h5>
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
import VueSlickCarousel from 'vue-slick-carousel'
import QuickView from './QuickView.vue';
import axios from 'axios';
export default {
    components: {
        QuickView,
        VueSlickCarousel
    },
    props: ["id"],
    data() {
        return {
            posts: [],
            isLoading: false,
            loader: false,
            activeItem: '',
            headText: 'All Products',

            images: [
                'https://thecasports.com/images/blogs/english-willow-bat.jpg',
                'https://thecasports.com/images/blogs/3d-tile.jpg',
                'https://thecasports.com/images/blogs/caproblog-howtochoosebatsandgloveswisely.jpg',
                'https://thecasports.com/images/blogs/caproblog-oldestbrand.jpg',
                'https://thecasports.com/images/blogs/Bat-care.jpg',
                'https://thecasports.com/images/blogs/Q.jpg',
                'https://thecasports.com/images/blogs/caproblog-batcaring.jpg',
            ],
            settings: {
                "arrows": false,
                "dots": false,
                "infinite": true,
                "slidesToShow": 3,
                "slidesToScroll": 1,
                "autoplay": true,
                "speed": 5000,
                "autoplaySpeed": 5000,
                "cssEase": "linear",
                "responsive": [
                    {
                        "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 3,
                            "infinite": true,
                            "dots": false
                        }
                    },
                    {
                        "breakpoint": 600,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 2,
                            "initialSlide": 2
                        }
                    },
                    {
                        "breakpoint": 480,
                        "settings": {
                            "slidesToShow": 1,
                            "slidesToScroll": 1
                        }
                    }]
            },
        }

    },
    computed: {

    },
    methods: {
 
        async fetchCategory(item, apiField, headText) {
    this.posts = [];
    this.headText = headText;
    this.activeItem = item;
    this.isLoading = true;
    
    try {
        const response = await axios.get('/db.json');
        this.posts = response.data[apiField];
    } catch (error) {
        console.error(`Error fetching ${headText}:`, error);
    } finally {
        this.isLoading = false;
    }
},

        // All
        QuickView(post) {
            this.$set(post, 'loading', true); // Ensure reactivity
      setTimeout(() => {
        this.$refs.openModal.openModal(post.id);
        this.$set(post, 'loading', false); // Ensure reactivity
      }, 1000);
    },
        async AllProducts() {
            this.isLoading = true;
            try {
                const response = await axios.get('/db.json');
                this.posts = [
                    ...new Set([
                        ...response.data.cricketBats,
                        ...response.data.balls,
                        ...response.data.shoes,
                        ...response.data.parts,
                        ...response.data.kits,
                    ])].map(post => ({
          ...post,
          loading: false
        }));
            } catch (error) {
                console.error('Error fetching all products:', error);
            } finally {
                this.isLoading = false;
            }
        },

        ChangeRoutes() {
            if (this.id == 'bats') {
                this.fetchCategory('Bats', 'cricketBats', 'Cricket Bats')
            }
            else if (this.id == 'balls') { this.fetchCategory('Ball', 'balls', 'Cricket Balls') }
            else if (this.id == 'kits') { this.fetchCategory('Kits', 'kits', 'Complete Kits') }
            else if (this.id == 'shoes') { this.fetchCategory('Shoes', 'shoes', 'Cricket Shoes') }
            else if (this.id == 'accessories') { this.fetchCategory('Parts', 'parts', 'Cricket Accessories') }
            else
                this.AllProducts();
        }
    },

    mounted() {
        this.ChangeRoutes();
    }

}
</script>

<style>
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

.card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.card:hover .info-container {
    transform: translateY(0);
    opacity: 0.7;

}

.heading-with-line {
    position: relative;
    display: inline-block;
}

.heading-with-line::after {
    content: "";
    display: block;
    width: 50%;
    height: 3px;
    background-color: red;
    margin: 5px auto 0;
    position: absolute;
    bottom: -10px;
    left: 25%;
}

.router_Links {
    text-decoration: none;
    color: #000;
}

.router_Links:hover {
    cursor: pointer;
    color: red;
}

.active {
    color: red;
    font-weight: bold;
}

.loader-container {
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.scroll-container {
    height: 118px;
    overflow-x: hidden;
    overflow-y: auto;
}

.flex-container {
    display: flex;
    align-items: center;
}

.overflow-hidden:hover .image-container {
    transform: translateY(0);
    opacity: 0.7;
}

.image-container {
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 95%;
    background: rgba(226, 136, 136, 0.9);
    color: #151515;
    padding: 10px;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.7s ease, opacity 0.3s ease;
}

.text-color {
    color: #151515;
}
</style>