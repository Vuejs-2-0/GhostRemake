import { getCart, getProductsByIds, createTx, updateTx, getTxByUUID, updateCartStatus, updateUserByID } from "../../lib/tarpit_gql";

import type { APIRoute } from "astro";

const renderEmail = (args:any) => {

  const { entries, date, shipping, address, total } = args;

  let email_template_1 = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <title>真的友鬼: 🎉 付款成功</title>
  <style>
    img {
      max-width: 100%;
      vertical-align: middle
    }
    .space-x-4 > :not([hidden]) ~ :not([hidden]) {
      --tw-space-x-reverse: 0;
      margin-right: calc(16px * var(--tw-space-x-reverse));
      margin-left: calc(16px * calc(1 - var(--tw-space-x-reverse)))
    }
    @media (max-width: 600px) {
      .sm-my-8 {
        margin-top: 32px !important;
        margin-bottom: 32px !important
      }
      .sm-px-4 {
        padding-left: 16px !important;
        padding-right: 16px !important
      }
      .sm-px-6 {
        padding-left: 24px !important;
        padding-right: 24px !important
      }
      .sm-leading-8 {
        line-height: 32px !important
      }
    }
  </style>
</head>
<body style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div style="display: none">
    感谢您耐心等候，我们已处理您的订单。
    &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
  </div>
  <div role="article" aria-roledescription="email" aria-label="真的友鬼: 🎉 付款成功" lang="en">
    <div class="sm-px-4" style="background-color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
      <table align="center" cellpadding="0" cellspacing="0" role="none">
        <tr>
          <td style="width: 552px; max-width: 100%">
            <div class="sm-my-8" style="margin-top: 48px; margin-bottom: 48px; text-align: center">
              <h1 style="font-size: 36px; color: #0f172a">真的友鬼</h1>
            </div>
            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
              <tr>
                <td class="sm-px-6" style="border-radius: 4px; background-color: #fff; padding: 48px; font-size: 16px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
                  <h1 class="sm-leading-8" style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #000">
                    订购收据
                  </h1>
                  <p style="margin: 0; line-height: 24px">
                    感谢您耐心等候，我们已处理您的订单。
                    <br>
                    您的订单详情如下，请查收：
                  </p>
                  <div role="separator" style="background-color: #e2e8f0; height: 1px; line-height: 1px; margin: 32px 0">&zwj;</div>
                  <p style="margin: 0; line-height: 24px;">
                    <strong>订单日期</strong>：${date}
                    <br>
                    <strong>配送</strong>：${shipping}

                    ${address ? '<br><strong>地址</strong>：' + address : ''}
                    
                  </p>
                  
                  <div role="separator" style="background-color: #e2e8f0; height: 1px; line-height: 1px; margin: 32px 0;">&zwj;</div>
                  <div>
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="none">
                      <thead>
                        <tr>
                          <th style="width: 50%; text-align: left">项目</th>
                          <th style="text-align: right">数量</th>
                          <th style="text-align: right;">价格</th>
                        </tr>
                      </thead>
                      <tbody>`
                        let email_template_2 = `</tbody>
                    </table>

                    <p style="text-align: right; font-size: 20px">
                      <strong>总额</strong>：RM ${Number(total).toFixed(2)}
                    </p>

                  </div>
                  <div role="separator" style="background-color: #e2e8f0; height: 1px; line-height: 1px; margin: 32px 0;">&zwj;</div>
                  <div class="space-x-4" style="margin: 0; display: flex; align-items: center; justify-content: space-between">
                    <p>您也可以到网站查看您的所有订单。</p>
                    <div style="margin-right: calc(16px * 0); margin-left: calc(16px * calc(1 - 0));">
                      <a href="https://真的友鬼.com" style="display: inline-block; flex-wrap: nowrap; white-space: nowrap; border-radius: 4px; padding: 16px 24px; font-size: 16px; line-height: 1; font-weight: 600; text-decoration: none; color: #f8fafc; background-color: #4338ca">
                        <!--[if mso]>
      <i style="mso-font-width: 150%; mso-text-raise: 30px" hidden>&emsp;</i>
    <![endif]-->
                        <span style="mso-text-raise: 16px">
                    真的友鬼.com &rarr;
                  </span>
                        <!--[if mso]>
      <i hidden style="mso-font-width: 150%;">&emsp;&#8203;</i>
    <![endif]-->
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr role="separator">
                <td style="line-height: 16px">&zwj;</td>
              </tr>
              <tr>
                <td style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #475569">
                  <p style="margin: 16px 0; text-transform: uppercase">
                    Powered By 友鬼小团队
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`
  
  let trows = ''

  for(let entry of entries) {
    if(entry.type === 'product') {

      if(entry.metadata.product.id === 9) {

          
          trows += `<tr>
          <td style="padding-top: 16px; padding-bottom: 16px;">
            ${entry.metadata.label}
            <p style="font-size: 14px; color: #64748b">${entry.metadata.bracelet}</p>
          </td>
          <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;">${entry.metadata.quantity}</td>
          <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;">RM ${Number(entry.metadata.price).toFixed(2)}</td>
        </tr>`

      } else {

        trows += `<tr>
        <td style="padding-top: 16px; padding-bottom: 16px;">${entry.metadata.label}</td>
        <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;">${entry.metadata.quantity}</td>
        <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;">RM ${Number(entry.value).toFixed(2)}</td>
      </tr>`

      }
    }

    if(entry.type === 'postage') {
      trows += `<tr>
      <td style="padding-top: 16px; padding-bottom: 16px;">${entry.metadata.label}</td>
      <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;"></td>
      <td style="padding-top: 16px; padding-bottom: 16px; text-align: right;">RM ${Number(entry.value).toFixed(2)}</td>
    </tr>`
    }
  }

  return email_template_1 + trows + email_template_2;


}

export const GET: APIRoute = async ({ request }) => {
  const tx = new URL(request.url).searchParams.get("tx");

  if (tx) {
    let result = await getTxByUUID(tx);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const { cartId, form, dry_run, update_metadata, user_id } = await request.json();

  // console.log(request);

  let time_1 = new Date().getTime();
  let time_2 = new Date().getTime();

  try {

    time_1 = new Date().getTime();

    let cart = await getCart(cartId);

    
    
    // Check metadata got bracelet or not

    let item_ids = Object.keys(cart.items).map((key) => parseInt(key));

    time_2 = new Date().getTime();

    console.log("getCart", (time_2 - time_1));

    time_1 = new Date().getTime();
    
    let products = (await getProductsByIds(item_ids)) as any;

    time_2 = new Date().getTime();

    console.log("getProductsByIds", (time_2 - time_1));

    

    products = products.map((product: any) => {
      return {
        ...product,
        quantity: cart.items[product?.id],
      };
    });

    // create entries

    let entries = [];
    let i = 0;

    // Check if item with ID "9" exists and handle metadata
    for (let product of products) {

      // If the product ID is 9 and there are bracelets in the metadata
      if (product.id === 9 && cart.metadata && cart.metadata.bracelets) {
        // Loop through all quantity for the product
        for (let j = 0; j < product.quantity; j++) {

          let details = "";
          if (cart.metadata.bracelets[i].effect && typeof cart.metadata.bracelets[i].effect === 'object') {
            let effects = cart.metadata.bracelets[i].effect.join(', ');
            details += `效果: ${effects}`;
          }
          if (cart.metadata.bracelets[i].size) {
            details += `\n大小: ${cart.metadata.bracelets[i].size}`;
          }
          if (cart.metadata.bracelets[i].comment) {
            details += `\n备注: ${cart.metadata.bracelets[i].comment}`;
          }

          let metadata = {
            label: `1 x ${product.name}`,
            product: product,
            quantity: 1,
            price: "RM28",
            bracelets: details
          };
    
          entries.push({
            entry_id: product.id + j,
            metadata: metadata,
            type: "product",
            value: product.price,
          });
          i++;
        }
      } else if (product.id === 10 && cart.metadata && cart.metadata.questions) {
        // Loop through all quantities for the product
        for (let j = 0; j < product.quantity; j++) {
      
          // Initialize details for each quantity
          let details: any[] = [];

          for(let i = 0; i < cart.metadata.questions[j].questionArray.length; i++) {
            details.push("问题" + (i + 1) + ": " + cart.metadata.questions[j].questionArray[i] + "\n");
          }
      
          // Metadata for each entry
          let metadata = {
            label: `1 x ${product.name}`,
            product: product,
            quantity: 1,
            price: "RM100",
            questionSet: details
          };
      
          // Push the entry into entries array
          entries.push({
            entry_id: product.id + j,
            metadata: metadata,
            type: "product",
            value: product.price,
          });
      
          i++;
        }
      } else {
        let metadata = {
          label: `${product.quantity} x ${product.name}`,
          product: product,
          quantity: product.quantity,
          price: product.price
        };
  
        entries.push({
          entry_id: product.id,
          metadata: metadata,
          type: "product",
          value: product.price * product.quantity,
        });
      }
    }

    // then we need to check if the the user opted postage
    // if yes, then we need to calculate the postage cost

    if (form.delivery_method === "postal") {
      // first divide by country

      let address_metadata = form.metadata.address_metadata;

      let postage_cost_map = {
        west_malaysia: { label: "West Malaysia", value: 10 },
        east_malaysia: { label: "East Malaysia", value: 15 },
        singapore: { label: "Singapore", value: 69.8 },
        taiwan: { label: "Taiwan", value: 71.85 },
        hong_kong: { label: "Hong Kong", value: 69.62 },
        usa: { label: "USA", value: 82.98 },
        default: { label: "Others", value: 82.98 },
      };

      let detect_non_malaysia_shipping = (_address_metadata: any) => {
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

        return postage_cost_map["default"];

      };

      let atomic_shipping_type = detect_non_malaysia_shipping(address_metadata);

      if (atomic_shipping_type === false) {
        // check if east or west malaysia

        let state = address_metadata.address_components.find((component: any) => component.types.includes("administrative_area_level_1"));

        if ((state && state.long_name === "Sabah") || state.long_name === "Sarawak") {
          atomic_shipping_type = postage_cost_map["east_malaysia"];
        } else {
          atomic_shipping_type = postage_cost_map["west_malaysia"];
        }
      }

      // the atomic postage cost is calculated, but each "unit" is bundled in 3 products
      // i.e. 1 postage cost for 3 products, if 4-6 products, then 2 postage cost

      let total_postage_cost = Math.ceil(products.length / 3) * Number(atomic_shipping_type?.value);

      entries.push({
        entry_id: "postage",
        metadata: {
          label: `Postage cost (${atomic_shipping_type?.label})`,
          atomic_shipping_type: atomic_shipping_type,
          total_postage_cost: total_postage_cost,
        },
        type: "postage",
        value: total_postage_cost,
      });
    }

    /// date formate YYYY-MMM-DD HH:MM AM/PM

    let _date = new Date();

    let formatted_date = `${_date.getFullYear()}-${_date.toLocaleString('default', { month: 'short' })}-${_date.getDate()} ${_date.getHours()}:${_date.getMinutes()} ${_date.getHours() >= 12 ? 'PM' : 'AM'}`;

    let email_template = renderEmail({
      entries: entries,
      date: formatted_date,
      shipping: form.delivery_method === "postal" ? "邮寄" : "自取",
      address: form.delivery_method === "postal" ? form.address : null,
      total: entries.reduce((acc, entry) => acc + entry.value, 0)
    });
    let email_payload = JSON.stringify({
      html: email_template,
      subject: "真的友鬼: 🎉 付款成功",
      to: [form.email],
      from: '友鬼团队 <updates@update.xn--iorx12fjnaw96i.com>'
    })

    if (dry_run) {
      let tx_data = {
        dry_run: true,
        entries: entries,
        form: form,
        metadata: {
          cart_id: cartId,
          created_at: new Date().toISOString(),
          email: email_payload
        },
        paymentType: "",
        status: "pending",
        ownerId: cart.owner,
        value: entries.reduce((acc, entry) => acc + entry.value, 0),
      };

      return new Response(JSON.stringify(tx_data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {

      if (update_metadata) {
        // update user's metadata

        let user_metadata = {
          chineseName: form.chineseName,
          englishName: form.englishName,
          phoneNumber: form.phoneNumber,
          address: form?.address,
        };

        // console.time("updateUserByID");
        time_1 = new Date().getTime();

        await updateUserByID(user_id, user_metadata);

        time_2 = new Date().getTime();

        console.log("updateUserByID", (time_2 - time_1));

      }

      time_1 = new Date().getTime();

      let tx = await createTx({
        entries: entries,
        form: form,
        metadata: {
          cart_id: cartId,
          created_at: new Date().toISOString(),
          email: email_payload
        },
        paymentType: null,
        paymentMetadata: null,
        status: "pending",
        ownerId: cart.owner,
      });

      time_2 = new Date().getTime();

      console.log("createTx", (time_2 - time_1));



      // then we also change the cart status to "checked_out"

      // console.time("updateCartStatus");
      time_1 = new Date().getTime();

      await updateCartStatus(cartId, "checked_out");

      time_2 = new Date().getTime();

      return redirect(`/pay?tx=${tx.uuid}`);
    }
  } catch (err) {
    // console.log(err);
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
};

export const PUT: APIRoute = async ({ request, redirect }) => {
  // uuid: string, status: string, paymentType: string, paymentMetadata: any
  
  let { uuid, status, paymentType, paymentMetadata } = await request.json();

  await updateTx(uuid, status, paymentType, paymentMetadata);

  return redirect(`/complete?tx=${uuid}`);

};
