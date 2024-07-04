globalThis.process ??= {}; globalThis.process.env ??= {};
import { v as validateSession, m as getUserData, n as newCart, o as newGuestSession } from './chunks/pages/cart_wsY3d6O-.mjs';
import { h as sequence } from './renderers.mjs';

// src/middleware.ts
// import { defineMiddleware } from "astro:middleware";


const onRequest$1 = async (context, next) => {
    // if context path's has /api, then we just return next()

    // if(context.url.pathname.startsWith('/api')) {
    //     return next()
    // }

	// // if (context.request.method !== "GET") {
	// // 	const originHeader = context.request.headers.get("Origin");
	// // 	const hostHeader = context.request.headers.get("Host");
	// // 	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
	// // 		return new Response(null, {
	// // 			status: 403
	// // 		});
	// // 	}
	// // }

	const sessionId = context.cookies.get("auth_session")?.value ?? null;

// console.log(sessionId);



	// works for both guest and auth user
	if(sessionId){

		let { session, user:auth_user, cookie } = await validateSession(sessionId);

		// then, we fetch the user data from the session

		context.locals.session = session;
		context.cookies.set(cookie.name, cookie.value, cookie.attributes);

		if(auth_user.id){

			let { user, cart, tx} = await getUserData(auth_user.id);


			// console.log(cart)

			if (cart?.length <= 0) {
				await newCart(auth_user.id);
				let new_data = await getUserData(auth_user.id);
				cart = new_data.cart;
			}
			

			context.locals.user = user;
			context.locals.cart = cart[0];
			context.locals.tx = tx;

		}
		
	} else {

		// make a guest session

		let { user:auth_user, cookie, session} = await newGuestSession({});
		// console.log(result);
		// create a new cart for the guest

		context.locals.session = session;
		context.cookies.set(cookie.name, cookie.value, cookie.attributes);

		await newCart(auth_user.id);

		let { user, cart, tx} = await getUserData(auth_user.id);

		context.locals.user = user;
		context.locals.cart = cart[0];
		context.locals.tx = tx;

		

	}

	// first validate the session


	
	// if (!sessionId) {
	// 	context.locals.user = null;
	// 	context.locals.session = null;
	// 	return next();
	// }

	// return next();

	// const { session, user } = await lucia.validateSession(sessionId);

	// if (!session?.siwe){
	// 	await lucia.invalidateUserSessions(String(user?.id));
	// 	context.locals.user = null;
	// 	context.locals.session = null;
	// 	return next();
	// }

	// if (session && session.fresh) {
	// 	const sessionCookie = lucia.createSessionCookie(session?.id);
	// 	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	// }
	// if (!session) {
	// 	const sessionCookie = lucia.createBlankSessionCookie();
	// 	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	// }
	// context.locals.session = session;
	// context.locals.user = user;
	// return next();


	return next();

    
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
