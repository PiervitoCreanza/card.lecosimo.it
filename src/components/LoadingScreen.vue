<template>
  <div class="center" style="height: 100vh;">
    <div class="container">
      <div class="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
      <h1 class="display-3">{{ loadingText }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: "Caricamento",
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style lang="scss" scoped>
$size: 80;
.loader {
  --path: white;
  --dot: #ef6461;
  --duration: 3s;

  width: #{$size}px;
  height: #{$size}px;
  position: relative;
  &:before {
    content: "";
    width: #{$size * 0.136}px;
    height: #{$size * 0.136}px;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: var(--dot);
    top: #{$size * 0.84}px;
    left: #{$size * 0.4318}px;
    transform: translate(-#{$size * 0.409}px, -#{$size * 0.409}px);
    animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
    polygon {
      fill: none;
      stroke: var(--path);
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    polygon {
      stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
      stroke-dashoffset: 0;
      animation: pathTriangle var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
    circle {
      stroke-dasharray: (200 / 4 * 3) (200 / 4) (200 / 4 * 3) (200 / 4);
      stroke-dashoffset: 75;
      animation: pathCircle var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }
  &.triangle {
    width: #{$size * 1.09}px;
    &:before {
      left: #{$size * 0.4773}px;
      transform: translate(-#{$size * 0.2273}px, -#{$size * 0.4091}px);
      animation: dotTriangle var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }
  66% {
    transform: translate(#{$size * 0.2273}px, -#{$size * 0.4091}px);
  }
  100% {
    transform: translate(-#{$size * 0.2273}px, -#{$size * 0.4091}px);
  }
}

.loader {
  display: inline-block;
  margin: 0 #{$size * 0.3636}px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

//https://dev.to/gscode/10-best-css-loader-for-front-end-developers-jk8
