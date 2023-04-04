
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";

interface MovieCProps{
    children?:ReactNode,
    title: string,
    runtime?:string
    directors?: [string]
    metacritic?: number
    src: string
}

const MovieCard: FunctionComponent<MovieCProps> = ({src, title})=>{
    return(
        <Card
      shadow={false}
      className="relative grid w-[300px] aspect-[3/4] items-end justify-center overflow-hidden text-center"
      >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full"
      > 
        <Image src={src} className="object-cover" width={300} height={300} alt=""/>
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
        <Typography variant="h5" className="mb-4 text-gray-400">
          Candice Wu
        </Typography>
        <Avatar
          size="xl"
          variant="circular"
          alt="candice wu"
          className="border-2 border-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </CardBody>
    </Card>
    )
}

export default MovieCard;