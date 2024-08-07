globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, e as createAstro } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$LoginBare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginBare;
  return renderTemplate(_a || (_a = __template([`<!-- ---
// Didn't use alr
import { signUp, signOut } from '../lib/tarpit_gql'

// const local = Astro.locals as { cart: any, user: any }
// if(local) {
//   let { cart, user } = local
// }

if (Astro.request.method === "POST") {
  try {
    const data = await Astro.request.formData();
    // const name = data.get("username");
    
    const operation = String(data.get("operation"));
    
    if(operation == "logout") {

      await signOut(Astro.locals?.user?.email)
      
      Astro.cookies.delete("auth_session")
      return Astro.redirect('/')
    }
    
    if(operation === "signup"){

      const email = String(data.get("email"))
      const password = String(data.get("password"));

      // Do something with the data
      const encoder = new TextEncoder();
      const encoded_data = encoder.encode(String(password));

      let password_signature = await crypto.subtle.digest("SHA-256", encoded_data)
      const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string

      // console.log(email, hashHex,operation);

      let result = await signUp(email,hashHex)

      if(result) {
        const { user,session,cookie} = result
        
        console.log(user,session,cookie)
  
        Astro.cookies.set(cookie.name, cookie.value, cookie.attributes)

        return Astro.redirect('/')

      }

    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}


---


<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghost Remake</title>
</head>
<body>

    <h1>Sign Up</h1>

     {JSON.stringify(cart)}
     {JSON.stringify(user)} 

    
    <form id="signup_form" method="POST">
        <input hidden name="operation" value="signup">
        <input id="signup_email" name="email" type="email" placeholder="email">
        <input id="signup_password" name="password" type="password" placeholder="password">

        <button type="submit">Sign Up</button>
    </form>
  
    <h1>Login</h1>

    
    <form id="login_form" method="post">
        <input id="login_email" name="email" type="email" placeholder="email">
        <input id="login_password" name="password" type="password" placeholder="password">

        <button type="submit">Login</button>
    </form>

    <form method="post">
      <input hidden name="operation" value="logout">
        <button type="submit">Logout</button>
    </form>


    <script> 

       


        // document.getElementById("signup_form")?.addEventListener('submit', async (e)=>{
        //     e.preventDefault()

        //     const email = document.getElementById("signup_email")?.value
        //     const password = document.getElementById("signup_password")?.value
            
        //     const encoder = new TextEncoder();
        //     const data = encoder.encode(password);

        //     let password_signature = await crypto.subtle.digest("SHA-256", data)
        //     const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
        //     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
            

        //     console.log(email,hashHex)

        //     // call the /signup.json endpoint
        //     let result = await fetch("/api/signup.json", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             signature: hashHex,
        //             destination: '/'
        //         })
        //     })

        //     result = await result.json()

        //     console.log(result)

        // })


        document.getElementById("login_form")?.addEventListener('submit', async (e)=>{
            e.preventDefault()

            const email = document.getElementById("login_email")?.value
            const password = document.getElementById("login_password")?.value
            
            const encoder = new TextEncoder();
            const data = encoder.encode(password);

            let password_signature = await crypto.subtle.digest("SHA-256", data)
            const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
            

            console.log(email,hashHex)
        })



    <\/script>

</body>
</html> -->`])));
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/login_bare.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/login_bare.astro";
const $$url = "/login_bare";

export { $$LoginBare as default, $$file as file, $$url as url };
