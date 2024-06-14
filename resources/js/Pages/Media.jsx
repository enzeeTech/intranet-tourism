import React, {useState, useEffect} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
// import { Image } from '@/Components/Reusable/Media';
// import { Video } from '@/Components/Reusable/Media';
import Example from '../Layouts/DashboardLayoutNew';
// import { Filter } from '@/Components/Reusable/Media';
import './css/StaffDirectory.css';
import '../Components/Reusable/css/FileManagementSearchBar.css'




const Media = () => {
    // const [selectedMedia, setSelectedMedia] = useState('All');

    const [posts, setPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const url = 'http://localhost:8000/api/crud/posts';
        const options = {
          method: 'GET',
          headers: { Accept: 'application/json' }
        };
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setPosts(data.data.data);
          // Extract unique tag values
          const uniqueTags = [...new Set(data.data.data.flatMap(post => post.tag || []))];
          setTagOptions(uniqueTags);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      if (selectedTag === '') {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(posts.filter(post => post.tag && post.tag.includes(selectedTag)));
      }
    }, [selectedTag, posts]);
  
    const handleTagChange = (event) => {
      setSelectedTag(event.target.value);
    };
  
    const renderImages = () => {
      return filteredPosts.map(post => (
        post.attachments.filter(attachment => attachment.mime_type.startsWith('image/')).map(imageAttachment => (
          <img key={imageAttachment.id} src={`http://localhost:8000/storage/${imageAttachment.path}`} alt="Image Attachment" className="grow shrink-0 w-full h-full"/>
        ))
      ));
    };
  
    const renderVideos = () => {
      return filteredPosts.map(post => (
        post.attachments.filter(attachment => attachment.mime_type.startsWith('video/')).map(videoAttachment => (
          <video key={videoAttachment.id} controls src={`http://localhost:8000/storage/${videoAttachment.path}`} className="grow shrink-0 max-w-full aspect-[1.19] w-full"/>
        ))
      ));
    };

    // const menuItems = [
    //     'All',
    //     'TM Networking Day',
    //     'Peraduan Jomla!',
    // ];

    // const handleSelectMedia = (menuItem) => {
    //     setSelectedMedia(menuItem);
    //   };


  return (
    <Example>
    <main className="xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
            <select value={selectedTag} onChange={handleTagChange}>
                <option value="">All</option>
                {tagOptions.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
                ))}
            </select>
            <div>
                <h1 className="text-2xl font-bold text-neutral-800 max-md:max-w-full pb-2">Images</h1>
                {renderImages()}
            </div>
            <div>
                <h1 className="text-2xl font-bold text-neutral-800 max-md:max-w-full pb-2">Videos</h1>
                {renderVideos()}
            </div>
            </div>
        </div>
    </main>
    <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="Media" />
        </div>
        <hr className="file-directory-underline" />

        <div>
            <FeaturedEvents />
            <WhosOnline />
        </div>
    </aside>
    </Example>
  );
};

export default Media;
