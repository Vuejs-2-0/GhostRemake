import { getCart, getProductsByIds } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

interface Entry {
  entryId: string;
  metadata: Object;
  type: string;
  value: Number;
}

export const POST:APIRoute = async ({request }) => {
    
    const { cartId, form, dry_run } = await request.json();

    console.log(request)

    let cart = await getCart(cartId);

    let item_ids = Object.keys(cart.items).map(key => cart.items[key])

    let products = await getProductsByIds(item_ids) as any;

    products = products.map((product:any) => {
      return {
      ...product,
        quantity: cart.items[product?.id]
      }
    })

    // create entries

    let entries = []

    for (let product of products) {

      entries.push({
        entryId: product.id,
        metadata: {
          label: `${product.quantity} x ${product.name}`,
          product: product,
          quantity: product.quantity,
          price: product.price
        },
        type: 'product',
        value: product.price * product.quantity
      })

    }

    // then we need to check if the the user opted postage
    // if yes, then we need to calculate the postage cost

    if( form.delivery_method === 'postal') {

      // first divide by country

      let address_metadata = form.metadata.address_metadata;

      let postage_cost_map = {
        "west_malaysia": { label: "West Malaysia", value: 10 },
        "east_malaysia": { label: "East Malaysia", value: 15 },
        "singapore": { label: "Singapore", value: 69.8 },
        "taiwan": { label: "Taiwan", value: 71.85 },
        "hong_kong": { label: "Hong Kong", value: 69.62 },
        "usa": { label: "USA", value: 82.98 },
        "default": { label: "Others", value: 82.98 },
      }

      let detect_non_malaysia_shipping = (_address_metadata:any) => {
        for(let component of _address_metadata.address_components){

          if (component.types.includes('country')) {
            if (component.short_name === 'MY') {
              return false
            } else if (component.short_name === 'SG') {
              return postage_cost_map['singapore']
            } else if (component.short_name === 'TW') {
              return postage_cost_map['taiwan']
            } else if (component.short_name === 'HK') {
              return postage_cost_map['hong_kong']
            } else if (component.short_name === 'US') {
              return postage_cost_map['usa']
            } else {
              return postage_cost_map['default']
            }
          }
  
        }
      }

      let atomic_shipping_type = detect_non_malaysia_shipping(address_metadata)

      if(atomic_shipping_type === false) {

        // check if east or west malaysia

        let state = address_metadata.address_components.find((component:any) => component.types.includes('administrative_area_level_1'))

        if (state && state.long_name === 'Sabah' || state.long_name === 'Sarawak') {
          atomic_shipping_type = postage_cost_map['east_malaysia']
        } else {
          atomic_shipping_type = postage_cost_map['west_malaysia']
        }

      }

      // the atomic postage cost is calculated, but each "unit" is bundled in 3 products
      // i.e. 1 postage cost for 3 products, if 4-6 products, then 2 postage cost

      let total_postage_cost = Math.ceil(products.length / 3) * Number(atomic_shipping_type?.value)

      entries.push({
        entryId: 'postage',
        metadata: {
          label: `Postage cost (${atomic_shipping_type?.label})`,
          atomic_shipping_type: atomic_shipping_type,
          total_postage_cost: total_postage_cost
        },
        type: 'postage',
        value: total_postage_cost
      })
      
    }

    if(dry_run){
      
      let tx_data = {
        dry_run: true,
        entries: entries,
        form: form,
        metadata: {
          cartId: cartId,
          created_at: new Date().toISOString()
        },
        payment_type: "",
        status: "pending",
        ownerId: cart.owner,
        value: entries.reduce((acc, entry) => acc + entry.value, 0)
      }

      return new Response(JSON.stringify(tx_data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });

    }


    return new Response(null, {
        status: 404,
        statusText: 'Not found'
      });
  }