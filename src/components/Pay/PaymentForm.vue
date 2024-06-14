<template>


<Tabs default-value="stripe" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="stripe">
        Stripe
      </TabsTrigger>
      <TabsTrigger value="upload_proof">
        Upload
      </TabsTrigger>
    </TabsList>
    <TabsContent value="stripe">
      stripe
    </TabsContent>
    <TabsContent value="upload_proof">
        upload_proof
    </TabsContent>
  </Tabs>

</template>


<script setup>
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>