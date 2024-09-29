<template>
  <div class=" h-screen w-screen space-y-4">
    <div class="w-full border border-b  bg-blue-500 py-2 px-6 flex justify-between">
      <p class="font-bold text-3xl">Vue-Cropper</p>
      <a class=" font-medium hover:underline flex space-x-1 py-2" href="https://github.com/Trandx/vue-cropper">
          <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span>GitHub</span>
      </a>
    </div>
    <div class=" flex justify-center items-center space-x-48">
      <div class="space-y-2 w-1/3" >
        <div class=" h-[350px] bg-primary-400 rounded-lg border-2 border-gray-800">
          <VueCropper
          @ready=""
          @preview="preview"
          @cropmove=""
          @cropstart="cropstart"
          @cropend="cropend"
          ref="cropper"
          src="./man-8293794_1280.webp" />
        </div>
        <div class="text-white flex flex-wrap">

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="cropImage"> Crop </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="zoom(0.2)"> Zoom In </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="zoom(-0.2)"> Zoom Out </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="move(-10, 0)"> Move Left </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="move(10, 0)"> Move Right </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="move(0, -10)"> Move Up </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="move(0, 10)"> Move Down </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="rotate(30)"> Rotate +30Deg </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="rotate(-30)"> Rotate -30Deg </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="flipX()"> flip X </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="flipY()"> flip Y </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="reset()"> reset </button>

          <button class=" bg-slate-900 px-2 py-1 m-2 rounded-lg" @click.prevent="showChosenImage"> Change Image </button>

        </div>
      </div>
      <div class="w-1/3 space-y-2">
        <p class="font-meduim text-2xl">Preview</p>
        <div class="h-[250px] w-[250px] border rounded-lg p-1">
          <img
          class=" h-full "
            v-if="previewImg"
            :src="previewImg"
          />
        </div>
        <p class="font-meduim text-2xl">Cropped Image</p>
        <div class="h-[250px] w-[250px] border rounded-lg p-1">
          <img
          class=" h-full"
            v-if="cropImg"
            :src="cropImg"
            alt="Cropped Image"
          />
          <div v-else class="crop-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/lib/style.css';

  type ScaleType =  1 | -1
  type VueCropperType = InstanceType<typeof VueCropper>

  const cropper = ref<VueCropperType>()
  const cropImg = ref<string>()
  const previewImg = ref<string>()

  const preview = (data: string) => {

    previewImg.value = data

    //previewImg.value = cropper.value?.getCroppedCanvas().toDataURL('image/png', 1)
  }

  const cropstart = (data: VueCropperType) => {

    //const imgUrl = data?.getCroppedCanvas()?.toDataURL('image/png', 1)

    //const data = cropper.value?.getCroppedCanvas().toDataURL('image/png', 1)

    console.log('crop start!', data);
  }

  const cropend = (data: string) => {

    cropImg.value = data

    //const data = data?.getCroppedCanvas().toDataURL('image/png', 1)

    //const data = cropper.value?.getCroppedCanvas().toDataURL('image/png', 1)

    console.log('crop end!');
  }

  const cropImage = () => {
    cropImg.value = cropper.value?.getCroppedCanvas()?.toDataURL('image/png', 1)
  }

  const move = (x: number, y: number) => cropper.value?.move(x, y)

  const rotate = (deg: number) => cropper.value?.rotate(deg)

  const flipX = () => {
    
    const scale = -(cropper.value?.getAttribute('data-scale') || 1) as ScaleType;
    
    cropper.value?.scaleX(scale)

    cropper.value?.setAttribute('data-scale', scale.toString());
  }

  const flipY = () => {
    const scale = -(cropper.value?.getAttribute('data-scale') || 1) as ScaleType;

    cropper.value?.scaleX(scale)

    cropper.value?.setAttribute('data-scale', scale.toString());
  }

  const reset = () => cropper.value?.reset()

  const zoom = (percent: number) => cropper.value?.zoom(percent)

  const showChosenImage = () => {
    const id = Math.floor(Math.random() * 90) + 1;
    const url = 'https://placedog.net/400/358?id='+id
    cropper.value?.replace(url)
  }
</script>
