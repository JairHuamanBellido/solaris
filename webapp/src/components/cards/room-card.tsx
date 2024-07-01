import { RoomsModel } from "@/domain/model/Rooms.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

interface Props {
  room: RoomsModel;
}
export default function RoomCard({ room }: Props) {
  return (
    <Card className="bg-card w-[360px]">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>Status: {room.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link className="underline" href={`/rooms/${room.id}`}>
          Enter
        </Link>
      </CardContent>
    </Card>
  );
}
