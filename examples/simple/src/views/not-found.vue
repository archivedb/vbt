<template>
  <div class="not-found-view">
    <div class="container">
      <div class="content">
        <h1>404</h1>
        <p>Not Found</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found-view',
}
</script>

<style scoped>
.container {
  padding-top: 90px;
}

.content {
  color: #666666;
  text-align: center;
}

h1 {
  font-size: 80px;
  margin: 0;
}

p {
  font-size: 14px;
}
</style>
