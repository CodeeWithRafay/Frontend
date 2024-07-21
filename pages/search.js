import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link"; // Import Link from Next.js
import { databases } from "./api/search";
import { Query } from "appwrite"; // Import Query directly from Appwrite

const Search = () => {
  const router = useRouter();
  const { query } = router.query;

  const [activeTab, setActiveTab] = useState("Blogs");
  const [data, setData] = useState({
    Videos: [],
    Blogs: [],
    portfolio: [],
  });
  const [categoryCounts, setCategoryCounts] = useState({
    Videos: 0,
    Blogs: 0,
    portfolio: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        // Fetch data for all categories
        const videosResponse = databases.listDocuments(
          "65e6a28976615aa73abb",
          "6683705f0023464bd1dc",
          [Query.search("VideoTitle", query)]
        );

        const blogsResponse = databases.listDocuments(
          "65e6a28976615aa73abb",
          "65e6a2957e9c71c0db5c",
          [Query.search("title", query)]
        );

        const portfolioResponse = databases.listDocuments(
          "65e6a28976615aa73abb",
          "66594c42003b5b5332f7",
          [Query.search("ProjectTitle", query)]
        );

        // Wait for all responses to resolve
        const [videosResult, blogsResult, portfolioResult] = await Promise.all([
          videosResponse,
          blogsResponse,
          portfolioResponse,
        ]);

        // Update state with fetched data
        setData({
          Videos: videosResult.documents || [],
          Blogs: blogsResult.documents || [],
          portfolio: portfolioResult.documents || [],
        });

        // Update category counts
        setCategoryCounts({
          Videos: videosResult.documents ? videosResult.documents.length : 0,
          Blogs: blogsResult.documents ? blogsResult.documents.length : 0,
          portfolio: portfolioResult.documents ? portfolioResult.documents.length : 0,
        });
      } catch (error) {

      }
    };

    fetchData(); // Always fetch data when component mounts or activeTab/query changes
  }, [activeTab, query]);

  const getSlugUrl = (item) => {
    switch (activeTab) {
      case "Videos":
        return item.VideoSlug || item.slug || "";
      case "Blogs":
        return item.BlogSlug || item.slug || ""; // Adjust to BlogSlug or slug depending on your data structure
      case "portfolio":
        return item.portfolioSlug || item.slug || "";
      default:
        return "";
    }
  };

  return (
    <>
      <Head>
        <title>Search | CodeWithRafay</title>
      </Head>

      <div className="min-h-screen">
        <div className="my-5">
          <h1 className="text-center text-2xl md:text-3xl mb-3 font-semibold dark:text-white">
            Results for query:{" "}
            <span className="text-purple-600 dark:text-purple-500">
              {query}
            </span>
          </h1>
        </div>
        <div className="py-4">
          <div className="flex ml-8 dark:text-gray-400">
            {[ "Blogs", "Videos", "portfolio"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-2 text-md font-medium border-b-2 ${
                  activeTab === tab ? "border-purple-600" : "border-transparent"
                } focus:outline-none`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                {categoryCounts[tab]})
              </button>
            ))}
          </div>
          <div className="">
            <div className="relative overflow-x-scroll md:overflow-hidden shadow-md rounded-lg m-5 md:ml-10">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-purple-400">
                  <tr>
                    <th scope="col" className="px-4 md:px-6 font-semibold py-3">
                      {activeTab === "Videos" &&
                        `IN VIDEO & VIDEO SERIES (${categoryCounts.Videos} RESULTS FOUND)`}
                      {activeTab === "Blogs" &&
                        `IN BLOGS (${categoryCounts.Blogs} RESULTS FOUND)`}
                      {activeTab === "portfolio" &&
                        `IN portfolio (${categoryCounts.portfolio} RESULTS FOUND)`}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data[activeTab].length > 0 ? (
                    data[activeTab].map((item) => (
                      <tr
                      key={item.$id}
                      className="bg-white border-b dark:bg-slate-700 dark:border-gray-700 hover:bg-purple-200 dark:hover:bg-slate-500 transition-all"
                    >
                      <td className="px-6 py-4 border-b">
                        <Link
                          href={`/${activeTab.toLowerCase() === "blogs" ? "blogpost" : activeTab.toLowerCase()}/${getSlugUrl(item)}`}
                          className="block font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                        >
                          {item.VideoTitle || item.title || item.ProjectTitle || item.name}
                        </Link>
                      </td>
                    </tr>
                    
                    
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-4 font-semibold text-lg dark:bg-slate-700 text-black dark:text-white"
                        colSpan="2"
                      >
                        No Data
                      </td>
                    </tr> 
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
