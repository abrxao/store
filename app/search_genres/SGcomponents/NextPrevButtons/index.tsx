import { Button } from "@material-tailwind/react";
import { FormEvent, FunctionComponent } from "react";
import { useSearchContext } from "../SearchContext";
interface PrevNextProps {
  page: number;
  pages: number;
}
const PrevNextButton: FunctionComponent<PrevNextProps> = ({ page, pages }) => {
  const searchContext = useSearchContext();
  if (!searchContext) return null;
  const { handleSubmit, loadingSearch } = searchContext;

  return (
    <form className="py-2">
      <div className="flex gap-4">
        <Button
          type="submit"
          className="p-2 rounded"
          onClick={(e) => handleSubmit(e, page - 1)}
          disabled={page === 0 || loadingSearch}
        >
          prev
        </Button>
        <Button
          type="submit"
          className="p-2 rounded"
          onClick={(e) => handleSubmit(e, page + 1)}
          disabled={page === pages || loadingSearch}
        >
          next
        </Button>
      </div>
    </form>
  );
};
export default PrevNextButton;
