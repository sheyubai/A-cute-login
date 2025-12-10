<template>
  <div class="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    <div
      v-for="p in particles"
      :key="p.id"
      class="confetti-piece rounded-sm"
      :style="{
        left: `${p.x}%`,
        backgroundColor: p.color,
        animation: `confetti-fall 3s linear forwards`,
        animationDelay: `${p.delay}s`
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ConfettiParticle } from '../types';

const COLORS = ['#8B5CF6', '#FBBF24', '#F97316', '#EF4444', '#3B82F6', '#10B981'];

const particles = ref<ConfettiParticle[]>([]);

onMounted(() => {
  // Generate particles
  particles.value = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 2
  }));
});
</script>

<style scoped>
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  opacity: 0;
}

@keyframes confetti-fall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
</style>

