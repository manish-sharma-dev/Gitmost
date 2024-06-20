import React from 'react'
import { useState, useEffect } from 'react'
import './main.css'
import { Star } from 'react-feather'


export default function Main() {
  const [repos, setRepos ] = useState([]);
  const [fetchType, setFetchType ] = useState('trending');


  //fetching more trending repo 
      useEffect(()=>{

          const TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;


          async function fetchTrendingRepos(type) {
              const headers = {
                  'Authorization': `token ${TOKEN}`,
                  'Accept': 'application/vnd.github.v3+json'
              };

              //type check if type is trending then fetch most trending 
              //if type is starred than fetch most starred project
              let params ;

              if (type === 'trending'){
                params = new URLSearchParams({
                  // 'q':'created_at:%3E2023-01-01',
                  // 'q': 'stars:>1',
                  'q' : 'created:>2024-06-01',
                  'sort': 'stars',
                  'order': 'desc',
                  'per_page': 15
              });

            } else if (type === 'starred'){
                params = new URLSearchParams({
                'q' : 'created:>2023-06-01',
                'sort': 'stars',
                'p': 'stars:>50000',
                'order': 'desc',
                'per_page': 15
            });
          }
               const url = `https://api.github.com/search/repositories?${params}`;

              try {
                  const response = await fetch(url, { headers });

                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  const data = await response.json();
                  setRepos(data.items)
                  // console.log(data.items)

                  // Log rate limit information
                  console.log(`Rate Limit Remaining: ${response.headers.get('X-RateLimit-Remaining')}`);
                  console.log(`Rate Limit Reset: ${new Date(response.headers.get('X-RateLimit-Reset') * 1000)}`);

              } catch (error) {
                  console.error('Fetch Error:', error);
              }
          }

          // Call the function
            fetchTrendingRepos(fetchType);
    }, [fetchType]);

    function handleFetchSearch(type){
      setFetchType(type)
    };

  return (
    <div className='main'>
      <p className='heading'>Find The most <span className='span_ele'>Trending</span> Github Repositeries Every Week</p>
      
      <div className='category'>
        <p className='trending' onClick={()=> handleFetchSearch('trending')} >Trending</p><br />
        <p className='starred' onClick={()=> handleFetchSearch('starred')}>Starred</p>
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
                        <p className='language_used'>{repo.stargazers_count} <Star size={13}/></p>
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
