"use client";
import MovieCard from "@/components/MovieCard";
import GenreSearch from "@/components/SGcomponents/GenreSearch";
import SkeletonCreator from "@/components/SkeletonCreator";
import { Button, Chip } from "@material-tailwind/react";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import { BsSearch } from "react-icons/bs";
import PrevNextButton from "@/components/SGcomponents/NextPrevButtons";
import Link from "next/link";
import useSearchStates from "@/store/store";

export default function SearchPage() {
  const { page, allPages, } = useSearchStates();
  
  return (
    <div className="p-8">
      no results
    </div>
  );
}
