<template>
  <div class="main fixed-top">
    <div class="announcement-bar">
      <div class="scrolling-text">
        <span>🔥 Limited Time Offer! Get 50% Off on CA Sports Gear – Shop Now! 🏏🎉</span>
        <!-- <span>🏆 Upgrade Your Game with CA Sports – Premium Quality Equipment Available! ⚡</span> -->
        <!-- <span>💥 Exclusive CA Sports Collection – Grab Yours Before Stock Runs Out! 🛒🔥</span> -->
        <!-- <span>🔥 Limited Time Offer! Get 50% Off on CA Sports Gear – Shop Now! 🏏🎉</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnouncementBar',
}
</script>

<style scoped>
.main {
  z-index: 2;
  width: 100%;
  overflow: hidden;
}

.announcement-bar {
  background-color: #000;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: relative;
  height: 50px;
}

.scrolling-text {
  display: flex;
  padding-left: 100%;
  gap: 100px; 
  animation: scroll-bar 25s linear infinite;
}

.scrolling-text span {
  display: inline-block;
  white-space: nowrap;
}

@keyframes scroll-bar {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
