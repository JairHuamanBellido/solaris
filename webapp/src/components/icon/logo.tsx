import { Sigma } from "lucide-react";

export default function SolarisLogo() {
  return (
    <div className="relative">
      <Sigma
        className=""
        size={32}
        style={{ filter: "drop-shadow(0px 0px 8px rgb(0 255 255 / 1))" }}
      />
      <Sigma
        className="animate-ping absolute top-0 left-0"
        size={32}
        style={{ filter: "drop-shadow(0px 0px 8px rgb(0 255 255 / 1))" }}
      />
    </div>
  );
}
