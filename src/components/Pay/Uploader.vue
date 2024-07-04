<template>
  <div class="w-full max-w-sm pt-4">
    <div class="w-full">
      <Vue3Dropzone ref="dropzone" height="300px" v-model="files" />

      <p v-if="uploadBusy">Loading...</p>

      <!-- <Button @click="submitProof()" :disabled="!publicURL || uploadBusy">上传收据</Button> -->

      <Button @click="submitProof()" :disabled="!publicURL || uploadBusy" class="bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3 w-full mt-4">
        <span class="text-xl text-white">上传收据</span>
      </Button>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Vue3Dropzone from "@jaxtheprime/vue3-dropzone";

import { Button } from "@/components/ui/button";

onMounted( () => {
//   .preview > img {
//   object-fit: cover;
// }

// .select-file {
// background-color: #FF4D00!important;
// }
// </style>

  

  

})

const files = ref([]);

const uploadBusy = ref(false);
const publicURL = ref("");

const emit = defineEmits(["submit"]);

const submitProof = () => {
  console.log("submitting proof");

  emit("submit", {
    paymentMethod: "upload_proof",
    paymentMetadata: {
        proof_image: publicURL.value
    }
  });

};

const dropzone = ref(null);

watch(dropzone, () => {
  // processFile();
  console.log(dropzone.value);

  // document.querySelector(".select-file").style.backgroundColor = "#FF4D00";
  // document.querySelector(".preview").style.objectFit = "cover";

  let style_body = `<style>
.preview > img {
  object-fit: cover;
}

.select-file {
background-color: #FF4D00!important;
}
</style>`

  // add the style node

  let style = document.createElement("style");
  style.innerHTML = style_body;
  document.head.appendChild(style);

});

watch(files, () => {
  processFile();
});

const processFile = async () => {

    uploadBusy.value = true;

    let _file = files.value[0].file

    let { base64_data, ext } = await getFileData(_file);
    let uploadResponse = await fetch('/api/upload.json', {
        method: 'POST',
        body: JSON.stringify({
            base64_data,
            extension: ext
        })
    })
    let { message, url } = await uploadResponse.json();
    console.log(message, url);
    uploadBusy.value = false;
    publicURL.value = url;

};

const getFileData = (_file) => {
  return new Promise((resolve, reject) => {
    // convert the file into base64

    // let _file = files.value[0].file

    // convert file to base64

    let reader = new FileReader();

    reader.onload = function (e) {
      let base64_data = e.target.result;
      let ext = base64_data.split(";")[0].split("/")[1];

      //   console.log(ext)
      resolve({
        base64_data,
        ext,
      });
    };

    reader.readAsDataURL(_file);
  });
};
</script>

<!-- <style>
.preview > img {
  object-fit: cover;
}

.select-file {
background-color: #FF4D00!important;
}
</style> -->
