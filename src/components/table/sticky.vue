<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:topN+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: String,
      default: '0'
    },
    zIndex: {
      type: String,
      default: '1'
    },
    className: {
      type: String,
      default: ''
    },
      fixedDom:{
          type: String,
          default: ''
      }
  },
  data() {
    return {
      active: false,
      position: '',
        top:'',
      width: '1137px',
      height: undefined,
      isSticky: false,
        topN:0,
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    document.getElementById(this.fixedDom).addEventListener('scroll', this.handleScroll,true)
      document.getElementById(this.fixedDom).addEventListener('resize', this.handleReize,true)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
      // document.getElementById(this.fixedDom).removeEventListener('scroll', this.handleScroll)
      // document.getElementById(this.fixedDom).removeEventListener('resize', this.handleReize)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      // this.position = 'fixed'
      this.position = 'absolute'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
        this.$emit('topShow',true)
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = '1137px'
      this.active = false
      this.isSticky = false
        this.$emit('topShow',false)
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top

        //////////////////////////////////动态高度
        var scrollTop = document.getElementById(this.fixedDom).pageYOffset || document.getElementById('scrollBarDom').scrollTop || document.getElementById('scrollBarDom').scrollTop
        this.topN = scrollTop;

      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    },
    handleReize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>
