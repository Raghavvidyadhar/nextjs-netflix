'use client'
import UnAuthPage from "@/components/unauth-page"
import { useSession } from "next-auth/react"
import { GlobalContext } from "@/context"
import ManageAccounts from "@/components/manage-accounts"
import { useContext, useEffect } from "react"
import { useParams } from "next/navigation"
import { getTVorMovieSearchResults } from "@/utils"
import CircleLoader from "@/components/circle-loader"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import MediaItem from "@/components/media-item"
import { getAllFavorites } from "@/utils"
export default function Search() {
    const { loggedInAccount,
        searchResults,
        setSearchResults,
        setPageLoader,
        pageLoader

    } = useContext(GlobalContext)

    const params = useParams()
    useEffect(() => {
        async function getSearchResults() {
            const tvShows = await getTVorMovieSearchResults('tv', params.query)
            const movies = await getTVorMovieSearchResults('movie', params.query)
            const allFavorites = await getAllFavorites(session?.user?.uid,loggedInAccount?._id)

            setSearchResults(
                [
                    ...tvShows.filter(
                        (item) => item.backdrop_path !== null && item.poster_path !== null
                    ).map(tvShowItem => ({
                        ...tvShowItem,
                        type: 'tv',
                        addedToFavorites : allFavorites && allFavorites.length ?  
                        allFavorites.map(fav=>fav.movieID).indexOf(tvShowItem.id)> 
                        -1
                        :false
                    })),
                    ...movies.filter(
                        (item) => item.backdrop_path !== null && item.poster_path !== null
                    ).map(movieItem => ({
                        ...movieItem,
                        type: 'movie',
                        addedToFavorites : allFavorites && allFavorites.length ?  
                        allFavorites.map(fav=>fav.movieID).indexOf(movieItem.id)> 
                        -1
                        :false

                    }))
                ]);
            setPageLoader(false)


            console.log(tvShows, movies);

        }

        getSearchResults()

    }, [loggedInAccount])


    const { data: session } = useSession()


    if (session === null) return <UnAuthPage></UnAuthPage>
    if (loggedInAccount === null) return <ManageAccounts />
    if (pageLoader) return <CircleLoader />

    return <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
    >
        <Navbar />
        <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
            <h2 className=" cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                Showing Results for {decodeURI(params.query)}

            </h2>
            <div className="grid grid-col-5 gap-3 items-center scrollbar-hide md:p-2">
                {
                    searchResults && searchResults.length ?
                        searchResults.map(searchItem => (
                            <MediaItem key={searchItem.id} media={searchItem}
                                searchView={true} />
                        ))
                        : null}


            </div>

        </div>
    </motion.div>
}