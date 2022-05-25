import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const Post = ({post}) => {
    const {tag, readingTime, title, description, author, createdAt} = post;
    return (
        <>
        <div className="p-3">
        <div className='underline text-sm text-gray-500 font-sans font-semibold py-2'><Link href={`http://localhost:3000/`}><a>Go Back</a></Link></div>
                <div className="pb-2">
                  <Image
                    src="/blog1.jpeg"
                    className="rounded object-cover"
                    height={500}
                    width={1500}
                    alt="blog-image"
                  />
                </div>
                <div className="flex flex-wrap items-center space-x-2 pb-2">
                  {tag.map((item) => {
                    return (
                      <div
                        key={item}
                      >
                        <p className="text-gray-400 text-sm md:text-lg font-semibold font-sans">
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

                <div className="flex items-center justify-between my-2">
                  <p className="font-sans text-gray-400 font-semibold text-xs md:text-md">{new Date(createdAt).toLocaleString()}</p>
                  <p className="font-sans text-gray-400 font-semibold text-xs md:text-md">{readingTime} min read</p>
                </div>
                <h1 className="font-sans font-medium  text-gray-800 text-xl md:text-4xl tracking-wider py-3 text-center mt-5">{title}</h1>
                <p className="font-sans font-light text-gray-800 md:text-lg pt-3">{description}</p>
              </div> 
            <div className='bg-black py-3 space-y-3 p-3 mt-6'>
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
        </>
    )
  }

  export async function getStaticProps({params}) {
    const response = await axios.get(
      `http://localhost:3000/api/blog/${params.id}`
    );
    const { data } = response;
    return {
      props: {
        post: data,
        revalidate : 10
      },
    };
  }

  export async function getStaticPaths(){
    return {
      fallback : false, /* 'blocking'  */
      paths : []
    }
  }

  export default Post;