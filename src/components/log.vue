<template>
  <div id="app">
    <el-upload
      :action="posterUrl"
      :before-upload="beforeUpload"
      :http-request="(params)=>uploadImage(params)"
      :on-remove="(file, fileList)=>removeImage(file, fileList)"
      list-type="picture"
      accept="image/*"
    >
      <el-button size="small">选择图片</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'log',
    data() {
      return {
      posterUrl: '',
      imgUrls: [],
      imgWidth: '320',
      imgHeight: '400'
      }
    },
    methods: {
      beforeUpload(file) {
        let _this = this
        let _checkSize = false // 是否需要指定上传图片的尺寸
        if (file.size > 1024 * 500) { // 大小超过500kb
          _this.$message.error('图片太大，请重新选择')
          return false
        }
        const isSize = new Promise((resolve, reject) => {
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = function () {
            if (!_checkSize || (_checkSize && img.width === _this.imgWidth && img.height === _this.imgHeight)) {
              resolve()
             }
            // else {
            //   reject()
            // }
          }
          img.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          _this.$message.error('图片尺寸不对，请重新选择')
          return Promise.reject
        })
        return isSize
      },

      uploadImage(params) {
        console.log(params)
        let uploadData = new FormData()
        uploadData.append('file', params.file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.uploadPoster('homed' + new Date().getTime() + '/' + params.file.name, uploadData, config)
          .then(res => {
            if (res.status === 200) {
              params.onSuccess()
              this.imgUrls.push({ name: params.file.name, url: res.data.url })
              console.log(this.imgUrls)
            }
          }).catch(er => {
          params.onError()
          this.$message.error('上传失败')
        })
      },

      removeImage(file, fileList) {
        console.log(fileList)
      },

      uploadPoster(url, obj, config) {
        let posteruploadpath = 'http://xxxxxxxxxxxx/httpdocsup/poster/news/'
        return this.axios.post(posteruploadpath + url, obj, config)
      }
    }
  }
</script>

<style scoped>

</style>
