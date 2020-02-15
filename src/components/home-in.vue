<template>
    <div id="app">
        <er-carousel-index :typeNumber=2 :pageNumber=3  :timeSpace=2 :duration=2 :isOrNotCircle="true"  url="/src/js/index.json" :isOrNotButton=false>
            <template scope="props">-----使用子组件传过来的值，封装slot
                <div class="articleList-box-photo ">
                    <div class="tu imageEffectsAnimate imageEffects_Magnifier">
                        <a>
                            <img class="minMax" :src="props.item.img">
                        </a>
                    </div>
                </div>
                <div class="articleList-box-title">
                    <div class="title">
                        <a class="textleft">{{props.item.title}}</a>
                    </div>
                </div>
            </template>
        </er-carousel-index>
    </div>
</template>

<script>
    import ErCarouselIndex from './components/carouselIndex/src/carouselIndex.vue'
    export default {
        name: "home-in",
        data() {
        },
        components: {
            ErCarouselIndex//一定要进行组件声明，不然不能引用子组件
        }
    }
</script>

<style scoped>

</style>
