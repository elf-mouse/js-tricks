// 修改 iOS10 user-scalable 无效的问题
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // 使用 User Agent 检测
// let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform); // 使用 `navigator.platform` 检测

if (iOS) {
  // Disable pinch zoom on document
  document.documentElement.addEventListener(
    "touchstart",
    event => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    false
  );

  // Disable double tap on document
  let lastTouchEnd = 0;
  document.documentElement.addEventListener(
    "touchend",
    event => {
      let now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
}
