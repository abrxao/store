import useSearchStates from "@/store/store";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
interface PrevNextProps {
  page: number;
  pages: number;
  genre: string;
}
const PrevNextButton: FunctionComponent<PrevNextProps> = ({
  page,
  pages,
  genre,
}) => {
  function redirect(url: string) {
    window.location.href = url;
  }
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={(e) => redirect(`/search-genres/${genre}:page=${page - 1}`)}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography className="font-normal text-gray-500">
        Page <strong className="text-gray-200">{page}</strong> of{" "}
        <strong className="text-gray-200">{pages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={(e) => redirect(`/search-genres/${genre}:page=${page + 1}`)}
        disabled={page === pages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};
export default PrevNextButton;
