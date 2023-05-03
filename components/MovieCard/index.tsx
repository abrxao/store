import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import Image from "next/image";
import { FunctionComponent, ReactNode, useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
interface MovieCProps {
  children?: ReactNode;
  title: string;
  runtime?: string;
  directors?: [string];
  metacritic?: number;
  src: string;
}

const MovieCard: FunctionComponent<MovieCProps> = ({ src, title }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  return (
    <Card
      shadow={false}
      className="relative grid w-cardMovie aspect-[3/4] items-end justify-center overflow-hidden text-center"
    >
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
