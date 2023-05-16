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
  genres?: [string];
  plot?: string;
  metacritic: number;
  src: string;
}

const MovieCard: FunctionComponent<MovieCProps> = ({
  src,
  title,
  metacritic,
  genres,
  plot,
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
      className="group relative grid border w-cardMovie aspect-[3/4] items-end justify-center overflow-hidden text-center drop-shadow-card-lg  hover:drop-shadow-card-2xl hover:-translate-x-2 hover:-translate-y-2 duration-200 m-4"
    >
      <div
        style={{
          backgroundColor: getRGBColor(metacritic),
        }}
        className="absolute z-40 top-4 left-4 rounded border shadow-lg  duration-200"
      >
        <Tooltip content="Metacritic Score">
          {metacritic ? (
            <Chip value={`${metacritic}`} className="p-2 bg-" />
          ) : (
            <Chip value="not found :(" className="p-2 bg- aspect-1" />
          )}
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
          className="object-cover movieCard"
          width={300}
          height={300}
          alt={`${title} card`}
          onErrorCapture={() => setIsLoaded(false)}
        />
        <div className=" absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/50
        group-hover:from-black group-hover:via-black
        " />
      </CardHeader>
      <CardBody className="relative duration-200  translate-y-0 group-hover:-translate-y-32 py-14 px-6 md:px-12">
        <Typography
          variant="h4"
          color="white"
          className="mb-3 md:font-medium leading-[1.5] text-xl"
        >
          {title}
        </Typography>
        <div className="translate-y-32 h-0 w-full 
         group-hover:translate-y-0 duration-200 ">
          <div className="line-clamp-4 text-gray-200 my-4 md:text-base text-base">
            {plot}
          </div>

          <div className="flex gap-4 flex-wrap ">
            {genres?.map((elem) => {
              return (
                <Chip
                  size="sm"
                  className="text-gray-200 bg-gray-900"
                  value={elem}
                  key={elem}
                />
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
