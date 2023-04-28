const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const qs = require("querystring");

//usage: 127.0.0.1:3000/api/courses?session=pni2dnduk5vmtuv1n4iel33ena&semester=294

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const session = searchParams.get("session");
    const semester = searchParams.get("semester");

    if (!session) {
        return new Response(
            JSON.stringify({
                error: "Session is missing",
            })
        );
    }

    try {
        const semesterData = qs.stringify({
            ogretim_donemi_id: semester,
        });

        const config = {
            headers: {
                Cookie: "PHPSESSID=" + session,
                Host: "debis.deu.edu.tr",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            responseType: "arraybuffer",
        };

        const response = await axios.post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            semesterData,
            config
        );
        const decodedBody = iconv.decode(response.data, "ISO-8859-9"); // Convert Latin1 to UTF-8
        const $ = cheerio.load(decodedBody, {
            decodeEntities: false,
        });
        const optionsArray = [];
        const options = $("#ders").find("option");
        options.each((i, element) => {
            const option = {
                value: $(element).attr("value"),
                text: $(element).text(),
            };
            optionsArray.push(option);
        });
        optionsArray.shift();

        return new Response(
            JSON.stringify({
                courses: optionsArray,
            })
        );
    } catch (error) {
        console.error(error);
    }
}
