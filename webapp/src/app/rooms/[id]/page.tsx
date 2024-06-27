import RoomContainerDetail from "@/components/containers/room-detail-container";
import { RoomsService } from "@/domain/service/RoomsService";
const getRoomDetail = async (id: string) => await RoomsService.getById(id);

export default async function Page({ params }: { params: { id: string } }) {
  const room = await getRoomDetail(params.id);

  return <RoomContainerDetail room={room} />;
}
