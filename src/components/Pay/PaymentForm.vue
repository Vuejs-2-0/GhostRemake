<template>


<Tabs default-value="upload_proof" class="w-full">
    <TabsList>
    <TabsTrigger value="upload_proof">
          Upload
        </TabsTrigger>
      <TabsTrigger value="stripe">
        Stripe
      </TabsTrigger>
    </TabsList>
    <TabsContent value="stripe">
      stripe
      <Stripe :tx="tx"></Stripe>
    </TabsContent>
    <TabsContent value="upload_proof">
        upload_proof

        <Uploader @submit="updateTx"></Uploader>
    </TabsContent>
  </Tabs>

</template>


<script setup>

    import {toRefs} from 'vue'

    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
    import Uploader from './Uploader.vue';
    import Stripe from './Stripe.vue';

    const props = defineProps(['uuid','tx'])
    const { uuid,tx } = toRefs(props)

    const updateTx = async (ev) => {

        console.log(ev)
        
        if(ev.paymentMethod === 'upload_proof'){
            // console.log('upload_proof')
            let payload = {
                ...ev,
                uuid: uuid.value,
                status: 'to_verify'
            }

            // PUT because we are actually updating the transaction
            let result = await fetch('/api/tx.json', {
                method: 'PUT',
                body: JSON.stringify(payload)
            })

            if(result.redirected){
                window.location.href = result.url
            }
        }
    }

</script>