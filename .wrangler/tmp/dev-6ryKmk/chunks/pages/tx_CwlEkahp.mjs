globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as getTxByUUID, h as getCart, a as getProductsByIds, i as createTx, j as updateCartStatus, u as updateTx } from './cart_wsY3d6O-.mjs';

const GET = async ({ request }) => {
  const tx = new URL(request.url).searchParams.get("tx");
  if (tx) {
    let result = await getTxByUUID(tx);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  return new Response(null, {
    status: 404,
    statusText: "Not found"
  });
};
const POST = async ({ request, redirect }) => {
  const { cartId, form, dry_run } = await request.json();
  console.log(request);
  try {
    let cart = await getCart(cartId);
    let item_ids = Object.keys(cart.items).map((key) => parseInt(key));
    let products = await getProductsByIds(item_ids);
    products = products.map((product) => {
      return {
        ...product,
        quantity: cart.items[product?.id]
      };
    });
    let entries = [];
    let i = 0;
    for (let product of products) {
      if (product.id === 9 && cart.metadata && cart.metadata.bracelets) {
        for (let j = 0; j < product.quantity; j++) {
          let details = "";
          if (cart.metadata.bracelets[i].effect && typeof cart.metadata.bracelets[i].effect === "object") {
            details += `（效果:${Object.keys(cart.metadata.bracelets[i].effect).filter((key) => cart.metadata.bracelets[i].effect[key]).join(", ")}`;
          }
          if (cart.metadata.bracelets[i].size) {
            details += `, 大小:${cart.metadata.bracelets[i].size}`;
          }
          if (cart.metadata.bracelets[i].comment) {
            details += `, 备注:${cart.metadata.bracelets[i].comment}）`;
          }
          let metadata = {
            label: `1 x ${product.name}`,
            product,
            quantity: 1,
            price: "RM28",
            bracelets: details
          };
          entries.push({
            entry_id: product.id + j,
            metadata,
            type: "product",
            value: product.price
          });
          i++;
        }
      } else {
        let metadata = {
          label: `${product.quantity} x ${product.name}`,
          product,
          quantity: product.quantity,
          price: product.price
        };
        entries.push({
          entry_id: product.id,
          metadata,
          type: "product",
          value: product.price * product.quantity
        });
      }
    }
    if (form.delivery_method === "postal") {
      let address_metadata = form.metadata.address_metadata;
      let postage_cost_map = {
        west_malaysia: { label: "West Malaysia", value: 10 },
        east_malaysia: { label: "East Malaysia", value: 15 },
        singapore: { label: "Singapore", value: 69.8 },
        taiwan: { label: "Taiwan", value: 71.85 },
        hong_kong: { label: "Hong Kong", value: 69.62 },
        usa: { label: "USA", value: 82.98 },
        default: { label: "Others", value: 82.98 }
      };
      let detect_non_malaysia_shipping = (_address_metadata) => {
        for (let component of _address_metadata.address_components) {
          if (component.types.includes("country")) {
            if (component.short_name === "MY") {
              return false;
            } else if (component.short_name === "SG") {
              return postage_cost_map["singapore"];
            } else if (component.short_name === "TW") {
              return postage_cost_map["taiwan"];
            } else if (component.short_name === "HK") {
              return postage_cost_map["hong_kong"];
            } else if (component.short_name === "US") {
              return postage_cost_map["usa"];
            } else {
              return postage_cost_map["default"];
            }
          }
        }
      };
      let atomic_shipping_type = detect_non_malaysia_shipping(address_metadata);
      if (atomic_shipping_type === false) {
        let state = address_metadata.address_components.find((component) => component.types.includes("administrative_area_level_1"));
        if (state && state.long_name === "Sabah" || state.long_name === "Sarawak") {
          atomic_shipping_type = postage_cost_map["east_malaysia"];
        } else {
          atomic_shipping_type = postage_cost_map["west_malaysia"];
        }
      }
      let total_postage_cost = Math.ceil(products.length / 3) * Number(atomic_shipping_type?.value);
      entries.push({
        entry_id: "postage",
        metadata: {
          label: `Postage cost (${atomic_shipping_type?.label})`,
          atomic_shipping_type,
          total_postage_cost
        },
        type: "postage",
        value: total_postage_cost
      });
    }
    if (dry_run) {
      let tx_data = {
        dry_run: true,
        entries,
        form,
        metadata: {
          cart_id: cartId,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        paymentType: "",
        status: "pending",
        ownerId: cart.owner,
        value: entries.reduce((acc, entry) => acc + entry.value, 0)
      };
      return new Response(JSON.stringify(tx_data), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      let tx = await createTx({
        entries,
        form,
        metadata: {
          cart_id: cartId,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        paymentType: null,
        paymentMetadata: null,
        status: "pending",
        ownerId: cart.owner
      });
      await updateCartStatus(cartId, "checked_out");
      return redirect(`/pay?tx=${tx.uuid}`);
    }
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
};
const PUT = async ({ request, redirect }) => {
  let { uuid, status, paymentType, paymentMetadata } = await request.json();
  await updateTx(uuid, status, paymentType, paymentMetadata);
  return redirect(`/complete?tx=${uuid}`);
};

export { GET, POST, PUT };
