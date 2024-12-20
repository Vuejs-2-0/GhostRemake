export async function POST({ request }) {

    const { address } = await request.json();

    console.log('address', address);

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDZ4CXCTm6__5wf_IOlBA9L5JbLm7-sR3I`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { results, status } = await response.json();

    console.log('results', results);

    if (status == "OK") {
        return new Response(
            JSON.stringify(results), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
    } else {

        return new Response(JSON.stringify({ error: 'Invalid address' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}