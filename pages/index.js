import Head from 'next/head';
import Image from 'next/image';
import {AiOutlineLike} from 'react-icons/ai';
import {GoCommentDiscussion} from 'react-icons/go';
import {BsLinkedin, BsArrowRight} from 'react-icons/bs';
import {FaFacebookSquare, FaTwitterSquare, FaLinkedinIn} from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - Annie's blog</title>
        <meta name="description" content="welcome to annie's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='max-w-7xl mx-auto px-16'>
         <div className='flex justify-between mt-10'>
           <h1 className='font-serif text-gray-600 text-3xl font-semibold'>Surround Yourself With The Right People</h1>
           <p className='font-sans font-semibold text-white border text-sm bg-black px-3 py-2 rounded'>October 22, 2021</p>
         </div>
         <div className='flex space-x-5 items-center mt-5'>
               <p className='text-gray-900 text-sm font-sans rounded bg-gray-200 px-3 py-1'>Life Tricks</p>
               <p className='text-gray-900 text-sm font-sans rounded bg-gray-200 px-3 py-1'>Personal Growth</p>
               <p className='text-gray-700 text-sm font-sans'>9 minutes read</p>
               <p className='text-gray-700 text-sm font-sans'>by <span className='text-black font-sans font-semibold'>Nick Brown</span></p>
          </div> 
      </section>
      
      <section className='max-w-7xl mx-auto px-16'>
          <div className='flex mt-10'>
          <div className='w-6/12'><Image src='/blog3.jpeg' height={400} width={600} alt='blog-image'/></div>
        <div className='w-6/12 bg-gray-100 px-5 py-5 h-96'>
            <div className='flex justify-between items-center'>
               <div className='flex space-x-5'>
                 <p className='flex items-center space-x-1'>
                   <span><AiOutlineLike /></span>
                   <span className='text-xs text-gray-700 '>32 Likes</span>
                 </p>
                 <p className=' flex items-center space-x-1'>
                   <span><GoCommentDiscussion /></span>
                   <span className='text-xs text-gray-700 '>4 Comments</span>
                 </p>
               </div>
               <div className='flex space-x-2 items-center'>
                  <p><FaFacebookSquare size={20} /></p>
                  <p><FaTwitterSquare size={20} /></p>
                  <p><BsLinkedin size={20} /></p>
               </div>
            </div>
            <div className='mt-5 font-sans text-gray-800 space-y-5'>
               <p className='font-sans text-lg text-gray-800'>Having a true, good friend is one of the best things in life.
                 It feels great when you know you have someone you can trust and consider a brother or sister.
                 Perhaps thats why they say your friends are the family you choose.
               </p>

               <p className='font-sans text-lg text-gray-800'>However its not always easy to tell if a friendship is geniue.
                 What follows are a few signs of a good friend.
               </p>

               <button className='mt-10 rounded py-2 px-6 font-semibold text-black bg-gray-300 text-sm flex space-x-3 items-center'>
                 <span>READ MORE</span>
                 <span><BsArrowRight /></span>
               </button>
            </div>
        </div>
          </div>
      </section>
      
      {/* <section className='max-w-7xl mx-auto px-16'>
          <div>
              <h1 className='font-sans text-xl pt-9 pb-2 font-bold'>They Make You Feel Understood</h1>
              <p className='font-sans text-lg text-gray-800'>Feeling understood is one of our basic, most important needs. 
                In fact, as psychologist Leon F Seltzer Ph.D. explains, 
                it's crucial for our well-being. 
                This is why we tend to feel good around people dont judge us, and who empathize with us.
                And a good friend does precisely that: they always try to see the world through your lenses.
                They're able to put themselves in your shoes and if you need help or need to vent, 
                you know you can count on them.
              </p>
          </div>

          <div>
              <h1 className='font-sans text-xl pt-9 pb-2 font-bold'>They're Natural Givers</h1>
              <p className='font-sans text-lg text-gray-800'>People who are not afraid to give and who don't demand anything in return  whenever they do something for you are simply the best.
              And they're the people most of us actually love to have as a friend, because they're authentic. See, a true friend does things out of love, not because they need something from you.
              <p className='text-gray-300 font-sans text-lg'>They're selfless with you, because they just want the best for you.</p>
              </p>
          </div>

          <button className='mt-10 rounded py-2 px-6 font-semibold text-black bg-gray-200 text-sm flex space-x-3 items-center'>
            <span>READ MORE</span>
            <span><BsArrowRight /></span>
          </button>
      </section> */}
    </div>
  )
}
