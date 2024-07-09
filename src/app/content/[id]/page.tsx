import JenisJenis from "@/components/content/JenisJenis";
import Sejarah from "@/components/content/Sejarah";
import { Container } from "@/components/ui/container";


export default function page({ params }: { params: { id: string } }) {
    let componentToRender;

    switch (params.id) {
        case "1":
            componentToRender = <Sejarah />;
            break;
        case "2":
            componentToRender = <JenisJenis />;
            break;
        default:
            componentToRender = <p>Content not found</p>;
    }

    return (
        <Container className="-mt-8">
            {componentToRender}
        </Container>
    );
}