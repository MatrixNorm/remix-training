import { useParams } from "@remix-run/react";

export default function () {
  const { cityName } = useParams();
  return <div>{cityName}</div>;
}
