const axios = require("axios");
const qs = require("querystring");

let session = {};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (!username || !password) {
        return new Response(
            JSON.stringify({
                error: "Username or password is missing",
            })
        );
    }

    const loginData = qs.stringify({
        username: username,
        password: password,
        emailHost: "ogr.deu.edu.tr",
    });

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const response = await axios.post(
        "https://debis.deu.edu.tr/debis.php",
        loginData,
        config
    );
    const cookie = response.headers["set-cookie"][0].split(";")[0];
    session = {
        cookie: cookie,
    };
    console.log(cookie);

    return new Response(
        JSON.stringify({
            cookie,
        })
    );
}
