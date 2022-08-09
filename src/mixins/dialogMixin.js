export default {
  props: {
    initParams: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.show
      },
      set(newVal) {
        this.$emit('update:show', newVal)
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
