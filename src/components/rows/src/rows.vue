<template>
    <section class="xj-row">
    <ul class="xj-row-ui">
        <li v-for="(i,k) of rowsDate" :key="k" class="xj-row" :style="{width: rowStyle.width,marginRight:(k+1)%rowspan?space:'0'}">
            <slot :item="i"></slot>
        </li>

    </ul>
    </section>
</template>

<script>
    export default {
        name: "rows",
        props:{
            rowspan:{
                default: 4,
                type: [Number,String]
            },
            space:{
                default:'1%'
            },
            rowsDate:{
                type:Array,
                required:true,
                default(){
                    return []
                }
            }
        },
        computed:{
            rowStyle(){
                let space =this.space;
                let width
                if(space.includes('%')){
                    space = Number(space.replace('%',''))
                    width= (100 -  space * (this.rowspan-1)) / this.rowspan +'%';
                }
                return{
                    width
                }
            }
        }
    }
</script>

<style lang="scss">
    .xj-row{
        overflow: hidden;
        margin: auto;
        width: 100%;
        max-width: 1200px;

    }
    .xj-row-ui{
        overflow: hidden;
        background-color: green;
        >li{
            height: 300px;
            background-color: pink;
            float: left;
        }

    }

</style>