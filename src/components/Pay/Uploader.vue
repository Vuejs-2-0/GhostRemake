<template>
  <div class="w-full max-w-sm pt-4">
    <div class="w-full">
      <!-- Bank Information -->
      <div class="bg-salmon-50 border-2 border-salmon-200 rounded-xl p-4 mb-4">
        <h3 class="text-lg font-semibold text-salmon-600 mb-3">银行资料 / Bank Information</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">银行:</span>
            <span class="font-medium text-gray-900">OCBC Bank</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">账户号码:</span>
            <span class="font-medium text-gray-900">1452036362</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">账户名称:</span>
            <span class="font-medium text-gray-900">Leong Chen Chen</span>
          </div>
        </div>
      </div>

      <Vue3Dropzone ref="dropzone" height="300px" v-model="files" />

      <p v-if="uploadBusy">Loading...</p>

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

const files = ref([]);

const uploadBusy = ref(false);
const publicURL = ref("");

const emit = defineEmits(["submit"]);

const submitProof = () => {

  emit("submit", {
    paymentMethod: "upload_proof",
    paymentMetadata: {
        proof_image: publicURL.value
    }
  });

};

const dropzone = ref(null);

watch(dropzone, () => {

  let style_body = `<style>
.preview > img {
  object-fit: cover;
}

.select-file {
background-color: #FF4D00!important;
}
</style>`

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
    uploadBusy.value = false;
    publicURL.value = url;

};

const getFileData = (_file) => {
  return new Promise((resolve, reject) => {

    let reader = new FileReader();

    reader.onload = function (e) {
      let base64_data = e.target.result;
      let ext = base64_data.split(";")[0].split("/")[1];

      resolve({
        base64_data,
        ext,
      });
    };

    reader.readAsDataURL(_file);
  });
};
</script>