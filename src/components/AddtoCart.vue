<template>
    <div>
        <!-- Modal Overlay -->
        <div v-if="isAddCartOpen" class="modal-overlay" @click="isAddCartOpen = false"></div>
        
        <!-- Add Cart Sidebar -->
        <div :class="['AddCart', { 'is-open': isAddCartOpen }]">
            
            <!-- Header -->
            <div class="w-100 py-3 d-flex justify-content-between px-3">
                <h5>Your Cart <span>( {{ localData.length }} items )</span></h5>
                <header>
                    <div @click="isAddCartOpen = false" style="cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 1 .708 0L8 7.293l5.646-5.647a.5.5 0 0 1 .708.708l-5.647 5.646 5.647 5.646a.5.5 0 0 1-.708.708L8 8.707l-5.646 5.647a.5.5 0 0 1-.708-.708l5.647-5.646-5.647-5.646a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </header>
            </div>
            <!-- Cart Items -->
             <!-- Cart Content -->
             <div class="d-flex flex-column justify-content-between h-100" v-if="localData.length > 0">
                
                <!-- Cart Items -->
                <div class="scrollable flex-grow-1  px-2">
                    <div class="d-flex flex-column mb-3">
                        
                        <!-- Single Item -->
                        <div class="d-flex align-items-center mb-3" v-for="item in localData" :key="item.id">
                            <!-- Item Image -->
                            <div class="card d-flex justify-content-center  align-items-center" style="width: 80px; height: 115px;">
                                <div class="card-body p-2  d-flex justify-content-center  align-items-center">
                                    <img class="w-75 h-100 object-fit-cover img-fluid" :src="`/${item.image}`" alt="Product Image">
                                </div>
                            </div>
                            
                            <!-- Item Details -->
                            <div class="d-flex flex-column flex-grow-1 ms-3">
                                <h5 style="font-size: 12px;" class="mb-1"><strong>{{ item.name }}</strong></h5>
                                <strong>{{ item.price }}</strong>
                                <!-- <small>{{ item.brand }} </small> -->
                                <small>{{ item.weight }}</small>
                                
                                <small>Quantity</small>
                                <div class="d-flex align-items-center ">
                                    <!-- Quantity Controls -->
                                    <button class="btn quantity__button-items me-2" title="Decrement" @click="decrement(item)">-</button>
                                    <input type="text" v-model="item.quantity" class="quantity__button-input text-center" readonly>
                                    <button class="btn quantity__button-items ms-2" title="Increment" @click="increment(item)">+</button>
                                    <!-- Remove Button -->
                                    <div class="ms-5  mt-1 trash-btn" @click="removeItem(item.id)">
                                        <b-icon title="Remove" icon="trash-fill" aria-hidden="true" class="icon"></b-icon>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <!-- Footer -->
                <div class="px-2">
                    <footer>
                        <div class="d-flex justify-content-between text-muted">
                            <div>
                                <h4>Subtotal:</h4>
                            </div>
                            <div>
                                <h5><strong>Rs {{ TotalPrice }}</strong></h5>
                            </div>
                        </div>
                    
                        <button @click="ChangeRoute" class="btn text-white btn-dark w-100 " style="margin-bottom: 75px;">Checkout Now</button>
                    </footer>
                </div>
            </div>

            <!-- Empty Cart Message -->
            <div v-else>
                <h5 class="text-center mt-5">No items in the cart</h5>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            data: "",
            TotalPrice: 0,
            isAddCartOpen: false,
            localData: [],
        };
    },
    watch: {
    },
    computed: {
    }
    ,
    methods: {
        ...mapActions(['callbackCheckoutMethod']),
        ChangeRoute(){
            const targetRoute = "/checkout";
    if (this.$route.path !== targetRoute) {
        this.$router.push(targetRoute);
        this.isAddCartOpen = false;
    }
    this.isAddCartOpen = false;
        },
        openSideCart() {
            const storedData = localStorage.getItem('item');
            this.localData = storedData ? JSON.parse(storedData) : [];
            this.isAddCartOpen = true;
            this.calculateTotalPrice();
        },
        ...mapMutations(["setCartIcon"]),
        removeItem(id) {
            
            this.localData = this.localData.filter(item => item.id !== id);
            localStorage.setItem('item', JSON.stringify(this.localData));
            this.setCartIcon(this.localData)
            this.calculateTotalPrice();
            this.callbackCheckoutMethod();
            if (this.localData.length<=0) {
                setTimeout(()=>this.isAddCartOpen = false,1000)
            }
        },

        increment(item) {
            item.quantity++;
            localStorage.setItem('item', JSON.stringify(this.localData));
            this.calculateTotalPrice();
            this.callbackCheckoutMethod();
        },

        decrement(item) {
            if (item.quantity <= 1) {
                this.removeItem(item.id);
                setTimeout(()=>this.isAddCartOpen = false,1000);
            }
            else {
                item.quantity--;
                localStorage.setItem('item', JSON.stringify(this.localData));
            }
            this.calculateTotalPrice();
            this.callbackCheckoutMethod();
        },

        calculateTotalPrice() {
            this.TotalPrice = this.localData.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
        }
    },
    mounted() {
      

    }
};
</script>

<style scoped>

.scrollable {
    max-height: 450px; 
    overflow-y: auto;
}
.scrollable::-webkit-scrollbar {
    width: 6px;
}
.scrollable::-webkit-scrollbar-thumb {
    background: #888;
}

.scrollable::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.size-label {
    padding: 2px 6px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-size: 10px;
}

.trash-btn {
    cursor: pointer;
}



.card {
    min-width: 100px;
    max-width: 100px;
}

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
    background-color: #fff;
    border-radius: 60%;
    color: #000;
    border: none;
    padding: 0px 8px;
    cursor: pointer;
    box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.1);
}
.quantity__button-items:hover{
    color: #fff;
    background-color: #000;

}

.menu-button {
    cursor: pointer;
}

.menu-icon {
    width: 50px;
    color: #fff;
    height: 33px;
    border-radius: 22px !important;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    background-color: rgba(0, 0, 0, 0.6);
}

.AddCart {
    position: fixed;
    top: 12%;
    right: -330px;
    bottom: 22%;
    width: 320px;
    height: 85%;
    border-radius: 10px !important;
    background-color: #eff1ee;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    z-index: 11;
    transition: 0.4s ease;
 
}
@media (max-width: 480px) {
  .AddCart {
   
    width: 300px;
  }
}
.AddCart.is-open {
    right: 10px;
}

.AddCart-links {
    list-style: none;
    padding: 0;
}

.AddCart-links li {
    margin: 20px 0;
    cursor: pointer;
    color: white;
}

.AddCart-links li:hover {
    color: #f28e65;
}
</style>