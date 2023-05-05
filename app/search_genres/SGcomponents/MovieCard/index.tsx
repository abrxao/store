import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/image";
import { FunctionComponent, ReactNode, useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
interface MovieCProps {
  children?: ReactNode;
  title: string;
  runtime?: string;
  directors?: [string];
  metacritic: number;
  src: string;
}

const MovieCard: FunctionComponent<MovieCProps> = ({
  src,
  title,
  metacritic,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  function getRGBColor(value: number): string {
    const red = Math.round(((115 - value) * 255) / 100);
    const green = Math.round((value * 255) / 100);
    return `rgb(${red}, ${green}, 40)`;
  }
  return (
    <Card
      shadow={false}
      className="relative grid w-cardMovie aspect-[3/4] items-end justify-center overflow-hidden text-center drop-shadow-card-lg hover:drop-shadow-card-2xl duration-200"
    >
      <div
        style={{
          backgroundColor: getRGBColor(metacritic),
        }}
        className="absolute z-40 top-4 left-4 rounded"
      >
        <Tooltip content='Metacritic Score'>
          <Chip value={`${metacritic}`} className="p-2 bg-" />
        </Tooltip>
      </div>

      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full"
      >
        {!isLoaded && (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center">
            <p>IMAGE NOT FOUND</p>
            <TfiFaceSad size={40} />
          </div>
        )}
        <Image
          src={src}
          className="object-cover movieCard hover:zoom"
          width={300}
          height={300}
          alt={`${title} card`}
          onErrorCapture={() => setIsLoaded(false)}
        />
        <div className=" absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h4"
          color="white"
          className="mb-3 font-medium leading-[1.5]"
        >
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
