<template>
    <div class="cart__view">
        <h1 class="cart_view_header">Cart</h1>
        <p v-if="cartGoods.length == 0">
            Loading...
        </p>
        <div v-else class="cart__grid">
            <div class="good__card" v-for="(goodinfo, key) in cartGoods.slice(startSlice, startSlice + 10)" :key="key">
                <img :src="goodinfo.image" alt="good picture" class="card__image">
                <div class="card__desc">
                    <p class="desc__title desc__text">{{ goodinfo.title }}</p>
                    <p class="desc__price desc__text">Price: ${{ goodinfo.price }}</p>
                    <p class="desc__rating desc__text">Rating: {{ '⭐'.repeat(Math.round(goodinfo.rating.rate)) }}
                        {{ goodinfo.rating.rate }}</p>
                </div>
                <div class="card__control">
                    <RouterLink class="control__cart a" :to="'/good' + goodinfo.id">Learn more</RouterLink>
                    <button class="control__cart good_delete button">Delete</button>
                </div>
            </div>
        </div>
        <div class="catalog__pages">
            <button @click="startSlice -= 10" class="prev__page page button">{{ '<<' }}</button>
            <button @click="startSlice += 10" class="next__page page button">{{ '>>' }}</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            cartGoodsStorage: [],
            cartGoods: [],
            startSlice: 0
        }
    },
    mounted() {
        this.cartGoodsStorage = this.goodsFromLocalStorage;
        this.getCartGoods();
        this.addOldGoods(this.goodsFromLocalStorage);
    },
    methods: {
        ...mapMutations(['addOldGoods']),
        async getCartGoods() {
            for (let i of this.cartGoodsStorage) {
                await this.$http.get(`https://fakestoreapi.com/products/${i}`)
                .then(resp => {
                    this.cartGoods.push(resp.data);
                });
            }
        }
    },
    computed: {
        goodsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
    }
}
</script>

<style>
.cart__view {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1140px;
    margin: 0 auto;
    gap: 45px;
}

.cart__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 270px);
    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 80%;
    gap: 25px;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 2px 3px 8px 2px #b8b8b8;
}
</style>