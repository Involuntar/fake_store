<template>
    <div class="good__view">
        <p v-if="!goodinfo">
            Loading...
        </p>
        <div v-else class="good__expanded">
            <div class="good__picture container">
                <img :src="goodinfo.image" alt="good picture" class="good__picture picture">
            </div>
            <div class="good__info">
                <div class="good_main_info">
                    <h1 class="good_info_header">{{ goodinfo.title }}</h1>
                    <p class="good_info_description">Description: {{ goodinfo.description }}</p>
                </div>
                <div class="good_additional_info">
                    <p class="good_info_rate good__rating">Rating: {{ '⭐'.repeat(Math.round(goodinfo.rating.rate)) }} {{ goodinfo.rating.rate }}</p>
                    <p class="good_info_count good__rating">👤: {{ goodinfo.rating.count }}</p>
                    <button class="good__cart button" @click="addToCart(goodinfo.id)">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';


export default {
    mounted() {
        this.axios.get(`https://fakestoreapi.com/products/${this.$route.params.id}`)
            .then(resp => {
                this.goodinfo = resp.data;
                console.log(this.goodinfo)
            });
        this.addOldGoods(this.goodsFromLocalStorage);
    },
    data() {
        return {
            goodinfo: null
        }
    },
    methods: {
        ...mapMutations(['addOldGoods', 'addCart']),
        addToCart(id) {
            this.addCart(id);
            localStorage.cart = JSON.stringify(this.getCart);
        },
    },
    computed: {
        ...mapGetters(['getCart']),
        goodsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
    }
}
</script>

<style>
.good__expanded {
    display: flex;
    justify-content: space-between;
    max-width: 1110px;
    padding: 0 15px;
    margin: 0 auto;
}

.good__picture.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27vw;
    height: 80vh;
    border-radius: 10px;
    box-shadow: 2px 3px 8px 2px #b8b8b8;
}

.good__picture.picture {
    width: 80%;
    height: 80%;
    object-fit: contain;
    object-position: center;
}

.good__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
}

.good_additional_info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.good__rating {
    width: 200px;
    text-align: left;
}

.good__cart.button {
    width: 200px;
    height: 70px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background-color: #5db08c;
    color: #FFF;
}

@media screen and (width <= 577px) {
    .good__expanded {
        flex-direction: column;
        gap: 30px;
    }

    .good__info {
        width: 100%;
    }

    .good_additional_info {
        align-items: flex-start;
    }

    .good__picture.container {
        width: 50vw;
        height: 60vw;
    }
}
</style>