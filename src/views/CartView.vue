<template>
    <div class="cart__view">
        <p v-if="cartGoods.length == 0">
            Загрузка...
        </p>
        <div v-else class="good__card" v-for="(goodinfo, key) in cartGoods" :key="key">
            <img :src="goodinfo.image" alt="good picture" class="card__image">
            <div class="card__desc">
                <p class="desc__title desc__text">{{ goodinfo.title }}</p>
                <p class="desc__price desc__text">Price: ${{ goodinfo.price }}</p>
                <p class="desc__rating desc__text">Rating: {{ '⭐'.repeat(Math.round(goodinfo.rating.rate)) }}
                    {{ goodinfo.rating.rate }}</p>
            </div>
            <div class="card__control">
                <RouterLink class="control__cart a" :to="'/good' + goodinfo.id">Подробнее</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            cartGoodsStorage: [],
            cartGoods: []
        }
    },
    mounted() {
        this.cartGoodsStorage = this.goodsFromLocalStorage;
        this.getCartGoods();
        this.addOldGoods(this.goodsFromLocalStorage);
    },
    methods: {
        ...mapMutations(['addOldGoods']),
        getCartGoods() {
            for (let i of this.cartGoodsStorage) {
                console.log(i);
                this.$http.get(`https://fakestoreapi.com/products/${i}`)
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
    margin: 0 auto;
}
</style>