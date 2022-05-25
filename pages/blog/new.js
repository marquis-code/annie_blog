import {useEffect, useState} from 'react';
import {handleNewPost, getSingleBlogPost, handleNewlyEditedPost} from '../../components/endpoints';
import {useRouter} from 'next/router';
import Link from 'next/link';

const CreateBlog = () => {
    const [post, setPost] = useState({
        title : '',
        tag : '',
        description : '',
        readingTime : '',
        author : '',
        loading : false
        
    });

    const {query,push} = useRouter();
    const {id} = query;

   useEffect(() => {
     if(id){
        getSingleBlogPost(id).then((response) => {
            const {data} = response;
            setPost({title : data.title, tag : data.tag, description : data.description, readingTime : data.readingTime, author : data.author})
         }).catch(() => {
              console.log('Something went wrong')
         })
     }
   }, [id]);


    const {title, tag, readingTime, author, description, loading} = post;
    const handleChange = (e) => {
      let nameField = e.target.name;
      let valueField = e.target.value;
      setPost({...post, [nameField] : valueField})
    }

    const resetFields = () => {
        setPost((prevPost) => ({...prevPost, title : '', tag : '', description : '', readingTime : '', author : '', loading : false}))
    }

    const handleSubmit = (e) => {
        setPost({...post, loading : true})
        e.preventDefault();
        const {title, tag, readingTime, author, description} = post;
        const formData = {title, tag, readingTime, author, description};
        console.log(formData);

        if(id) {
            // Handle update request
            handleNewlyEditedPost(formData, id).then((response) => {
                 console.log(response)
                 push('/blog')
            }).catch((error) => {
                console.log(error.message)
            })
        } else {
            handleNewPost(formData)
            .then((response) => {
                console.log(response.data)
                resetFields();
            }).catch((error) => {
              console.log(error.response);
              setPost({...post, loading : false})
            })
        }
    }
    return (
        <>
        <section className="bg-white flex justify-center items-center mt-12 mb-5 max-w-7xl mx-auto">
            <div className="lg:px-5 px-3 border py-6 rounded shadow-sm lg:w-6/12 z-50 bg-gray-100 w-11/12">
                <div className='underline text-sm text-gray-500 font-sans font-semibold'><Link href={`http://localhost:3000/blog`}><a>Go Back</a></Link></div>
                <h1 className="text-center font-bold font-serif  text-2xl py-3">{id ? 'Update Blog Post' : 'Create Blog Post'}</h1>
                <form onSubmit={handleSubmit}>
                  <div className="py-2 flex flex-col">
                        <label htmlFor="title" className="font-sans text-sm mb-2 text-gray-500 font-semibold">Blog Title:</label>
                        <input type='text' value={title} onChange={handleChange} name='title' placeholder="Enter Post Title" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="tag" className="font-sans text-sm mb-2 text-gray-500 font-semibold">Hash Tags:</label>
                        <p className='text-xs text-gray-400 font-sans font-semibold'>Ensure every tag starts with @ and ensure you add a comma after every hash tag and space after every hash tag example: <span className='text-gray-700'>@health, @finance, @movies</span></p>
                        <input type='text' value={tag} onChange={handleChange} name='tag' placeholder="Enter Hash Tag" className="mt-3 focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="readingTime" className="font-sans text-sm mb-2 text-gray-500 font-semibold">Reading Time:</label>
                        <input type='number' value={readingTime} onChange={handleChange} name='readingTime' placeholder="Enter reading Time" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="author" className="font-sans text-sm mb-2 text-gray-500 font-semibold">Author:</label>
                        <input type='text' value={author} onChange={handleChange} name='author' placeholder="Enter Author's name" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="description" className="font-sans text-sm mb-2 text-gray-500 font-semibold">Description:</label>
                        <textarea cols={10} rows={5} type='text' value={description} onChange={handleChange} name='description' placeholder="Enter Post description" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>

                    {loading ? (
                        <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">{id ? 'updating post...' : 'creating post..'}</button>
                    ) : (
                        <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Continue</button>
                    )}
                </form>
            </div>
            
        </section>
        </>
    )
}

export default CreateBlog;