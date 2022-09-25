import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  service: string;
  link: string;
}

const Member: React.FC<Props> = ({ id, name, service, link }) => (
  <div>
    <Image
      src={`/assets/team/pannel_services_${id}.svg`}
      alt={name}
      width={1366}
      height={1555}
    />
    <div className="text-2xl xl:text-3xl">{name}</div>
    <div className="text-xl">
      <Link href={link}>
        <a target="_blank">{service}</a>
      </Link>
    </div>
  </div>
);

export default Member;
