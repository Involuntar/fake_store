<template>
    <div class="catalog">
        <p v-if="!getGoods" class="goods_grid_load loader">
            Загрузка...
        </p>
        <div v-else class="goods__grid">
            <GoodCard v-for="(good, key) in getGoods.slice(startSlice, startSlice + 10)" :key="key" :goodinfo="good" />
        </div>
        <div class="catalog__pages">
            <button @click="startSlice -= 10" class="prev__page page button">{{ '<<' }}</button>
            <button @click="startSlice += 10" class="next__page page button">{{ '>>' }}</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import GoodCard from './GoodCard.vue';

export default {
    components: {
        GoodCard
    },
    mounted() {
        this.fetchAllGoods();
        this.addOldGoods(this.goodsFromLocalStorage);
    },
    methods: {
        ...mapMutations(['fetchAllGoods', 'addOldGoods'])
    },
    computed: {
        ...mapGetters(['getGoods']),
        goodsFromLocalStorage() {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        }
    },
    data() {
        return {
            startSlice: 0
        }
    }
}
</script>

<style>
.catalog {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1140px;
    margin: 0 auto;
    gap: 45px;
}

.goods__grid {
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

.catalog__pages {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
}

.page.button {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background-color: #5db08c;
    border: none;
}
</style>