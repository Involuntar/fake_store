<template>
    <header class="app__header">
        <div class="header">
            <h1 class="header__header"><RouterLink to="/" class="main_page_link">Storik</RouterLink></h1>
            <p v-if="!categories">Loading...</p>
            <nav v-else class="header__filters">
                <button @click="fetchAllGoods" class="filters__button">All</button>
                <button @click="fetchCategoryGoods(cat)" class="filters__button" v-for="(cat, key) in categories" :key="key">{{ cat }}</button>
            </nav>
            <RouterLink to="/cart" class="header__cart"><img src="shopping-cart-outline-svgrepo-com.svg" alt="cart" class="cart__img">{{ getCart.length }}</RouterLink>
        </div>
    </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            categories: null
        }
    },
    mounted() {
        this.$http.get('https://fakestoreapi.com/products/categories', {
            timeout: 60000
        })
        .then(resp => { this.categories = resp.data;});
        this.getCart = this.goodsFromLocalStorage;
    },
    methods: {
        ...mapMutations(['fetchCategoryGoods', 'fetchAllGoods'])
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
.app__header {
    display: flex;
    align-items: center;
    background-color: #5db08c;
    margin-bottom: 50px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    gap: 10px;
    margin: 0 auto;
    width: 1110px;
}

.main_page_link {
    text-decoration: none;
    color: #000;
}

.header__filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1000px;
    gap: 5px;
}

.filters__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    cursor: pointer;
    padding: 2px 15px;
}

.header__cart {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
    gap: 8px;
}

.cart__img {
    width: 24px;
    height: 24px;
}
</style>