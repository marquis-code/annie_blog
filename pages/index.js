import Head from "next/head";
// import {useState} from 'react'
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const Home = ({ posts = [] }) => {

  return (
    <div>
      <Head>
        <title>Home - Annie's blog</title>
        <meta name="description" content="welcome to annie's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
         <div className="relative">
           <img src='/blog4.jpeg' className="w-full" alt="blog-image"  />
           <div className="absolute z-50 top-10 md:top-20 md:left-3 opacity-70 text-white font-black p-2 space-y-3">
              <h1 className="md:text-5xl font-sans text-2xl font-bold tracking-wide text-center text-gray-900">Welcome to Annie's Blog</h1>
              <p className="font-sans font-medium text-base text-center text-teal-200">Explore. Learn. Publish</p>
         </div>
         </div>
         <h1 className="font-serif py-3 border-t font-semibold text-sm text-center text-gray-800 uppercase">Trending on Annie Blog</h1>
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts ? (
        posts.map((post) => {
          const {
            title,
            tag,
            readingTime,
            author,
            description,
            _id,
            createdAt,
          } = post;
          return (
            <>
              <div key={_id}  className="border rounded p-3 shadow-sm mx-3">
                <div className="pb-2">
                  <Image
                    src="/blog2.jpeg"
                    className="rounded object-cover w-ful"
                    height={300}
                    width={500}
                    alt="blog-image"
                  />
                </div>
                <div className="flex flex-wrap items-center space-x-2 pb-2">
                  {tag.map((item) => {
                    return (
                      <div
                        key={item}
                      >
                        <p className="text-gray-400 md:text-sm text-xs font-semibold font-sans">
                          {item}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center space-x-2">
                <Image
                    src="/avatar.png"
                    className="rounded-full object-cover"
                    height={25}
                    width={25}
                    alt="profile picture"
                  />
                <p className="font-sans text-gray-600 font-bold text-sm">{author}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-gray-400 font-semibold text-sm my-2">{new Date(createdAt).toLocaleString()}</p>
                  <p className="font-sans text-gray-400 font-semibold text-sm my-2">{readingTime} min read</p>
                </div>
                <Link href={`http://localhost:3000/${_id}`}>
                    <a className="font-sans text-gray-800 md:text-lg text-base pb-2 font-bold cursor-pointer">{title.length <= 35 ? title : `${title.slice(0, 35)}...`}</a>
                </Link>
              </div> 
            </>     
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </section>
    <div className='bg-black py-3 space-y-3 p-3 mt-6 flex justify-center items-center flex-col'>
              <h1 className='text-white font-semibold text-lg font-mono'>Annie's Blog</h1>
              <div className='flex space-x-4'>
                <Link href='/about'>
                    <a className='font-medium text-sm text-white'>About</a>
                </Link>
                <Link href='/about'>
                    <a className='font-medium text-sm text-white'>Help</a>
                </Link>
                <Link href='/about'>
                    <a className='font-medium text-sm text-white'>Terms</a>
                </Link>
                <Link href='/about'>
                    <a className='font-medium text-sm text-white'>Privacy</a>
                </Link>
              </div>
            </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("http://localhost:3000/api/blog");
  const { data } = response;
  return {
    props: {
      posts: data,
      revalidate: 10,
    },
  };
}

export default Home;
