import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import {useRouter} from 'next/router';
import { handleBlogDelete } from "../../components/endpoints";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedinIn,
} from "react-icons/fa";

const BlogPosts = ({ posts = [] }) => {
  const {push} = useRouter();
  const handleDelete = (id) => {
    handleBlogDelete(id)
    .then((response) => {
        console.log(response.data.successMessage)
        // push('/')
    })
    .catch((error) => {
       console.log(error.response.data.errorMessage)
    })
  }
  return (
    <div>
      <Head>
        <title>Home - Annie's blog</title>
        <meta name="description" content="welcome to annie's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-between px-3 my-5">
        <h1 className="text-center font-serif text-xl font-semibold">All Blogs</h1>
        <div className="flex justify-center items-center mt-3"><Link href={`http://localhost:3000/blog/new`}><a className="text-3xl font-bold text-green-700 rounded border px-3 shadow-sm">+</a></Link></div>
      </div>
      <section className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-baselin content-center md:gap-x-1 md:gap-y-4">
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
                        <p className="text-gray-400 md:text-xs text-xs font-semibold font-sans">
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
                  <p className="font-sans text-gray-400 font-semibold md:text-xs text-sm my-2">{new Date(createdAt).toLocaleString()}</p>
                  <p className="font-sans text-gray-400 font-semibold md:text-xs text-sm my-2">{readingTime} min read</p>
                </div>
                <Link href={`http://localhost:3000/${_id}`}>
                    <a className="font-sans text-gray-800 text-base pb-2 md:text-sm font-medium cursor-pointer">{title.length <= 35 ? title : `${title.slice(0, 35)}...`}</a>
                </Link>
                 <div className="flex items-center space-x-5 py-4">
                  <button className="font-sans text-sm font-semibold text-gray-500 border rounded shadow-sm px-6 py-1" onClick={() => {handleDelete(_id)}}>Delete</button>
                  <button> <Link href={`http://localhost:3000/blog/${_id}/edit`}><a className="font-sans text-sm font-semibold text-gray-500 border rounded shadow-sm px-6 py-1">Edit</a></Link></button>
                 </div>
              </div>      
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("http://localhost:3000/api/blog");
  if(response.statusText !== 'OK'){
    return {
      notFound : true
    }
  }
  const { data } = response;
  return {
    props: {
      posts: data,
      revalidate: 10,
    },
  };
}

export default BlogPosts;
