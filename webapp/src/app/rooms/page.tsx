import { RoomsService } from "@/domain/service/RoomsService";
import Link from "next/link";

const getAllRooms = async () => await RoomsService.getAll();

export default async function Page() {
  const rooms = await getAllRooms();

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          <p>{room.name}</p>
          <p>Status :{room.status} </p>
          <Link href={`/rooms/${room.id}`}>Join</Link>
        </div>
      ))}
    </div>
  );
}
