<template>
    <section class="xj-row clearfix">
    <ul class="xj-row-ui">
        <li v-for="(i,k) of rowsDate" :key="k" class="xj-row" :style="{width: rowStyle.width,marginRight:(k+1)%rowspan?space:'0'}">
            <slot :item="i"></slot>
        </li>

    </ul>
    </section>
</template>

<script>
    export default {
        name: "Rows",
        props:{
            rowspan:{
                default: 4,
                type: [Number,String]
            },
            space:{
                default:'0%'
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
        margin: auto;
        width: 100%;
    }
    .xj-row-ui{
        overflow: hidden;
        >li{
            float: left;
        }

    }

</style>