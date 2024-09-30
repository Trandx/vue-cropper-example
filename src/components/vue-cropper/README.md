# Vue-Cropper

Vue-Cropper is a lightweight (20 Kbytes gzip), zero-dependency sorting library with TypeScript support. this package is based on [cropperjs](https://github.com/fengyuanchen/cropperjs).

[![NPM](https://nodei.co/npm/vue-cropper.png?downloads=true)](https://nodei.co/npm/vue-cropper/)

## Table of Contents

- [Demo](#Demo)
- [Capture](#Capture)
- [Features](#features)
- [Installation](#installation)
- [Compatibility](#Compatibility)
- [Usage](#usage)
- [Props](#Props)
- [Events](#events)
- [Methods](#methods)
- [If issues](#If-issues)
- [More about Cropperjs](#More-about-cropperjs)
- [Author](#Author)
- [License](#license)

## Demo

Checkout **[Here](https://agontuk.github.io/vue-cropperjs/)**

## Capture

[![alt text](https://github.com/Trandx/vue-cropper/blob/develop/public/capture.png)](https://github.com/Trandx/vue-cropper)

## Features

- Easy to integrate with Vue.js applications.
- Responsive and user-friendly interface.
- Support for various image formats.
- Customizable aspect ratios and crop dimensions.
- Preview functionality.

## Installation

You can install the Vue-Cropper component via npm:

```shell
npm install --save vue-cropper
```
or
```
yarn add vue-cropper
```
> You will also need css & style loader for webpack

# Compatibility
| Vue Version | Package Version |
| ---------- | --------------- |
| 3.x.x      | >=1.0.0         |

## Usage

```js
// Global
import Vue from 'vue';
import Cropper from '@trandx/vue-cropper';
import '@trandx/vue-cropper/index.css';
Vue.component(VueCropper);

// Local
import VueCropper as Cropper from 'vue-cropper';
...
<div class=" h-[350px] bg-primary-400 rounded-lg border-2 border-gray-800">
  <Cropper
    ref="cropper"
    :src="imgSrc"
    alt="Source Image"
    @ready="..."
    @cropstart="..."
    @cropmove="..."
    @cropend="..."
    @preview="..."
  />
</div>

<button class="" @click.prevent="cropImage"> Crop </button>

...

<button class="" @click.prevent="zoom(-0.2)"> Zoom Out </button> showChosenImage

<button class="" @click.prevent="showChosenImage"> Change Image </button> 
...
  const cropper = ref<typeof VueCropper>()
  const cropImg = ref<string>()
  const previewImg = ref<string>()

  const preview = (data: string) => {

    previewImg.value = data

    //previewImg.value = cropper.value?.getCroppedCanvas().toDataURL('image/png', 1)
  }

  const cropstart = (data: Cropper) => {

    //const data = data?.getCroppedCanvas().toDataURL('image/png', 1)

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
    cropImg.value = cropper.value?.getCroppedCanvas().toDataURL('image/png', 1)
  }

  const move = (x: number, y: number) => cropper.value?.move(x, y)

  const rotate = (deg: number) => cropper.value?.rotate(deg)

  const flipX = () => {
    let scale = -(cropper.value?.getAttribute('data-scale') || 1);

    cropper.value?.scaleX(scale)

    cropper.value?.setAttribute('data-scale', scale);
  }

  const flipY = () => {
    let scale = -(cropper.value?.getAttribute('data-scale') || 1);

    cropper.value?.scaleX(scale)

    cropper.value?.setAttribute('data-scale', scale);
  }

  const reset = () => cropper.value?.reset()

  const zoom = (percent: number) => cropper.value?.zoom(percent)

  const showChosenImage = () => {
    //here, url can be every toDataUrl() or URL 
    const id = Math.floor(Math.random() * 90) + 1;
    const url = 'https://placedog.net/400/358?id='+id
    cropper.value?.replace(url)
  }

```
## Props

| Prop Name          | Type        | Default  | Description                                        |
|--------------------|-------------|----------|----------------------------------------------------|
| `src`              | `string`    | -        | The source URL of the image to be cropped.         |
| `alt`              | `string`    | -        | Alternative text for the image (optional).         |
| `imgStyle`         | `StyleValue`| -        | Custom styles for the image element (optional).    |
| `cropBoxResizable`  | `boolean`  | `true`   | Enables or disables resizing of the crop box.      |
| `canvasWidth`      | `number`    | -        | The width of the canvas for the cropped image.     |
| `canvasHeight`     | `number`    | -        | The height of the canvas for the cropped image.    |
| `cropBoxWidth`     | `number`    | -        | The width of the crop box in pixels.               |
| `cropBoxHeight`    | `number`    | -        | The height of the crop box in pixels.              |

## Events

| Event Name   | Payload Type     | Description                                       |
|--------------|------------------|---------------------------------------------------|
| `cropstart`  | `[elt?: Cropper]`| Emitted when cropping starts.                     |
| `cropmove`   | `[elt?: Cropper]`| Emitted when the crop area changes.               |
| `cropend`    | `[data?: string]`| Emitted when cropping ends.                       |
| `preview`    | `[elt?: string]` | Emitted to provide a preview of the cropped area. |
| `ready`      | `[elt?: Cropper]`| Emitted when the cropper is ready for use.        |


## Methods
| Method                  | Parameters                                                | Returns                       | Description                                                       |
|-------------------------|----------------------------------------------------------|-------------------------------|-------------------------------------------------------------------|
| `reset`                 | None                                                     | void                          | Resets the cropper instance and initializes it with props.       |
| `clear`                 | None                                                     | void                          | Clears the crop box.                                             |
| `replace`               | `url: string`, `onlyColorChanged: boolean = false`     | this                          | Replaces the image's src and rebuilds the cropper.              |
| `enable`                | None                                                     | void                          | Enables (unfreezes) the cropper.                                |
| `disable`               | None                                                     | void                          | Disables (freezes) the cropper.                                 |
| `destroy`               | None                                                     | void                          | Destroys the cropper and removes the instance from the image.    |
| `move`                  | `offsetX: number`, `offsetY: number`                   | `Cropper | undefined`        | Moves the canvas with relative offsets.                          |
| `moveTo`                | `x: number`, `y: number = x`                            | void                          | Moves the canvas to an absolute point.                           |
| `zoom`                  | `ratio: number`                                         | void                          | Zooms the canvas with a relative ratio.                          |
| `zoomTo`                | `ratio: number`                                         | void                          | Zooms the canvas to an absolute ratio.                           |
| `rotate`                | `degree: number`                                       | void                          | Rotates the canvas with a relative degree.                       |
| `rotateTo`             | `degree: number`                                       | void                          | Rotates the canvas to an absolute degree.                        |
| `scaleX`                | `scaleX: 1 | -1`                                       | void                          | Scales the image on the x-axis.                                  |
| `scaleY`                | `scaleY: 1 | -1`                                       | void                          | Scales the image on the y-axis.                                  |
| `scale`                 | `scaleX: 1 | -1`, `scaleY: 1 | -1 = scaleX`           | void                          | Scales the image with specified ratios on both axes.            |
| `getData`               | `rounded: boolean = false`                             | Cropped data                  | Gets the cropped area position and size data.                   |
| `setData`               | `data: Cropper.SetDataOptions`                         | this                          | Sets the cropped area position and size with new data.          |
| `getContainerData`      | None                                                     | Container data                | Gets the container size data.                                    |
| `getImageData`          | None                                                     | Image data                    | Gets the image position and size data.                           |
| `getCanvasData`         | None                                                     | Canvas data                   | Gets the canvas position and size data.                          |
| `setCanvasData`         | `data: Cropper.SetCanvasDataOptions`                   | this                          | Sets the canvas position and size with new data.                |
| `getCropBoxData`        | None                                                     | Crop box data                 | Gets the crop box position and size data.                        |
| `setCropBoxData`        | `data: Cropper.SetCropBoxDataOptions`                  | this                          | Sets the crop box position and size with new data.              |
| `getCroppedCanvas`      | `options: Cropper.GetCroppedCanvasOptions | undefined` | Result canvas                 | Gets a canvas drawn with the cropped image.                     |
| `setAspectRatio`        | `aspectRatio: number`                                   | this                          | Changes the aspect ratio of the crop box.                       |
| `setDragMode`           | `mode: Cropper.DragMode`                               | this                          | Changes the drag mode.                                          |

## If Issues

In case you notice any irregularities in benchmark or you want to add sort library to benchmark score
please open issue [here](https://github.com/Trandx/vue-cropper)

## More about Cropperjs

See cropperjs [documentation](https://github.com/fengyuanchen/cropperjs#options) for all posible options & methods.

## Author

[![alt text](https://avatars.githubusercontent.com/u/42522718?v=4)](https://github.com/Trandx/sortable)

## License

MIT