const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

//usage 127.0.0.1:3000/api/semesters?session=pni2dnduk5vmtuv1n4iel33ena

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const session = searchParams.get("session");

    if (!session) {
        return new Response(
            JSON.stringify({
                error: "Session is missing",
            })
        );
    }

    try {
        //first form name -> form_donem  select-id -> ogretim_donemi_id select-name -> ogretim_donemi_id
        //hidden inputs relative-> ../../..  ogrenci_no -> 2017280078  liste -> ""
        //second form name -> form_ders  select-id -> ders select-name -> ders
        //hidden inputs -> ogretim_donemi_id "294" -> ogrenci_no "2017280078" -> liste "" -> relative ../../..

        const response = await axios.get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            {
                headers: {
                    Cookie: "PHPSESSID=" + session,
                    Host: "debis.deu.edu.tr",
                },
                responseType: "arraybuffer",
            }
        );
        const decodedBody = iconv.decode(response.data, "ISO-8859-9"); // Convert Latin1 to UTF-8
        const $ = cheerio.load(decodedBody, {
            decodeEntities: false,
        });
        const options = $("#ogretim_donemi_id").find("option");
        const optionsArray = [];
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
                semesters: optionsArray,
            })
        );
    } catch (error) {
        console.error(error);
        return;
    }
}
