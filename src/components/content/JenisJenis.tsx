'use client';

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ContentSection from "../ContentSection";
 
export default function JenisJenis() {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);
 
  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value:any) => setOpen(open === value ? 0 : value);

  const dataTraditional = [
        {
        id: 1,
        category: "Teater Tradisional",
        title: "Teater Rakyat",
        description: `<p>Teater tradisional rakyat adalah jenis teater yang lahir dari spontanitas kehidupan dalam masyarakat yang dihayati dan berkembang sesuai dengan perkembangan masyarakatnya. Umumnya, teater ini berkembang karena dorongan kebutuhan masyarakat terhadap suatu hiburan</p>
        <p>Ciri-ciri teater tradisional rakyat sebagai berikut.</p>
        <ul>
        <li>Cerita tanpa naskah dan digarap berdasarkan peristiwa sejarah, dongeng, mitologi atau kehidupan sehari-hari.</li>
        <li>Penyajian dengan dialog, tarian, dan nyanyian.</li>
        <li>Unsur lawakan selalu muncul.</li>
        <li>Nilai dari pelaku dramatik dilakukan secara spontan dan dalam satu adegan</li>
        </ul>`,
        imageUrl: "https://i0.wp.com/bebaspedia.com/wp-content/uploads/2021/01/Seni-teater-tradisional-Ketoprak.jpg"
        },
        {
        id: 2,
        category: "Teater Tradisional",
        title: "Teater Klasik",
        description: `<p>Teater klasik mirip dengan teater tradisional hanya saja dari segi cerita, pelaku, hingga tempat pertunjukkan sudah diatur dan dilatih dengan baik.</p>
        <p>Pertunjukannya pun tidak menyatu dengan penonton. Contoh teater klasik adalah wayang orang, wayang kulit, wayang golek, dan teater Jingju.</p>`,
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgR6zZFViunJiSx9_tbEUbc0SvxKnEP7YMsUPkQ6KLnyM0Ds705KVdtb6BfA-_1rulOA9qWlCcBy7_ZL2hC77_t9HCZWWsOalChsX7ff0RnPGnuhVD6QDEJdeoiXWtKZ0Km6XsNL5J5Vz38/s1600/Teater+Tradisional.jpg"},
        {
        id: 3,
        category: "Teater Tradisional",
        title: "Teater Transisi",
        description: `<p>Teater Transisi adalah sebuah teater yang sumbernya dari teater tradisional namun gaya penyajiannya sudah dipengaruhi oleh teater barat.</p>`,
        imageUrl: "https://jessicaliliyan.wordpress.com/wp-content/uploads/2015/01/teater-reneissance.jpg"},
    ];

    const dataModern = [
        {
        id: 1,
        category: "Teater Modern",
        title: "Teatrikalisasi Puisi",
        description: `<p>Teatrikalisasi puisi merupakan pertunjukan teater yang dibuat berdasarkan karya sastra puisi. Karya puisi yang biasanya hanya dibacakan, dalam teatrikal puisi dicoba untuk diperankan di atas pentas. Karena bahan dasarnya adalah puisi maka teatrikalisasi puisi lebih mengedepankan estetika puitik di atas pentas.</p>`,
        imageUrl: "https://indonesiakaya.com/wp-content/uploads/2020/11/IMG1179.jpg"
        },
        {
        id: 2,
        category: "Teater Modern",
        title: "Teater Dramatik",
        description: `<p>Teater dramatik merupakan bentuk pertunjukan teater yang pementasannya dibuat dengan sangat detail. Mulai dari tokoh, kejadian, hingga alur cerita dibuat menyerupai kisah aslinya sehingga menarik perhatian penonton terhadap sebuah cerita yang disajikan</p>`,
        imageUrl: "https://asset.kompas.com/crops/e1eQyY7CoN6btkj9zw_zGyIgxQ4=/0x0:0x0/750x500/data/photo/2020/01/16/5e2091a9efdca.jpg"},
        {
        id: 3,
        category: "Teater Modern",
        title: "Teater Gerak",
        description: `<p>Teater gerak ini adalah suatu pertunjukan teater yakni dengan unsur utamanya ialah gerak serta juga ekspresi wajah para pemainnya. Di dalam pementasannya, penggunaan dialog ini sangat minimal atau juga bahkan dihilangkan ialah seperti dalam pertunjukan pantomim klasik.</p>`,
        imageUrl: "https://blog-static.mamikos.com/wp-content/uploads/2022/10/Jenis-Jenis-Teater-Kontemporer-Beserta-Penjelasannya-Lengkap.jpg"},
        {
            id: 4,
            category: "Teater Modern",
            title: "Teater Boneka",
            description: `<p>Teater boneka merupakan pertunjukan seni dengan boneka sebagai tokohnya yang dimainkan oleh dalang. Teater ini mengombinasikan permainan peran dengan obyek. Penampilan teater boneka banyak menyertakan kegiatan seni lain, seperti tari, karawitan, seni rupa, dan sastra. Teater boneka dapat digunakan sebagai media pembentukann karakter, pendidikan, juga pencerahan bagi masyarakat.</p>`,
            imageUrl: "https://student-activity.binus.ac.id/stmanis/wp-content/uploads/sites/60/2018/04/teater-boneka.jpg"},
            {
                id: 5,
                category: "Teater Modern",
                title: "Drama Musikal",
                description: `<p>Drama musikal adalah sebuah pertunjukan seni drama yang dipadukan dengan musik, diisi dengan gerak berirama, dan terdapat dialog didalamnya.</p>`,
                imageUrl: "https://mmc.tirto.id/image/otf/970x0/2020/12/01/anugerah-terindah6-mola-tv_ratio-16x9.jpg"},
    ];
 
  return (
    <>
    <div className="mt-8">
      <Accordion open={alwaysOpen}>
        <AccordionHeader onClick={handleAlwaysOpen}>
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-[#2968A3] lg:leading-tight xl:text-4xl xl:leading-tight">
        Jenis-Jenis Seni Teater
        </h1>
        </AccordionHeader>
        <AccordionBody>
          

            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
            <p>
            Jenis-jenis Seni Teater adalah sebagai berikut:
            </p>
            <ul className="">
                <li>Teater Tradisional</li>
                <li>Teater Modern</li>
            </ul>
            </div>
          

        </AccordionBody>
      </Accordion>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Teater Tradisional
        </AccordionHeader>
        <AccordionBody>
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg mb-6">
            <p>
            Teater Tradisional adalah teater yang mementingkan nilai-nilai tradisi dan kearifan lokal
            yang dimiliki oleh suatu daerah. Teater ini biasanya mengangkat cerita-cerita rakyat yang
            sudah ada sejak zaman dahulu. Contoh teater tradisional di Indonesia adalah Wayang Kulit,
            Wayang Orang, dan Teater Melayu.
            </p>
            </div>
          
            {dataTraditional.map((item) => (
                <div key={item.id} className="">
                    <ContentSection data={item} />
                </div>
            ))}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Teater Modern
        </AccordionHeader>
        <AccordionBody>
             <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg mb-6">
            <p>
            Teater Modern adalah teater yang mengangkat cerita-cerita yang lebih aktual dan sesuai
            dengan keadaan zaman sekarang. Teater ini biasanya mengangkat cerita-cerita yang lebih
            universal dan mudah dimengerti oleh penonton. Contoh teater modern di Indonesia adalah
            Sandiwara, Opera, dan Drama.
            </p>
            </div>

            {dataModern.map((item) => (
                <div key={item.id} className="">
                    <ContentSection data={item} />
                </div>
            ))}
         
        </AccordionBody>
      </Accordion>
      </div>
    </>
  );
}