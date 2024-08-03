<template>


<div class="w-full">
  <Tabs default-value="upload_proof" class="w-full">
    <TabsList class="w-full px-1 bg-salmon-100/50">
    <TabsTrigger class="w-full" value="upload_proof">
          上传汇款收据
        </TabsTrigger>
      <TabsTrigger class="w-full" value="stripe">
        信用卡 / 电子钱包
      </TabsTrigger>
    </TabsList>
    <TabsContent value="stripe">
      <!-- stripe -->
      <Stripe :tx="tx"></Stripe>
    </TabsContent>
    <TabsContent class="w-full" value="upload_proof">
        <Uploader @submit="updateTx"></Uploader>
    </TabsContent>
  </Tabs>
</div>

</template>


<script setup>

    import {toRefs} from 'vue'

    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
    import Uploader from './Uploader.vue';
    import Stripe from './Stripe.vue';

    const props = defineProps(['uuid','tx'])
    const { uuid,tx } = toRefs(props)

    const updateTx = async (ev) => {

        // console.log(ev)
        
        if(ev.paymentMethod === 'upload_proof'){
            // console.log('upload_proof')
            let payload = {
                ...ev,
                uuid: uuid.value,
                status: 'to_verify',
                paymentType: 'upload_proof'
            }

            // PUT because we are actually updating the transaction
            let result = await fetch('/api/tx.json', {
                method: 'PUT',
                body: JSON.stringify(payload)
            })

            if(result.redirected){
                // window.location.href = result.url
                window.location.replace(result.url)
            }
        }
    }

</script>