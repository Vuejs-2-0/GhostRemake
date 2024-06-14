<template>
  <div>
    <div class="">
      <Vue3Dropzone width="300px" height="300px" v-model="files" />

      <p v-if="uploadBusy">Loading...</p>

      <Button @click="submitProof()" :disabled="!publicURL || uploadBusy">Submit</Button>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Vue3Dropzone from "@jaxtheprime/vue3-dropzone";
import "@jaxtheprime/vue3-dropzone/dist/style.css";
import { Button } from "@/components/ui/button";

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

<style>
.preview > img {
  object-fit: cover;
}
</style>
