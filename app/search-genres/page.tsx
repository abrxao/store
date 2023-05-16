"use client";
import useSearchStates from "@/store/store";

export default function SearchPage() {
  const { page, allPages, } = useSearchStates();
  
  return (
    <div className="p-8">
      no results
    </div>
  );
}
