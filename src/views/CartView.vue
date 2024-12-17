<template>
    <div class="cart__view">
        <p v-for="(item, key) in cartGoods" :key="key">{{ item.title }}</p>
    </div>
</template>

<script>
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
    },
    methods: {
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