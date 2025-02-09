<template>
  <div style="margin-top: 140px;">
    <div v-if="ShowModal" class="modal-overlay" @click="ShowModal = false"></div>
    <div class="modalContainer py-3 " v-show="ShowModal" :class="{ 'modalContainer-width': fullPage }">
      <div class="w-100 bg-white  d-flex justify-content-between  px-3">
        <span>Shop Now</span>
        <div class="d-flex gap-5">
          <div>
            <span @click="toggleModalWidth">
              <i :class="fullPage ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'"
                :title="fullPage ? '' : ' '" style="cursor:pointer"></i>
            </span>
          </div>

          <div @click="ShowModal = false">
            <svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
              class="bi bi-x" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M1.646 1.646a.5.5 0 0 1 .708 0L8 7.293l5.646-5.647a.5.5 0 0 1 .708.708l-5.647 5.646 5.647 5.646a.5.5 0 0 1-.708.708L8 8.707l-5.646 5.647a.5.5 0 0 1-.708-.708l5.647-5.646-5.647-5.646a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      </div>
      <hr>
      <div class="main d-md-flex flex-column flex-md-row gap-5 px-3">
        <div class="d-flex flex-column w-100">
          <div class="card">
            <div class="card-body d-flex justify-content-center align-items-center">
              <img class="w-50 h-auto" :src="`/${mainImage}`" alt="">
            </div>
          </div>
          <div class="variant-images gap-1 d-flex mt-2 flex-wrap">
            <div class="card small-img" v-for="(image, index) in item.variantImages" :key="index"
              :class="{ 'selected': selectedImageIndex === index }">
              <div class="card-body" @click="ChangeImage(image.src, index)">
                <img class="w-100" :src="`/${image.src}`" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="child w-100 d-flex flex-column mt-3">
          <div>
            <h3><strong>{{ item.name }}</strong></h3>
          </div>
           <div class="d-flex gap-5">
            <div class="my-2">
              <h5 class="">
                <strong>Rs {{ item.price }}</strong>
              </h5>
            </div>
          </div>

          <div class="my-2">
            <h5><strong>Brand:</strong> {{ item.brand }}</h5>
          </div>
          <div class="my-2">
            <h5><strong>Weight:</strong> {{ item.weight }}</h5>
          </div>

          <h5><strong>Quantity</strong></h5>

          <div class="d-flex">
            <div class="mt-2" >
              <button class="btn quantity__button-items" @click="decrement()" :disabled="loader">-</button>
              <input type="text" v-model="counter" class="quantity__button-input" value="0" readonly />
              <button class="btn quantity__button-items" @click="increment()" :disabled="loader">+</button>
            </div>
          </div>


          <div class="w-100 mt-5">
            <button type="button" class="btn btn-dark w-100" @click="AddedToCart(item)">
              <span v-if="!loader">Add Cart</span>
              <div v-else class="spinner-border text-white" style="height: 15px; width: 15px" role="status"></div>
            </button>
          </div>
          <div class="mt-3">
            <strong>Description:</strong>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  components: {
  },
  inject: ['openSideCart'],
  props: [],


  data() {
    return {
      fullPage: false,
      loader: false,
      ShowModal: false,
      mainImage: null,
      selectedImageIndex: null,
      CartData: [],
      counter: 1,
      item: [],
      quantity: 1,


    }
  },
  computed: {

  },
  methods: {
    toggleModalWidth() {
      console.log("Hello");

      this.fullPage = !this.fullPage;
    },
    async fetchPost_By_id(id) {
      try {
        const response = await axios.get('/db.json');
        const combineData = [...new Set([...response.data.cricketBats, ...response.data.balls, ...response.data.kits, ...response.data.shoes, ...response.data.parts])];

        const product = combineData.find(item => item.id === id);

        if (product) {
          this.item = product;
          this.mainImage = product.image;
        } else {
          console.error(`Item with ID ${id} not found.`);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    },
    increment() {
      this.quantity += 1;
      this.counter++;
    },
    decrement() {
      if (this.counter < 2) {
        return;
      }
      this.quantity -= 1;
      this.counter--;

    },

    isItemsInCart() {
      const savedCart = localStorage.getItem('item');
      if (savedCart) {
        this.CartData = JSON.parse(savedCart);
      }
    },
    ...mapMutations(["setCartIcon"]),
    AddedToCart(post) {
      this.isItemsInCart();
      this.loader = true;
      setTimeout(() => {
        const existingItem = this.CartData.find(item => item.id === post.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.CartData.push({ ...post, quantity: this.quantity });
        }
        localStorage.setItem('item', JSON.stringify(this.CartData));
        this.setCartIcon(this.CartData)
        this.ShowModal = false;
        this.openSideCart();
        this.loader = false;
        this.counter = 1;
      }, 1500);
    },

    openModal(id) {
      this.ShowModal = true;
      this.fetchPost_By_id(id);
    },

    ChangeImage(imageSrc, index) {
      this.mainImage = imageSrc;
      this.selectedImageIndex = index;
    }

  },
  mounted() {

  }

}
</script>

<style scoped>
.selected {
  border: 2px solid red;
}

/* .main-image{
  min-height: 350px;
} */

.quantity__button-input {
  width: 31px;
  height: 20px;
  text-align: center;
  margin: 0 4px;
  font-size: 16px;
  border: none;
  outline: none;

}

.quantity__button-items {
  background-color: #000;
  border-radius: 60%;
  color: #fff;
  border: none;
  padding: 0px 8px;
  cursor: pointer;
  box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.1);
}

.hidden-radio {
  display: none;
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
  background-color: #151515;
  color: white;
}

.size-label:hover {
  background-color: #151515;
  color: #fff
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.main::-webkit-scrollbar {
  width: 8px;
}

.main::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.main::-webkit-scrollbar-thumb:hover {
  background: #555;

}

.modalContainer-width {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0px !important;
}
@media (max-width: 480px) {
  .modalContainer {
    height: 100% !important;
    width: 100% !important;
  }
}

.modalContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  /* max-width: 900px; */
  background-color: #fff;
  border-radius: 8px;
  z-index: 11;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 96vh;
  overflow: hidden;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  /* max-height: calc(100vh - 130px); */
  height: 100vh;
}

.Footer {

  background-color: #fff;
  border-top: 1px solid #ddd;
}

.small-img {
  width: 90px;
}
</style>
