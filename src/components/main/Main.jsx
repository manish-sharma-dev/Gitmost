import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
// import {} from '../../utils/fetchdata'


export default function Main() {
  const [repos, setRepos ] = useState([]);

  useEffect(()=>{
          // Replace 'YOUR_TOKEN' with your actual GitHub Personal Access Token


      const TOKEN = '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';

      async function fetchTrendingRepos() {
          const headers = {
              'Authorization': `token ${TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
          };

          const params = new URLSearchParams({
              'q': 'stars:>1',
              'sort': 'stars',
              'order': 'desc',
              'per_page': 3
          });

          const url = `https://api.github.com/search/repositories?${params}`;

          try {
              const response = await fetch(url, { headers });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              // Process and display the repositories
              data.items.forEach(repo => {
                  console.log(`Name: ${repo.name}`);
                  console.log(`Description: ${repo.description}`);
                  console.log(`Stars: ${repo.stargazers_count}`);
                  console.log(`URL: ${repo.html_url}`);
                  console.log('---');
              });

              // Log rate limit information
              console.log(`Rate Limit Remaining: ${response.headers.get('X-RateLimit-Remaining')}`);
              console.log(`Rate Limit Reset: ${new Date(response.headers.get('X-RateLimit-Reset') * 1000)}`);

          } catch (error) {
              console.error('Fetch Error:', error);
          }
      }

      // Call the function
        fetchTrendingRepos();
}, [])


  return (
    <div className='main'>
      <p className='heading'>Find The most <span className='span_ele'>Trending</span> Github Repositeries Every Week</p>
      
      <div className='category'>
        <p className='trending' active >Trending</p><br />
        <p className='starred'>Starred</p>
      </div>


      <div className ='github_profiles_from_api'>
        
        <div className="profile_component">
            <div className="firstpart">
                <p className='github_username'>Username /Project</p> 
                <p className='built_by'>Built by Username</p>
                <p className='github_project_description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis a aspernatur ullam ab corporis animi sapiente totam! Cupiditate quibusdam odio praesentium quas, facilis esse assumenda. Consectetur harum rem incidunt a.</p>
                <p className='language_used'>language starred fork</p>
              </div>

              <div className='secondpart'>
                <img src='#' alt='profileimg' />
              </div>
          </div>
      </div>

    </div>
  )
}
