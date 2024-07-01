import RoomCard from "@/components/cards/room-card";
import { Heading2, Paragraph } from "@/components/typography";
import { RoomsService } from "@/domain/service/RoomsService";

const getAllRooms = async () => await RoomsService.getAll();

export default async function Page() {
  const rooms = await getAllRooms();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Heading2>Rooms</Heading2>
        <Paragraph>{rooms.length} room(s)</Paragraph>
      </div>

      {rooms.map((room) => (
        <RoomCard room={room} />
      ))}
    </div>
  );
}
