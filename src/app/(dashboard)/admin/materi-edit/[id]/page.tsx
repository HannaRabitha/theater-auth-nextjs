import MateriEditForm from "@/components/form/MateriEdit";
import { Container } from "@/components/ui/container";

 
export default function page({ params }: { params: { id: string } }) {
    
    return (
        <Container>
            <MateriEditForm params={params} />
        </Container>
    )
  }