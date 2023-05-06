"use client";
import MovieCard from "@/components/MovieCard";
import SearchProvider, {
  useSearchContext,
} from "@/components/SGcomponents/SearchContext";
import GenreSearch from "@/components/SGcomponents/GenreSearch";
import SkeletonCreator from "@/components/SkeletonCreator";
import { Button, Chip } from "@material-tailwind/react";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import { BsSearch } from "react-icons/bs";
import PrevNextButton from "@/components/SGcomponents/NextPrevButtons";

function SearchPage() {
  const searchContext = useSearchContext();
  if (!searchContext) return null;
  const { movies, page, allPages, handleSubmit, loadingSearch } = searchContext;

  return (
    <div className="min-h-[100vh] bg-gray-800">
      <div
        className="bg-gray-900 drop-shadow-card-lg w-full flex flex-col items-end p-4
        md:py-6 md:px-12 
      "
      >
        <div className="py-2">
          <label htmlFor="genres_input" className="text-gray-200 font-thin">
            Procure por gênero
          </label>
        </div>
        <form>
          <div className="flex gap-2 items-center">
            <GenreSearch />
            {loadingSearch ? (
              <div className=" overflow-hidden rounded-md">
                <SkeletonCreator
                  className="w-full border overflow-hidden rounded-md cursor-wait brightness-110"
                  quantity={1}
                >
                  <Button
                    disabled={loadingSearch}
                    className="flex items-center p-1 gap-2 
                    md:p-2"
                  >
                    <UseAnimations
                      animation={infinity}
                      fillColor="#fff"
                      strokeColor="#fff"
                    />
                  </Button>
                </SkeletonCreator>
              </div>
            ) : (
              <Button
                type="submit"
                onClick={(e) => handleSubmit(e, 0)}
                className="brightness-110 items-center p-3
                md:p-3"
                disabled={loadingSearch}
              >
                <BsSearch className="text-md" />
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="w-full flex flex-col items-center">
        {movies.length === 0 && (
          <div>
            {loadingSearch && (
              <div className="p-4 flex flex-wrap justify-around gap-4">
                <SkeletonCreator
                  className="w-[300px] aspect-[3/4] rounded-lg"
                  quantity={10}
                />
              </div>
            )}
          </div>
        )}
        {movies.length > 0 && (
          <>
            <div className="flex flex-col gap-4 mt-4">
              <Chip
                value={`page ${page + 1} of ${allPages}`}
                className="rounded p-2 text-center text-xsm bg-gray-300 text-gray-800 drop-shadow"
              />
              <PrevNextButton page={page} pages={allPages} />
            </div>

            <div className="w-full p-2 flex flex-wrap justify-center gap-y-6 md:gap-8">
              {loadingSearch && (
                <>
                  <SkeletonCreator
                    className="w-cardMovie aspect-[3/4] rounded-lg"
                    quantity={10}
                  />
                </>
              )}
              {!loadingSearch &&
                movies.map((elem, index) => {
                  return (
                    <MovieCard
                      src={elem.poster}
                      title={elem.title}
                      key={index + 1}
                      metacritic={elem.metacritic}
                    />
                  );
                })}
            </div>
            <PrevNextButton page={page} pages={allPages} />
          </>
        )}
      </div>
    </div>
  );
}

const Home = () => (
  <SearchProvider>
    <SearchPage />
  </SearchProvider>
);
export default Home;
