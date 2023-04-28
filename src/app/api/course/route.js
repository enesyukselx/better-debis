const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const qs = require("querystring");

//usage: 127.0.0.1:3000/api/course?session=pni2dnduk5vmtuv1n4iel33ena&semester=294&course=1

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const session = searchParams.get("session");
    const semester = searchParams.get("semester");
    const course = searchParams.get("course");

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
        const courseData = qs.stringify({
            ogretim_donemi_id: semester,
            ders: course,
        });

        const courseResponse = await axios.post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            courseData,
            config
        );

        const decodedCourseBody = iconv.decode(
            courseResponse.data,
            "ISO-8859-9"
        ); // Convert Latin1 to UTF-8

        const $$ = cheerio.load(decodedCourseBody, {
            decodeEntities: false,
        });

        //<table style="margin-top:10px" width="100%" cellspacing="0" cellpadding="0" border="1" bgcolor="99CCFF">
        const table = $$(
            'table[style="margin-top:10px"] > tbody > tr > td > table'
        );

        //find all td elements
        const td = table.find("td");
        const courseDetails = [];
        for (let i = 0; i < td.length; i++) {
            courseDetails.push(td.eq(i).text());
        }
        // 11 -> credit
        // 14 -> type
        // 20 -> professor
        // 23 -> status

        const courseArr = {
            credit: courseDetails[11],
            type: courseDetails[14],
            professor: courseDetails[20],
            status: courseDetails[23],
            results: [],
        };
        courseDetails.forEach((element, index) => {
            if (
                element == "Vize" ||
                element == "Final" ||
                element == "Bütünleme Notu" ||
                element == "Ödev" ||
                element == "Quiz" ||
                element == "Vize / Ödev"
            ) {
                courseArr.results.push({
                    name: courseDetails[index],
                    avarage: courseDetails[index + 2],
                    result: courseDetails[index + 4],
                });
            }

            if (
                element == "Yarıyıl Sonu Başarı Notu" ||
                element == "Bütünleme Sonu Başarı Notu" ||
                element == "Başarı Notu"
            ) {
                courseArr.results.push({
                    name: courseDetails[index],
                    result: courseDetails[index + 4],
                });
            }
        });

        return new Response(
            JSON.stringify({
                courseArr,
            })
        );
    } catch (error) {
        console.error(error);
    }
}
