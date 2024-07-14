import JenisJenis from "@/components/content/JenisJenis";
import Sejarah from "@/components/content/Sejarah";
import ContentSection from "@/components/ContentSection";
import { Container } from "@/components/ui/container";
import { db } from "@/lib/db";


const page = async({ params }: { params: { id: string } }) => {
    let componentToRender;

    let id = params.id;
    let data = await db.materi.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    console.log(data, 'data');
    

    switch (params.id) {
        case "1":
            componentToRender = <Sejarah />;
            break;
        case "2":
            componentToRender = <JenisJenis />;
            break;
        default:
            componentToRender = <ContentSection data={data} />;
    }

    return (
        <Container className="-mt-8">
            {componentToRender}
        </Container>
    );
}

export default page;