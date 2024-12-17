<template>
    <div class="good__card">
        <img :src="goodinfo.image" alt="good picture" class="card__image">
        <div class="card__desc">
            <p class="desc__title desc__text">{{ goodinfo.title }}</p>
            <p class="desc__price desc__text">Price: ${{ goodinfo.price }}</p>
            <p class="desc__rating desc__text">Rating: {{ '⭐'.repeat(Math.round(goodinfo.rating.rate)) }} {{ goodinfo.rating.rate }}</p>
        </div>
        <div class="card__control">
            <button class="control__cart button" @click="addToCart(goodinfo.id)">В корзину</button>
            <RouterLink class="control__cart a" :to="'/good'+goodinfo.id" @click="selectGood(goodinfo.id)">Подробнее</RouterLink>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            cartGoods: []
        }
    },
    props: {
        goodinfo: Object
    },
    methods: {
        ...mapMutations(['selectGood']),
        addToCart(id) {
            this.cartGoods.push(id);
            localStorage.cart = JSON.stringify(this.cartGoods);
        },
    },
    computed: {
        goodsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
    },
    mounted() {
        this.cartGoods = this.goodsFromLocalStorage;
    },
    watch: {
        cartGoods(newGood) {
            localStorage.setItem('cart', JSON.stringify(newGood))
        }
    }
}
</script>

<style>
.good__card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 20px;
    width: 230px;
    height: 330px;
    border-radius: 10px;
    box-shadow: 0 0 8px 2px #b8b8b8;
}

.card__image {
    width: 125px;
    height: 175px;
    object-fit: contain;
    object-position: center;
}

.desc__text {
    width: 100%;
    overflow-x: hidden;
}

.card__control {
    display: none;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #83838380;
    border-radius: 10px;
    width: 97%;
    height: 97%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.good__card:hover {
    transform: scale(1.06);
}

.good__card:hover > .card__control {
    display: flex;
}

.control__cart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    border: none;
    text-decoration: none;
    cursor: pointer;
    color: #000;
    background-color: #FFF;
}

.control__cart:hover {
    background-color: #5db08c;
    color: #FFF;
}
</style>