import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
// import { Star } from 'react-feather'


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
              // 'q':'created_at:%3E2023-01-01',
               // 'q': 'stars:>1',
              'q' : 'created:>2023-01-01',
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
              setRepos(data.items)
              // console.log(data.items)

              // // Process and display the repositories
              // data.items.forEach(repo => {
              //     console.log(`Name: ${repo.name}`);
              //     console.log(`Username: ${repo.full_name}`);
              //     console.log(`Name: ${repo.created_at}`);
              //     console.log(`Name: ${repo.language}`);

              //     console.log(`Description: ${repo.description}`);
              //     console.log(`Stars: ${repo.stargazers_count}`);
              //     console.log(`URL: ${repo.html_url}`);
              //     console.log('---');
              // });

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
        

        {repos.map((repo,id) => (
            <div className="profile_component" key={id} >
                <div className="firstpart">
                    <p className='github_username'>{repo.full_name}</p> 
                    <p className='built_by'>{repo.name}</p>
                    <p className='built_by'>{repo.created_at}</p>
                    <p className='github_project_description'>{repo.description}</p>
                    <p className='language_used'>{repo.language}</p>
                  </div>

                  <div className='secondpart'>
                    <img src='#' alt='profileimg' />
                  </div>   
            </div>
        ))}

      </div>
    </div>
  )
}
