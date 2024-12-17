<template>
    <div>
        {{ cartGoods }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartGoods: []
        }
    },
    mounted() {
        this.cartGoods = this.goodsFromLocalStorage;
    },
    methods: {
        
    },
    computed: {
        goodsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
    }
}
</script>