<template>
  <div ref="containerRef" class="w-full h-full flex items-center justify-center relative bg-[#f3f4f6]">
    <svg 
      :viewBox="'0 0 420 340'" 
      class="w-full h-full max-h-[400px]"
      preserveAspectRatio="xMidYMid meet"
      style="will-change: transform; backface-visibility: hidden; transform: translateZ(0);"
    >
      <defs>
        <clipPath id="purple-clip">
          <rect x="0" y="0" width="120" height="240" rx="12" />
        </clipPath>
        <clipPath id="yellow-clip">
          <path d="M 0 65 A 65 65 0 0 1 130 65 V 150 H 0 Z" />
        </clipPath>
        <clipPath id="orange-clip">
          <path d="M 0 130 A 130 130 0 0 1 260 130 Z" />
        </clipPath>
        
        <!-- 淡淡的影子渐变 - 让人物看起来站在平面上 -->
        <radialGradient id="shadow-gradient" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.05" />
          <stop offset="50%" stop-color="#000000" stop-opacity="0.03" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- 淡淡的阴影 - 贴在人物下面 -->
      <g opacity="1">
        <!-- 主阴影 - 贴近人物底部，淡淡的效果 -->
        <ellipse cx="210" cy="285" rx="170" ry="6" fill="url(#shadow-gradient)" />
        
        <!-- 内层阴影 - 更贴近人物底部 -->
        <ellipse cx="210" cy="283" rx="130" ry="4" fill="#000000" opacity="0.04" />
      </g>

      <!-- --- 1. PURPLE BLOCK (Tall, Back Left) --- -->
      <g :class="`mascot-purple ${isCelebrating ? 'celebrate-pop' : ''}`" style="backface-visibility: hidden; transform-style: preserve-3d;">
        <g clip-path="url(#purple-clip)">
          <!-- Main Body -->
          <rect x="0" y="0" width="120" height="240" fill="#8B5CF6" />
          
          <!-- Face Group -->
          <g class="transition-all duration-500 ease-in-out">
            
            <!-- Left Eye: Slides Left & Fades (Turn Away) -->
            <g 
              class="transition-all duration-500 ease-out"
              :style="{ 
                transform: isShy ? 'translateX(-40px)' : 'translateX(0)',
                opacity: isShy ? 0 : 1
              }"
            >
              <g transform="translate(35, 70)">
                <circle r="8" fill="white" />
                <circle ref="purplePupilLRef" r="3" fill="#000" class="eye-transition" />
              </g>
            </g>

            <!-- Right Eye: Slides Left to become the "Profile" eye -->
            <g 
              class="transition-all duration-500 ease-out"
              :style="{ 
                transform: isShy ? 'translateX(-50px)' : 'translateX(0)',
              }"
            >
              <g transform="translate(85, 70)">
                <circle r="8" fill="white" />
                <circle ref="purplePupilRRef" r="3" fill="#000" class="eye-transition" />
              </g>
            </g>

            <!-- Mouth - Moved UP to y=65 to be between eyes -->
            <rect 
              x="58" y="65" width="4" height="15" rx="2" fill="#000" 
              class="transition-all duration-500 ease-out"
              :style="{ 
                transform: isShy ? 'translateX(-45px)' : 'translateX(0)',
                opacity: isShy ? 0.3 : 1
              }"
            />
          </g>
        </g>
      </g>

      <!-- --- 2. BLACK BLOCK (Middle, Raised) --- -->
      <g :class="`mascot-black ${isCelebrating ? 'celebrate-pop' : ''}`" style="backface-visibility: hidden; transform-style: preserve-3d;">
        <rect x="0" y="0" width="100" height="150" rx="12" fill="#1F2937" />
        
        <g class="transition-opacity duration-300">
          <!-- Eyes -->
          <g transform="translate(32, 55)">
            <circle :r="isShy ? 0 : 12" fill="white" class="transition-all duration-300" />
            <circle ref="blackPupilLRef" r="5" fill="#000" :class="`eye-transition ${isShy ? 'opacity-0' : 'opacity-100'}`" />
          </g>
          <g transform="translate(68, 55)">
            <circle :r="isShy ? 0 : 12" fill="white" class="transition-all duration-300" />
            <circle ref="blackPupilRRef" r="5" fill="#000" :class="`eye-transition ${isShy ? 'opacity-0' : 'opacity-100'}`" />
          </g>
          <!-- Closed Eye Lines (Shy Mode) -->
          <path d="M 22 55 H 42" stroke="white" stroke-width="3" stroke-linecap="round" :class="`transition-opacity duration-300 ${isShy ? 'opacity-100' : 'opacity-0'}`" />
          <path d="M 58 55 H 78" stroke="white" stroke-width="3" stroke-linecap="round" :class="`transition-opacity duration-300 ${isShy ? 'opacity-100' : 'opacity-0'}`" />
        </g>
      </g>

      <!-- --- 3. YELLOW CYLINDER (Right) --- -->
      <g :class="`mascot-yellow ${isCelebrating ? 'celebrate-pop' : ''}`" style="backface-visibility: hidden; transform-style: preserve-3d;">
        <g clip-path="url(#yellow-clip)">
          <path d="M 0 65 A 65 65 0 0 1 130 65 V 150 H 0 Z" fill="#FBBF24" />
          
          <!-- Face Group -->
          <g ref="yellowFaceRef" class="transition-transform duration-100 ease-out">
            <!-- 眼睛 - 保持不变 -->
            <circle cx="40" cy="80" r="6" fill="#000" />
            <circle cx="90" cy="75" r="6" fill="#000" />
            <!-- 嘴巴 - 保持不变 -->
            <path d="M 45 110 H 95" stroke="#000" stroke-width="5" stroke-linecap="round" />
          </g>

          <!-- HANDS (Vertical Slide Up + Tilt) -->
          <g transform="translate(0, 0)"> 
            <!-- Left Arm: Pivot bottom, tilt right (inward) -->
            <rect 
              x="32" y="150" width="16" height="80" rx="8" fill="#F59E0B" 
              stroke="#B45309" stroke-width="3"
              :style="{ 
                transformOrigin: '40px 150px',
                transform: isShy ? 'translateY(-75px) rotate(15deg)' : 'translateY(90px) rotate(0deg)',
                opacity: isShy ? 1 : 0,
                pointerEvents: isShy ? 'auto' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
              }"
            />
            <!-- Right Arm: Pivot bottom, tilt left (inward) -->
            <rect 
              x="82" y="150" width="16" height="85" rx="8" fill="#F59E0B" 
              stroke="#B45309" stroke-width="3"
              :style="{ 
                transformOrigin: '90px 150px',
                transform: isShy ? 'translateY(-80px) rotate(-15deg)' : 'translateY(95px) rotate(0deg)',
                opacity: isShy ? 1 : 0,
                pointerEvents: isShy ? 'auto' : 'none',
                transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
              }"
            />
          </g>
        </g>
      </g>

      <!-- --- 4. ORANGE SEMICIRCLE (Front Center) --- -->
      <g :class="`mascot-orange ${isCelebrating ? 'celebrate-pop' : ''}`" style="backface-visibility: hidden; transform-style: preserve-3d;">
        <g clip-path="url(#orange-clip)">
          <!-- Main Body -->
          <path d="M 0 130 A 130 130 0 0 1 260 130 Z" fill="#F97316" />
          
          <!-- Face Group -->
          <g ref="orangeFaceRef" class="transition-transform duration-100 ease-out">
            <!-- 眼睛 - 保持不变 -->
            <circle cx="100" cy="75" r="7" fill="#000" />
            <circle cx="160" cy="75" r="7" fill="#000" />
            <!-- 嘴巴 - 惊呼时直接变成O形，无动画 -->
            <path 
              v-if="!isCelebrating"
              d="M 115 100 Q 130 115 145 100" 
              fill="none" 
              stroke="#000" 
              stroke-width="5" 
              stroke-linecap="round" 
            />
            <!-- 惊呼：更圆润、稍大的O形嘴巴 -->
            <ellipse 
              v-if="isCelebrating"
              cx="130" 
              cy="100" 
              rx="9" 
              ry="11" 
              fill="#000" 
            />
          </g>

          <!-- HANDS (Vertical Slide Up + Tilt) -->
          <g transform="translate(0, 0)">
            <!-- Left Arm: Tilt 15deg inward -->
            <rect 
              x="90" y="130" width="20" height="70" rx="10" fill="#EA580C"
              stroke="#C2410C" stroke-width="3"
              :style="{ 
                transformOrigin: '100px 130px',
                transform: isShy ? 'translateY(-65px) rotate(15deg)' : 'translateY(80px) rotate(0deg)', 
                opacity: isShy ? 1 : 0,
                pointerEvents: isShy ? 'auto' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
              }"
            />

            <!-- Right Arm: Tilt -15deg inward -->
            <rect 
              x="150" y="130" width="20" height="70" rx="10" fill="#EA580C"
              stroke="#C2410C" stroke-width="3"
              :style="{ 
                transformOrigin: '160px 130px',
                transform: isShy ? 'translateY(-65px) rotate(-15deg)' : 'translateY(80px) rotate(0deg)', 
                opacity: isShy ? 1 : 0,
                pointerEvents: isShy ? 'auto' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out'
              }"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  isShy: boolean;
  isCelebrating: boolean;
}

const props = defineProps<Props>();

const containerRef = ref<HTMLDivElement>();
const purplePupilLRef = ref<SVGCircleElement>();
const purplePupilRRef = ref<SVGCircleElement>();
const blackPupilLRef = ref<SVGCircleElement>();
const blackPupilRRef = ref<SVGCircleElement>();
const yellowFaceRef = ref<SVGGElement>();
const orangeFaceRef = ref<SVGGElement>();

// 使用局部变量存储状态，避免响应式追踪
let isShyState = false;
let isCelebratingState = false;
let rafId: number | null = null;

// 同步 props 到局部变量
watch([() => props.isShy, () => props.isCelebrating], ([shy, celebrating]) => {
  isShyState = shy;
  isCelebratingState = celebrating;
  if (shy || celebrating) {
    resetPositions();
  }
}, { immediate: true });

const handleMouseMove = (e: MouseEvent) => {
  // 使用 requestAnimationFrame 节流，避免过度渲染
  if (rafId !== null) {
    return;
  }

  rafId = requestAnimationFrame(() => {
    rafId = null;
    
    // 使用局部变量而不是 props，避免响应式追踪
    if (isShyState || isCelebratingState || !containerRef.value) return;

    const containerRect = containerRef.value.getBoundingClientRect();
    
    // Calculate scaling factors (SVG viewBox vs Rendered Size)
    const viewBoxW = 420;
    const viewBoxH = 340;
    const scaleX = containerRect.width / viewBoxW;
    const scaleY = containerRect.height / viewBoxH;
    const scale = Math.min(scaleX, scaleY);

    // Calculate the offset of the rendered SVG inside the container (centering)
    const renderedW = viewBoxW * scale;
    const renderedH = viewBoxH * scale;
    const offsetX = (containerRect.width - renderedW) / 2;
    const offsetY = (containerRect.height - renderedH) / 2;

    // Helper to convert SVG local coordinates to global Screen coordinates
    const getScreenPos = (svgX: number, svgY: number) => {
      return {
        x: containerRect.left + offsetX + svgX * scale,
        y: containerRect.top + offsetY + svgY * scale
      };
    };

    // Helper: Track Pupil
    const updatePupil = (pupilRef: typeof purplePupilLRef, svgCenterX: number, svgCenterY: number, radiusLimit: number) => {
      if (!pupilRef.value) return;
      
      const eyeCenter = getScreenPos(svgCenterX, svgCenterY);
      
      const dx = e.clientX - eyeCenter.x;
      const dy = e.clientY - eyeCenter.y;
      const angle = Math.atan2(dy, dx);
      
      const dist = Math.min(radiusLimit * scale, Math.hypot(dx, dy) / 10);

      const moveX = (Math.cos(angle) * dist) / scale;
      const moveY = (Math.sin(angle) * dist) / scale;
      
      // 直接操作 DOM，避免 Vue 响应式
      pupilRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    // Helper: Track Whole Face
    const updateFace = (faceRef: typeof yellowFaceRef, originX: number, originY: number, limit: number) => {
      if (!faceRef.value) return;
      
      const originScreen = getScreenPos(originX, originY);
      const dx = e.clientX - originScreen.x;
      const dy = e.clientY - originScreen.y;
      
      const moveX = Math.max(-limit, Math.min(limit, dx / 20));
      const moveY = Math.max(-limit, Math.min(limit, dy / 20));

      // 直接操作 DOM，避免 Vue 响应式
      faceRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    // Update pupils and faces
    updatePupil(purplePupilLRef, 105, 100, 4);
    updatePupil(purplePupilRRef, 155, 100, 4);
    updatePupil(blackPupilLRef, 192, 135, 5);
    updatePupil(blackPupilRRef, 228, 135, 5);
    updateFace(yellowFaceRef, 315, 205, 6);
    updateFace(orangeFaceRef, 150, 225, 8);
  });
};

// Reset positions when Shy/Celebrating
const resetPositions = () => {
  const reset = (ref: typeof purplePupilLRef) => {
    if (ref.value) ref.value.style.transform = `translate(0px, 0px)`;
  };
  [purplePupilLRef, purplePupilRRef, blackPupilLRef, blackPupilRRef].forEach(reset);
  if (yellowFaceRef.value) yellowFaceRef.value.style.transform = `translate(0px, 0px)`;
  if (orangeFaceRef.value) orangeFaceRef.value.style.transform = `translate(0px, 0px)`;
};

onMounted(() => {
  // 使用 passive: true 优化事件监听器性能
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  // 清理未完成的 requestAnimationFrame
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
});
</script>

<style scoped>
.eye-transition {
  transition: transform 0.1s linear, height 0.3s ease, cy 0.3s ease;
}

/* 初始位置 - 使用 CSS 而不是 SVG transform */
.mascot-purple {
  transform: translate3d(70px, 30px, 0);
  will-change: transform;
}

.mascot-black {
  transform: translate3d(160px, 80px, 0);
  will-change: transform;
}

.mascot-yellow {
  transform: translate3d(250px, 130px, 0);
  will-change: transform;
}

.mascot-orange {
  transform: translate3d(20px, 150px, 0);
  will-change: transform;
}

/* 登录成功欢呼效果 - 人物上下轻微跳动，像在庆祝 */
@keyframes celebrate-cheer-purple {
  0%, 100% { transform: translate3d(70px, 30px, 0); }
  25% { transform: translate3d(70px, 20px, 0); }
  50% { transform: translate3d(70px, 25px, 0); }
  75% { transform: translate3d(70px, 22px, 0); }
}

@keyframes celebrate-cheer-black {
  0%, 100% { transform: translate3d(160px, 80px, 0); }
  25% { transform: translate3d(160px, 70px, 0); }
  50% { transform: translate3d(160px, 75px, 0); }
  75% { transform: translate3d(160px, 72px, 0); }
}

@keyframes celebrate-cheer-yellow {
  0%, 100% { transform: translate3d(250px, 130px, 0); }
  25% { transform: translate3d(250px, 120px, 0); }
  50% { transform: translate3d(250px, 125px, 0); }
  75% { transform: translate3d(250px, 122px, 0); }
}

@keyframes celebrate-cheer-orange {
  0%, 100% { transform: translate3d(20px, 150px, 0); }
  25% { transform: translate3d(20px, 140px, 0); }
  50% { transform: translate3d(20px, 145px, 0); }
  75% { transform: translate3d(20px, 142px, 0); }
}

.mascot-purple.celebrate-pop {
  animation: celebrate-cheer-purple 0.6s ease-in-out infinite;
}

.mascot-black.celebrate-pop {
  animation: celebrate-cheer-black 0.6s ease-in-out infinite 0.1s;
}

.mascot-yellow.celebrate-pop {
  animation: celebrate-cheer-yellow 0.6s ease-in-out infinite 0.2s;
}

.mascot-orange.celebrate-pop {
  animation: celebrate-cheer-orange 0.6s ease-in-out infinite 0.15s;
}

</style>

